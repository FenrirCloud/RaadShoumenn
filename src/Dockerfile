FROM python:3.9-slim

WORKDIR /app

# Copy requirements first to leverage Docker cache
COPY src/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copy the rest of the application code and data
COPY src/ /app/src/
COPY data/ /app/data/

# Command to run the application
CMD ["python", "src/main.py"]
