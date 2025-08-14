FROM python:3.9-slim

WORKDIR /app

# Copy requirements first to leverage Docker cache
COPY dashboard/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copy the dashboard code and the data directory for the fallback CSV
COPY dashboard/ /app/dashboard/
COPY data/ /app/data/

# Expose the port the app runs on
EXPOSE 8050

# Command to run the application
CMD ["python", "dashboard/app.py"]
