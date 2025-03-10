from flask import Blueprint, render_template, request, jsonify
import math

calculator_blueprint = Blueprint('calculator', __name__, template_folder='templates')


@calculator_blueprint.route('/calculator', methods=['GET', 'POST'])
def calculator():
    return render_template('calculator.html')


@calculator_blueprint.route('/calculate', methods=['POST'])
def calculate():
    expression = request.json.get('expression')
    try:
        # Bezpieczna ewaluacja wyrażenia z math
        result = eval(expression, {"__builtins__": None}, math.__dict__)
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)})