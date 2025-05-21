import os
import json
from flask import Blueprint, render_template, request, jsonify

wheel_blueprint = Blueprint("wheel", __name__, template_folder="templates")
HISTORY_FILE = os.path.join('static', 'dataFiles', 'wheel_history.json')


@wheel_blueprint.route("/wheel")
def wheel_page():
    return render_template("wheel_page.html")


@wheel_blueprint.route("/save", methods=["POST"])
def save_result():
    try:
        result = request.json.get("result")
        if not result:
            return jsonify({"error": "Brak wyniku"}), 400

        if os.path.exists(HISTORY_FILE):
            with open(HISTORY_FILE, "r", encoding="utf-8") as f:
                history = json.load(f)
        else:
            history = []

        history.insert(0, result)
        history = history[:10]


        with open(HISTORY_FILE, "w", encoding="utf-8") as f:
            json.dump(history, f, ensure_ascii=False, indent=2)

        return jsonify({"status": "ok"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@wheel_blueprint.route("/history", methods=["GET"])
def get_history():
    try:
        if os.path.exists(HISTORY_FILE):
            with open(HISTORY_FILE, "r", encoding="utf-8") as f:
                history = json.load(f)
        else:
            history = []

        return jsonify(history)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
