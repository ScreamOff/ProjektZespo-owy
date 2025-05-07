from flask import Blueprint, render_template, jsonify, request
import os
import json
from datetime import datetime

memory_blueprint = Blueprint('memory', __name__, template_folder='templates')

CARDS_FOLDER = os.path.join('static', 'cards')
SCORES_FILE = os.path.join('static', 'dataFiles', 'memory_scores.json')


@memory_blueprint.route("/")
def memory_page():
    return render_template("memory_page.html")


@memory_blueprint.route("/cards")
def get_card_images():
    try:
        files = [f for f in os.listdir(CARDS_FOLDER) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))]
        return jsonify(sorted(files))
    except Exception as e:
        return jsonify({"error": f"Błąd przy wczytywaniu kart: {e}"}), 500


@memory_blueprint.route("/score", methods=["POST"])
def save_score():
    try:
        score_data = request.get_json()
        if not score_data:
            return jsonify({"error": "Brak danych"}), 400

        score_data["timestamp"] = datetime.now().isoformat()

        if os.path.exists(SCORES_FILE):
            with open(SCORES_FILE, "r", encoding="utf-8") as f:
                scores = json.load(f)
        else:
            scores = []

        scores.append(score_data)

        with open(SCORES_FILE, "w", encoding="utf-8") as f:
            json.dump(scores, f, indent=2, ensure_ascii=False)

        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"error": f"Błąd zapisu wyniku: {e}"}), 500


@memory_blueprint.route("/scores", methods=["GET"])
def get_scores():
    try:
        if os.path.exists(SCORES_FILE):
            with open(SCORES_FILE, "r", encoding="utf-8") as f:
                scores = json.load(f)
        else:
            scores = []

        scores = sorted(scores, key=lambda x: x.get("timestamp", ""), reverse=True)
        return jsonify(scores)
    except Exception as e:
        return jsonify({"error": f"Błąd przy pobieraniu wyników: {e}"}), 500
