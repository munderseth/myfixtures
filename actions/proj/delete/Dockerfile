FROM python:3.7-buster

# Install
COPY requirements.txt ./
RUN pip install -r requirements.txt

# Main
COPY deleteproject.py /deleteproject.py
ENTRYPOINT ["python","/deleteproject.py"]
