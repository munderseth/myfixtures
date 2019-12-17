FROM python:3.7-buster

# Install
COPY requirements.txt ./
RUN pip install -r requirements.txt
# Main
COPY runner.sh /runner.sh
COPY teardownrepo.py /teardownrepo.py
ENTRYPOINT ["/runner.sh"]