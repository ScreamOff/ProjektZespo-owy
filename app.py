from flask import Flask, render_template, url_for
from applications.file_downloader.downloader import downloader_blueprint
from applications.file_uploader.uploader import uploader_blueprint
from applications.calculator.calculator import calculator_blueprint
from applications.refleks.refleks import refleks_blueprint
from applications.video_player.player import player_blueprint
from applications.notes.notes import notes_blueprint
from applications.planner.planner import planner_blueprint
from applications.audio_player.audio_player import audio_player_blueprint
from applications.gallery.gallery import gallery_blueprint
from applications.timer.timer import timer_blueprint
from applications.quote.quote import quote_blueprint
from applications.saper.saper import saper_blueprint
from applications.converter.converter import converter_blueprint
from applications.weather.weather import weather_blueprint
from applications.password_generator.password_generator import password_generator_bp
from applications.yahtzee.yahtzee import yahtzee_blueprint
from applications.memory.memory import memory_blueprint
from applications.currency_rates.currency_rates import currency_rates_bp
from applications.wheel.wheel import wheel_blueprint


app = Flask(__name__ )
app.secret_key = 'your_secret_key'
app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024 * 1024

# Rejestracja blueprintów
app.register_blueprint(downloader_blueprint, url_prefix='/downloader')
app.register_blueprint(uploader_blueprint, url_prefix='/uploader')
app.register_blueprint(calculator_blueprint, url_prefix='/calculator')
app.register_blueprint(player_blueprint, url_prefix='/player')
###Ten sprint
app.register_blueprint(notes_blueprint, url_prefix='/notes')
app.register_blueprint(planner_blueprint, url_prefix='/planner')
app.register_blueprint(audio_player_blueprint, url_prefix='/audio_player')
app.register_blueprint(gallery_blueprint, url_prefix='/gallery')
app.register_blueprint(timer_blueprint, url_prefix='/timer')
###Następne
app.register_blueprint(quote_blueprint, url_prefix='/quote_page')
app.register_blueprint(saper_blueprint, url_prefix='/saper')
app.register_blueprint(converter_blueprint, url_prefix='/converter')
app.register_blueprint(weather_blueprint, url_prefix='/weather')
app.register_blueprint(password_generator_bp, url_prefix='/password_generator')
app.register_blueprint(yahtzee_blueprint, url_prefix='/yahtzee')
app.register_blueprint(memory_blueprint, url_prefix='/memory')
app.register_blueprint(refleks_blueprint, url_prefix='/refleks')

app.register_blueprint(currency_rates_bp, url_prefix='/currency')
app.register_blueprint(wheel_blueprint, url_prefix="/wheel")

@app.route('/')
def index():
    applications = [
        {'name': 'Pobierz Plik', 'icon': 'download_icon.png', 'url': url_for('downloader.download_page')},
        {'name': 'Wyślij Plik', 'icon': 'upload_icon.png', 'url': url_for('uploader_blueprint.file_uploader')},
        {'name': 'Kalkulator', 'icon': 'calculator_icon.png', 'url': url_for('calculator.calculator')},
        {'name': 'Odtwarzacz Wideo', 'icon': 'play_button.png', 'url': url_for('player.video_list')},
        {'name': 'Planner', 'icon': 'planner_icon.png', 'url': url_for('planner.show_planner')},
        {'name': 'Notatnik', 'icon': 'note_icon.png', 'url': url_for('notes.notes')},
        {'name': 'Odtwarzacz Audio', 'icon': 'mp3_icon.png', 'url': url_for('audio_player.audio_list')},
        {'name': 'Galeria', 'icon': 'gallery.png', 'url': url_for('gallery.gallery')},
        {'name': 'Minutnik', 'icon': 'timer_icon.png', 'url': url_for('timer.timer_page')},
        {'name': 'Cytat Dnia', 'icon': 'quote_icon.png', 'url': url_for('quote.quote_page')},
        {'name': 'Gra Saper', 'icon': 'saper_icon.png', 'url': url_for('saper.saper_page')},
        {'name': 'Konwerter', 'icon': 'converter.png', 'url': url_for('converter.converter')},
        {'name': 'Pogoda', 'icon': 'weather_icon.png', 'url': url_for('weather.weather_page')},
        {'name': 'Generator Haseł', 'icon': 'lock.png','url': url_for('password_generator.password_generator')},
        {'name': 'Gra Yahtzee', 'icon': 'Yahtzee.png', 'url': url_for('yahtzee.yahtzee')},
        {'name': 'Gra Memory', 'icon': 'memory_icon.png', 'url': url_for('memory.memory_page')},
        {'name': 'Gra Refleks', 'icon': 'refleks.png', 'url': url_for('refleks.refleks_page')},
        {'name': 'Kursy Walut', 'icon': 'currency_icon.png','url': url_for('currency_rates.currency_rates')},
        {'name': 'Koło losu', 'icon': 'wheel.png', 'url': url_for('wheel.wheel_page')},

        # Możemy tutaj dodawać kolejne aplikacje
    ]
    return render_template('index.html', applications=applications)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
