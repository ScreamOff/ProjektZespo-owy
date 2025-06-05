from flask import Blueprint, render_template

editor_blueprint = Blueprint('editor', __name__, template_folder='templates')

@editor_blueprint.route('/editor')
def pixel_editor():
    return render_template('editor.html')
