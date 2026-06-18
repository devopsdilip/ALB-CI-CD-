from flask import Flask, request, jsonify
import json
import os

app = Flask(__name__)

FILE_NAME = "submissions.json"

@app.route("/")
def home():
    return "Flask Backend is Running!"

@app.route("/submit", methods=["POST"])
def submit():
    data = request.json

    if os.path.exists(FILE_NAME):
        with open(FILE_NAME, "r") as f:
            records = json.load(f)
    else:
        records = []

    records.append(data)

    with open(FILE_NAME, "w") as f:
        json.dump(records, f, indent=4)

    return jsonify({
        "message": "Data received successfully",
        "received": data
    })

@app.route("/data", methods=["GET"])
def data():
    if os.path.exists(FILE_NAME):
        with open(FILE_NAME, "r") as f:
            records = json.load(f)
    else:
        records = []

    return jsonify(records)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
