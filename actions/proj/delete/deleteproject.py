import os
import re
import sys
from testspace import testspace as ts

def delete_project():

  URL = TS_ORG+".stridespace.com"
  testspace = ts.Testspace(TS_TOKEN, URL)
  testspace.delete_project(TS_PROJECT)

  return
 
def get_input():
    
    global TS_TOKEN
    global TS_ORG
    global TS_PROJECT
  
    TS_TOKEN   = sys.argv[1]
    TS_ORG     = sys.argv[2]
    TS_PROJECT = sys.argv[3]
      
    return

########################
# main:
########################

print("Delete Project script running ..")
get_input()
delete_project()
