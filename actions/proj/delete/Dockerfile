FROM python:3.7-buster

# Install
COPY requirements.txt ./
RUN pip install -r requirements.txt
# Main
COPY runner.sh /runner.sh
COPY deleteproject.py /deleteproject.py
ENTRYPOINT ["/runner.sh"]