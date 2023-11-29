# The Forest
An open world game where a user is trapped in a forest and must find a way home.

# Getting Started
Follow these steps to get started:

## Running the Server
1. $ cd server
2. $ pipenv install && pipenv shell --- this command is to create the virtual environment
3. Navigate to .venv/lib/flask/app.py and comment out line 30 ("from werkzeug.urls import url_quote")
4. $ export FLASK_APP=app.py
5. $ python app.py --- to get the program started once in the shell environment
6. Open a second terminal and cd up one directory

## Running the Client
1. $ cd client
2. $ npm install && npm start