FROM python:3.9


# 
COPY backend/requirements.txt /requirements.txt

RUN apt-get update && apt-get install -y --no-install-recommends \
    unixodbc-dev \
    unixodbc \
    libpq-dev
# 
RUN pip install --no-cache-dir --upgrade -r /requirements.txt

# 
COPY backend/ /

COPY backend/.env.example /.env

EXPOSE 8080
# 
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]