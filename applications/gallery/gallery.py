from flask import Blueprint, render_template, url_for, send_from_directory
import os

gallery_blueprint = Blueprint('gallery', __name__, template_folder='templates')

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'static/uploads')

@gallery_blueprint.route('/')
def gallery():
    """Wyświetla listę dostępnych obrazów"""
    images = [f for f in os.listdir(UPLOAD_FOLDER) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))]
    return render_template('gallery.html', images=images)

@gallery_blueprint.route('/image/<filename>')
def get_image(filename):
    """Zwraca obraz do wyświetlenia"""
    return send_from_directory(UPLOAD_FOLDER, filename)
