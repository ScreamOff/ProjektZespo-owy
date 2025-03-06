from flask import Blueprint, render_template, send_from_directory
import os

downloader_blueprint = Blueprint('downloader', __name__,template_folder='templates')

UPLOAD_FOLDER = 'static/uploads/'
ICON_FOLDER = 'static/icons'

# Mapowanie rozszerzeń plików na odpowiednie ikony SVG
EXTENSION_ICON_MAP = {
    'pdf': 'pdf_icon.svg',
    'doc': 'doc_icon.svg',
    'docx': 'doc_icon.svg',
    'jpg': 'image_icon.svg',
    'jpeg': 'image_icon.svg',
    'png': 'image_icon.svg',
    'gif': 'image_icon.svg',
    'zip': 'zip_icon.svg',
    'rar': 'zip_icon.svg',
    'txt': 'txt_icon.svg',
    # Można dodać więcej typów plików według potrzeb
}


@downloader_blueprint.route('/downloads')
def download_page():
    files = os.listdir(UPLOAD_FOLDER)
    file_info = []

    for file in files:
        ext = file.split('.')[-1].lower()  # Pobierz rozszerzenie pliku
        icon = EXTENSION_ICON_MAP.get(ext, 'default_icon.svg')  # Znajdź odpowiednią ikonę SVG
        file_info.append({
            'name': file,
            'icon': icon
        })

    return render_template('download.html', files=file_info)


@downloader_blueprint.route('/download/<filename>')
def download_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename, as_attachment=True)
