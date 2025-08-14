# Data Engineering Portfolio Project: Product Review Analysis

## Overview

This project demonstrates a complete data engineering pipeline that ingests product review data, processes it using an AI model for sentiment analysis, stores the results in a PostgreSQL database, and visualizes the insights on a web dashboard. The entire application is containerized with Docker for easy setup and deployment.

This project is designed to showcase skills in data ingestion, data processing, API integration, database management, data visualization, and containerization.

## Features

- **Data Ingestion**: Ingests product review data from a CSV file.
- **Data Cleaning**: Preprocesses the data to handle missing or invalid entries.
- **AI-Powered Analysis**: Uses the OpenAI API to perform sentiment analysis (Positive, Negative, Neutral) and keyword extraction for each review.
- **Data Storage**: Stores the raw and processed data in a PostgreSQL database.
- **Interactive Dashboard**: A Plotly/Dash web application visualizes the sentiment distribution and top keywords.
- **Containerization**: The entire pipeline (processing script, database, dashboard) is containerized using Docker and orchestrated with Docker Compose.

## Architecture

The project consists of three main services orchestrated by Docker Compose:

1.  **`db` (PostgreSQL)**: The database service that stores all product review data. It is initialized with a schema to hold the processed reviews.
2.  **`app` (Python Processor)**: A Python script that runs once to perform the ETL process. It reads the raw data, calls the OpenAI API for analysis, and writes the results to the PostgreSQL database.
3.  **`dashboard` (Dash/Plotly)**: A Python web application that continuously queries the database and presents the data through interactive charts.

The data flows from the initial CSV file, through the Python processing application, into the database, and is finally presented on the dashboard.

## Getting Started

Follow these instructions to get the project running on your local machine.

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)

### Configuration

1.  **Clone the repository** (or download the source code).

2.  **Create an environment file**:
    Copy the example environment file to a new `.env` file. This file will hold your secret keys and configuration.
    ```bash
    cp .env.example .env
    ```

3.  **Set your OpenAI API Key**:
    Open the `.env` file and replace `"your_openai_api_key_here"` with your actual OpenAI API key.
    ```
    OPENAI_API_KEY="sk-..."
    ```

4.  **Database Credentials** (Optional):
    The `.env` file also contains the default credentials for the PostgreSQL database. These match the defaults in `docker-compose.yml` and do not need to be changed unless you want to customize them.

### Running the Application

Once the `.env` file is configured, you can launch the entire application with a single command from the project's root directory:

```bash
docker compose up --build
```

- `--build` tells Docker Compose to build the images for the `app` and `dashboard` services from their Dockerfiles before starting the containers. You only need to use this the first time or after making changes to the code or Dockerfiles.
- After running the command, Docker will download the PostgreSQL image, build your application images, and start all three containers.

### How It Works

1.  The `db` service starts, and the `init.sql` script creates the `product_reviews` table.
2.  The `app` service builds and starts. It waits for the database to be healthy, then runs the `src/main.py` script. This script processes the reviews from `data/reviews.csv` and populates the database. The container will exit after the script is done.
3.  The `dashboard` service builds and starts. It waits for the database and then launches the web server.
4.  **View the dashboard** by opening your web browser and navigating to: **[http://localhost:8050](http://localhost:8050)**

## Screenshots

*(Add your own screenshots of the running dashboard here. First, run the application, then take screenshots of the dashboard in your browser and add them here.)*

**Sentiment Distribution Pie Chart:**
`[Insert Screenshot of Pie Chart]`

**Top Keywords Bar Chart:**
`[Insert Screenshot of Bar Chart]`


## Project Structure

```
.
├── data/
│   ├── reviews.csv               # Raw mock data
│   └── processed_reviews_fallback.csv # Fallback data if DB connection fails
├── db/
│   └── init.sql                  # SQL script to initialize the database table
├── src/
│   ├── main.py                   # Main data processing script
│   ├── requirements.txt          # Python dependencies for the processor
│   └── Dockerfile                # Dockerfile for the processor
├── dashboard/
│   ├── app.py                    # Dash application script
│   ├── requirements.txt          # Python dependencies for the dashboard
│   └── Dockerfile                # Dockerfile for the dashboard
├── .env.example                  # Example environment file
├── .gitignore
├── docker-compose.yml            # Docker Compose file to orchestrate all services
└── README.md                     # This file
```
