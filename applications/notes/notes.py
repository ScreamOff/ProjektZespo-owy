from flask import Blueprint, render_template, request, redirect, url_for
import json
import os
from datetime import datetime

notes_blueprint = Blueprint('notes', __name__, template_folder='templates')

DATA_FILE = 'static/dataFiles/notes.json'

# 25 kolorów dla paletki
PALETTE_COLORS = [
    '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#F44336',
    '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3',
    '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A',
    '#CDDC39', '#AED581', '#FF4081', '#536DFE', '#7C4DFF',
    '#B39DDB', '#0091EA', '#76FF03', '#64DD17', '#FF6F00'
]


@notes_blueprint.route('/notes', methods=['GET'])
def notes():
    notes = load_notes()
    return render_template('notes.html', notes=notes, colors=PALETTE_COLORS)


@notes_blueprint.route('/notes/add_note', methods=['POST'])
def add_note():
    title = request.form['title']
    content = request.form['content']
    color = request.form['color']
    date_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # Dodanie daty do tytułu
    full_title = f"{title} ({date_str})"
    add_note_to_list(full_title, content, color)
    return redirect(url_for('notes.notes'))


@notes_blueprint.route('/delete_note/<int:note_index>', methods=['POST'])
def delete_note(note_index):
    """Usuwanie notatki na podstawie jej indeksu"""
    notes = load_notes()
    if 0 <= note_index < len(notes):
        notes.pop(note_index)
        save_notes(notes)
    return redirect(url_for('notes.notes'))


def load_notes():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            return json.load(f)
    return []


def add_note_to_list(title, content, color):
    notes = load_notes()
    notes.append({'title': title, 'content': content, 'color': color})
    save_notes(notes)


def save_notes(notes):
    with open(DATA_FILE, 'w') as f:
        json.dump(notes, f)