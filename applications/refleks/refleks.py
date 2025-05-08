from flask import Blueprint, render_template

refleks_blueprint = Blueprint('refleks', __name__, template_folder='templates')

@refleks_blueprint.route('/refleks')
def refleks_page():
    return render_template('refleks_page.html')
