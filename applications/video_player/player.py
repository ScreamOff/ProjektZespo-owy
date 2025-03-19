from flask import Blueprint, render_template, url_for, send_from_directory
import os

player_blueprint = Blueprint('player', __name__, template_folder='templates')

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'static/uploads')

@player_blueprint.route('/')
def video_list():
    """Wyświetla listę dostępnych plików MP4"""
    videos = [f for f in os.listdir(UPLOAD_FOLDER) if f.endswith('.mp4')]
    return render_template('player.html', videos=videos)

@player_blueprint.route('/play/<filename>')
def play_video(filename):
    """Zwraca plik MP4 do odtwarzania"""
    return send_from_directory(UPLOAD_FOLDER, filename)
