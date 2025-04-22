from flask import Blueprint, render_template, jsonify, request
import requests
from datetime import datetime
import json
import os

weather_blueprint = Blueprint('weather', __name__, template_folder='templates')

API_KEY = "ba18979be6e97aa42697978cab977350"
DEFAULT_CITY = "Warsaw"
UNITS = "metric"  #"imperial" dla Fahrenheita

def get_nameday():
    today = datetime.now().strftime("%m-%d")
    filepath = os.path.join("static", "dataFiles", "namedays.json")
    try:
        with open(filepath, encoding="utf-8") as f:
            data = json.load(f)
        return data.get(today, "Brak danych")
    except Exception as e:
        return f"Błąd imienin: {e}"

@weather_blueprint.route("/")
def weather_page():
    return render_template("weather_page.html")

@weather_blueprint.route("/data")
def weather_data():
    lat = request.args.get("lat")
    lon = request.args.get("lon")

    if lat and lon:
        url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units={UNITS}&lang=pl"
    else:
        city = request.args.get("city", DEFAULT_CITY)
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units={UNITS}&lang=pl"

    try:
        res = requests.get(url)
        data = res.json()

        result = {
            "temperature": f"{data['main']['temp']}°C",
            "humidity": f"{data['main']['humidity']}%",
            "pressure": f"{data['main']['pressure']} hPa",
            "wind": f"{data['wind']['speed']} m/s",
            "visibility": f"{data.get('visibility', 0) / 1000:.1f} km",
            "sunrise": datetime.fromtimestamp(data['sys']['sunrise']).strftime("%H:%M"),
            "sunset": datetime.fromtimestamp(data['sys']['sunset']).strftime("%H:%M"),
            "location": f"{data['name']}, {data['sys']['country']}",
            "datetime": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "name_day": get_nameday(),
            "icon": data['weather'][0]['icon'],
            "timezone_offset": data.get("timezone", 0)
        }
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": f"Nie udało się pobrać danych pogodowych: {e}"}), 500
