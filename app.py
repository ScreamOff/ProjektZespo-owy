from flask import Flask, render_template, url_for
from applications.file_downloader.downloader import downloader_blueprint
from applications.file_uploader.uploader import uploader_blueprint
from applications.calculator.calculator import calculator_blueprint
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
from applications.password_generator.routes import password_generator_bp

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

@app.route('/')
def index():
    applications = [
        {'name': 'Download', 'icon': 'download_icon.png', 'url': url_for('downloader.download_page')},
        {'name': 'Upload', 'icon': 'upload_icon.png', 'url': url_for('uploader_blueprint.file_uploader')},
        {'name': 'Calculator', 'icon': 'calculator_icon.png', 'url': url_for('calculator.calculator')},
        {'name': 'Video Player', 'icon': 'play_button.png', 'url': url_for('player.video_list')},
        {'name': 'Planner', 'icon': 'planner_icon.png', 'url': url_for('planner.show_planner')},
        {'name': 'Notes', 'icon': 'note_icon.png', 'url': url_for('notes.notes')},
        {'name': 'Audio Player', 'icon': 'mp3_icon.png', 'url': url_for('audio_player.audio_list')},
        {'name': 'Gallery', 'icon': 'gallery.png', 'url': url_for('gallery.gallery')},
        {'name': 'Timer', 'icon': 'timer_icon.png', 'url': url_for('timer.timer_page')},
        {'name': 'Quote', 'icon': 'quote_icon.png', 'url': url_for('quote.quote_page')},
        {'name': 'Saper', 'icon': 'saper_icon.png', 'url': url_for('saper.saper_page')},
        {'name': 'Converter', 'icon': 'converter.png', 'url': url_for('converter.converter')},
        {'name': 'Weather Stat.', 'icon': 'weather_icon.png', 'url': url_for('weather.weather_page')},
        {'name': 'Password Generator', 'icon': 'lock.png',
         'url': url_for('password_generator.password_generator')},
        # Możemy tutaj dodawać kolejne aplikacje
    ]
    return render_template('index.html', applications=applications)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
