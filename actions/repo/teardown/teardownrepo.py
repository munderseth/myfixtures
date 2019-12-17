import requests
import os
import json
import sys

def run_teardown():
 
  url = "https://api.github.com/repos/"+GH_ORG+"/"+GH_REPO
  
  gh_token = GH_TOKEN
  querystring = {"access_token":gh_token}

  payload = ""
  headers = {
    'Content-Type': "application/json",
    'Accept': "application/vnd.github.everest-preview+json",
    'Host': "api.github.com"
  }

  print(url)
  response = requests.request("DELETE", url, data=payload, headers=headers, params=querystring)
  print(response.status_code)

def get_input():
    
    global GH_ORG
    global GH_REPO
    global GH_TOKEN

    GH_ORG    = sys.argv[1]
    GH_REPO   = sys.argv[2]
    GH_TOKEN  = sys.argv[3]
    
    return

########################
# main:
########################

get_input()
run_teardown()
