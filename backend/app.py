from flask import Flask, request, jsonify
import json
import os

app = Flask(__name__)

FILE_NAME = "submissions.json"


# ========================
# HEALTH CHECK (IMPORTANT)
# ========================
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy"}), 200


# ========================
# ROOT API
# ========================
@app.route("/api", methods=["GET"])
def home():
    return jsonify({
        "message": "Flask Backend is Running!"
    })


# ========================
# SUBMIT DATA (POST)
# ========================
@app.route("/api/submit", methods=["POST"])
def submit():
    data = request.json

    if os.path.exists(FILE_NAME):
        with open(FILE_NAME, "r") as f:
            try:
                records = json.load(f)
            except:
                records = []
    else:
        records = []

    records.append(data)

    with open(FILE_NAME, "w") as f:
        json.dump(records, f, indent=4)

    return jsonify({
        "message": "Data received successfully",
        "received": data
    })


# ========================
# GET DATA
# ========================
@app.route("/api/data", methods=["GET"])
def get_data():
    if os.path.exists(FILE_NAME):
        with open(FILE_NAME, "r") as f:
            try:
                records = json.load(f)
            except:
                records = []
    else:
        records = []

    return jsonify(records)


# ========================
# RUN APP
# ========================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
