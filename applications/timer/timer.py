from flask import Blueprint, render_template

timer_blueprint = Blueprint('timer', __name__, template_folder='templates')

@timer_blueprint.route('/')
def timer_page():
    return render_template('timer.html')
