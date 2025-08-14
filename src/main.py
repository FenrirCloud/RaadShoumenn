import os
import pandas as pd
import openai
from dotenv import load_dotenv
import json
from sqlalchemy import create_engine, text

# --- Configuration and Setup ---

# Load environment variables from .env file
load_dotenv()

# Get OpenAI API key from environment variables
api_key = os.getenv("OPENAI_API_KEY")

# --- MOCK MODE ---
# If no API key is found, run in mock mode
MOCK_MODE = not api_key

if MOCK_MODE:
    print("---")
    print("WARNING: OpenAI API key not found. Running in MOCK MODE.")
    print("The script will generate placeholder data instead of calling the OpenAI API.")
    print("To run in normal mode, create a .env file with your OPENAI_API_KEY.")
    print("---")
    client = None
else:
    # Initialize the OpenAI client
    client = openai.OpenAI(api_key=api_key)

# --- Database Setup ---

def get_db_engine():
    """
    Creates and returns a SQLAlchemy engine using credentials from environment variables.
    """
    db_user = os.getenv("DB_USER", "user")
    db_password = os.getenv("DB_PASSWORD", "password")
    db_host = os.getenv("DB_HOST", "db") # Default to 'db' for Docker Compose service name
    db_port = os.getenv("DB_PORT", "5432")
    db_name = os.getenv("DB_NAME", "reviews_db")

    # Create the database URL
    db_url = f"postgresql+psycopg2://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"

    try:
        engine = create_engine(db_url)
        # Test the connection
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        print("Database connection successful.")
        return engine
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        # In a real application, you might want to handle this more gracefully.
        # For this project, we will let the exception propagate.
        raise

# --- Core Functions ---

def analyze_review(review_text):
    """
    Analyzes a product review using the OpenAI API to determine sentiment and extract keywords.
    In MOCK_MODE, it returns placeholder data.

    Args:
        review_text (str): The text of the product review.

    Returns:
        tuple: A tuple containing the sentiment (str) and keywords (list of str),
               or (None, None) if analysis fails.
    """
    if MOCK_MODE:
        # In mock mode, return placeholder data
        sentiments = ["Positive", "Negative", "Neutral"]
        # Simple hash to get a deterministic "random" sentiment
        sentiment = sentiments[hash(review_text) % len(sentiments)]
        keywords = ["mock", "placeholder"]
        return sentiment, keywords

    if not isinstance(review_text, str) or not review_text.strip():
        return "Invalid", []

    prompt = f"""
    Analyze the following product review and provide the sentiment and 3-5 relevant keywords.
    The sentiment must be one of: Positive, Negative, or Neutral.
    The keywords should be a list of 3 to 5 single words or short phrases that summarize the main topics of the review.

    Please return the output in a JSON format with two keys: "sentiment" and "keywords".

    Review text:
    "{review_text}"
    """

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an expert in product review analysis."},
                {"role": "user", "content": prompt}
            ],
            temperature=0,
            max_tokens=100,
            response_format={"type": "json_object"}
        )

        # Extract and parse the JSON content from the response
        result = json.loads(response.choices[0].message.content)
        sentiment = result.get("sentiment", "Error")
        keywords = result.get("keywords", [])

        # Basic validation
        if sentiment not in ["Positive", "Negative", "Neutral"]:
            sentiment = "Error"
        if not isinstance(keywords, list):
            keywords = []

        return sentiment, keywords

    except (openai.APIError, json.JSONDecodeError, Exception) as e:
        print(f"An error occurred while analyzing review: {e}")
        return "Error", []

# --- Main Execution ---

def main():
    """
    Main function to load, process, and save the review data.
    """
    print("Starting review processing...")

    # Load the raw data
    try:
        df = pd.read_csv("data/reviews.csv")
        print(f"Loaded {len(df)} reviews from data/reviews.csv")
    except FileNotFoundError:
        print("Error: data/reviews.csv not found. Please make sure the file exists.")
        return

    # Clean the data
    df.dropna(subset=['review_text'], inplace=True)
    df = df[df['review_text'].str.strip() != '']
    print(f"Processing {len(df)} valid reviews after cleaning...")

    # Analyze reviews and store results
    results = df['review_text'].apply(analyze_review)

    # Unpack the results into two separate lists for robust assignment
    sentiments = [res[0] for res in results]
    keywords = [res[1] for res in results]

    # Assign the new data to the DataFrame
    df['sentiment'] = sentiments
    df['keywords'] = keywords

    # Filter out rows where analysis failed
    df = df[df['sentiment'] != 'Error']
    df = df[df['sentiment'] != 'Invalid']

    # --- Database Insertion ---
    try:
        engine = get_db_engine()

        # Define the table name
        table_name = "product_reviews"

        # Reorder columns to match the table schema (excluding auto-generated columns)
        df_to_insert = df[['product_id', 'review_text', 'review_date', 'sentiment', 'keywords']]

        # Insert data into the database
        # Using if_exists='append' will add new data without dropping the table
        df_to_insert.to_sql(table_name, con=engine, if_exists='append', index=False)

        print(f"Successfully inserted {len(df_to_insert)} reviews into the '{table_name}' table.")

    except Exception as e:
        print(f"Could not save data to the database. Error: {e}")
        print("Saving to CSV as a fallback.")
        output_path = "data/processed_reviews_fallback.csv"
        df.to_csv(output_path, index=False)
        print(f"Data saved to {output_path}")


if __name__ == "__main__":
    main()
