from flask import Blueprint, render_template, jsonify
import random
import os

quote_blueprint = Blueprint('quote', __name__, template_folder='templates')

# Nowa ścieżka do pliku z cytatami
QUOTES_FILE_PATH = os.path.join('static', 'uploads', 'quotes.txt')

# Wczytywanie cytatów z pliku tekstowego
def load_quotes():
    try:
        with open(QUOTES_FILE_PATH, 'r', encoding='utf-8') as f:
            return [line.strip() for line in f if line.strip()]
    except FileNotFoundError:
        return ["(Brak pliku 'quotes.txt' w static/uploads)"]
    except Exception as e:
        return [f"Błąd podczas ładowania cytatów: {str(e)}"]

@quote_blueprint.route("/quote")
def quote_page():
    return render_template("quote_page.html")

@quote_blueprint.route("/quote/random")
def quote_random():
    quotes = load_quotes()
    return jsonify({"quote": random.choice(quotes)})
