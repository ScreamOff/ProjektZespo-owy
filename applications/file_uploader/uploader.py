from flask import Blueprint, render_template, request, flash, redirect, url_for
import os

uploader_blueprint = Blueprint('uploader_blueprint', __name__, template_folder='templates')

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'static/uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@uploader_blueprint.route('/', methods=['GET', 'POST'])
def file_uploader():
    if request.method == 'POST':
        '''if 'file' not in request.files:
            flash('Nie wybrano pliku', 'error')
            return redirect(request.url)

        
        if not files or all(f.filename == '' for f in files):
            flash('Nie wybrano pliku', 'error')
            return redirect(request.url)'''
        files = request.files.getlist('file')
        for file in files:
            if file and file.filename:
                filename = file.filename
                filepath = os.path.join(UPLOAD_FOLDER, filename)
                file.save(filepath)

        flash('Pliki przesłane pomyślnie', 'success')
        return redirect(url_for('uploader_blueprint.file_uploader'))

    uploaded_files = os.listdir(UPLOAD_FOLDER)
    return render_template('upload.html', files=uploaded_files)
