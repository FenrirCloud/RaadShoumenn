import os
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from dash import Dash, dcc, html, Input, Output
from sqlalchemy import create_engine, text
from dotenv import load_dotenv
from collections import Counter
import ast

# --- Setup and Configuration ---
load_dotenv()

# --- Database/Fallback Data Loading ---
def get_db_engine():
    # This is a simplified and duplicated version from src/main.py
    # In a larger project, this would be in a shared module.
    db_user = os.getenv("DB_USER", "user")
    db_password = os.getenv("DB_PASSWORD", "password")
    db_host = os.getenv("DB_HOST", "db") # Use 'db' for Docker service name
    db_port = os.getenv("DB_PORT", "5432")
    db_name = os.getenv("DB_NAME", "reviews_db")
    db_url = f"postgresql+psycopg2://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
    return create_engine(db_url)

def load_data():
    """
    Loads data from the PostgreSQL database with a fallback to a CSV file.
    """
    try:
        engine = get_db_engine()
        with engine.connect() as connection:
            # Check if the table is empty
            count = connection.execute(text("SELECT COUNT(*) FROM product_reviews")).scalar()
            if count == 0:
                return pd.DataFrame(), "database_empty"

            df = pd.read_sql("SELECT * FROM product_reviews", connection)
            return df, "database"
    except Exception as e:
        print(f"Database connection failed: {e}")
        fallback_path = '../data/processed_reviews_fallback.csv'
        if os.path.exists(fallback_path):
            print("Falling back to CSV data.")
            df = pd.read_csv(fallback_path)
            # The 'keywords' column is a string representation of a list, convert it back
            df['keywords'] = df['keywords'].apply(ast.literal_eval)
            return df, "fallback"
        else:
            return pd.DataFrame(), "no_data"

# --- Dash App Initialization ---
app = Dash(__name__)
server = app.server

# --- App Layout ---
app.layout = html.Div(style={'fontFamily': 'Arial, sans-serif', 'maxWidth': '1200px', 'margin': 'auto', 'padding': '20px'}, children=[
    html.H1("Product Review Analysis Dashboard", style={'textAlign': 'center', 'color': '#2c3e50'}),
    html.P("This dashboard visualizes the sentiment and top keywords extracted from product reviews.", style={'textAlign': 'center'}),

    html.Div(id='data-source-status', style={'textAlign': 'center', 'padding': '10px', 'borderRadius': '5px', 'marginBottom': '20px'}),

    dcc.Interval(id='interval-component', interval=60*1000, n_intervals=0), # Update every 60 seconds

    html.Div(className='row', style={'display': 'flex'}, children=[
        html.Div(dcc.Graph(id='sentiment-pie-chart'), className='six columns', style={'width': '50%'}),
        html.Div(dcc.Graph(id='keywords-bar-chart'), className='six columns', style={'width': '50%'})
    ])
])

# --- Callback for Updating Charts and Status ---
@app.callback(
    [Output('sentiment-pie-chart', 'figure'),
     Output('keywords-bar-chart', 'figure'),
     Output('data-source-status', 'children'),
     Output('data-source-status', 'style')],
    [Input('interval-component', 'n_intervals')]
)
def update_graphs(n):
    df, source = load_data()

    # --- Status Message ---
    status_messages = {
        "database": ("Live Data from PostgreSQL", {'backgroundColor': '#e8f5e9', 'color': '#2e7d32'}),
        "database_empty": ("Connected to DB, but no data found.", {'backgroundColor': '#fff3e0', 'color': '#f57c00'}),
        "fallback": ("Displaying Fallback Data (CSV)", {'backgroundColor': '#fff3e0', 'color': '#f57c00'}),
        "no_data": ("Error: No data source found.", {'backgroundColor': '#ffcdd2', 'color': '#c62828'})
    }
    status_text, status_style_update = status_messages[source]
    base_style = {'textAlign': 'center', 'padding': '10px', 'borderRadius': '5px', 'marginBottom': '20px'}
    status_style = {**base_style, **status_style_update}

    if df.empty:
        # Return empty charts if no data
        empty_fig = go.Figure().update_layout(title_text="No Data Available", xaxis_showticklabels=False, yaxis_showticklabels=False)
        return empty_fig, empty_fig, status_text, status_style

    # --- Pie Chart: Sentiment Distribution ---
    sentiment_counts = df['sentiment'].value_counts()
    pie_chart_fig = px.pie(
        sentiment_counts,
        values=sentiment_counts.values,
        names=sentiment_counts.index,
        title="Sentiment Distribution",
        color_discrete_map={'Positive': '#4caf50', 'Negative': '#f44336', 'Neutral': '#ffeb3b'}
    )

    # --- Bar Chart: Top Keywords ---
    # The keywords are in a list-like column, so we need to flatten and count them
    all_keywords = [keyword for sublist in df['keywords'] for keyword in sublist]
    keyword_counts = Counter(all_keywords)
    top_10_keywords = keyword_counts.most_common(10)

    if not top_10_keywords:
        bar_chart_fig = go.Figure().update_layout(title_text="Top 10 Keywords (No keywords found)", xaxis_showticklabels=False, yaxis_showticklabels=False)
    else:
        top_keywords_df = pd.DataFrame(top_10_keywords, columns=['Keyword', 'Count'])
        bar_chart_fig = px.bar(
            top_keywords_df,
            x='Count',
            y='Keyword',
            orientation='h',
            title="Top 10 Keywords",
            labels={'Count': 'Frequency'},
        ).update_yaxes(categoryorder="total ascending")

    return pie_chart_fig, bar_chart_fig, status_text, status_style


# --- Main Execution ---
if __name__ == '__main__':
    # Use 0.0.0.0 to make it accessible from outside the container
    app.run(debug=True, host='0.0.0.0', port=8050)
