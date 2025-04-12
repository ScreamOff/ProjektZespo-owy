from flask import Blueprint, render_template

saper_blueprint = Blueprint('saper', __name__, template_folder='templates')

@saper_blueprint.route('/saper')
def saper_page():
    return render_template('saper_page.html')
