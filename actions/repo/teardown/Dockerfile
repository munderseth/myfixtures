FROM python:3.7-buster

# Install
COPY requirements.txt ./
RUN pip install -r requirements.txt
# Main
COPY teardownrepo.py ./
ENTRYPOINT ["python","/teardownrepo.py"]