from flask import Blueprint, render_template, url_for, send_from_directory
import os

audio_player_blueprint = Blueprint('audio_player', __name__, template_folder='templates')

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'static/uploads')

@audio_player_blueprint.route('/')
def audio_list():
    audios = [f for f in os.listdir(UPLOAD_FOLDER) if f.endswith('.mp3')]
    return render_template('audio_player.html', audios=audios)

@audio_player_blueprint.route('/play/<filename>')
def play_audio(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)
