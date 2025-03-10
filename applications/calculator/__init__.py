from flask import Blueprint

calculator_blueprint = Blueprint('calculator', __name__, template_folder='templates')

from . import calculator