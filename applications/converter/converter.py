from flask import Blueprint, render_template, request

converter_blueprint = Blueprint('converter', __name__, template_folder='templates')

@converter_blueprint.route('/', methods=['GET', 'POST'])
def converter():
    result = None
    categories = {
        'length': ['m', 'km', 'cm', 'mm'],
        'mass': ['kg', 'g', 'mg', 't'],
        'temperature': ['C', 'F', 'K'],
        'time': ['s', 'min', 'h', 'd']
    }

    if request.method == 'POST':
        category = request.form['category']
        value = request.form['value']
        from_unit = request.form['from_unit']
        to_unit = request.form['to_unit']

        result = convert_units(category, value, from_unit, to_unit)

    return render_template('converter.html', categories=categories, result=result)


def convert_units(category, value, from_unit, to_unit):
    try:
        value = float(value)
    except ValueError:
        return "Nieprawidłowa wartość"

    if category == 'length':
        factors = {
            'm': 1.0,
            'km': 1000.0,
            'cm': 0.01,
            'mm': 0.001
        }
        converted = value * factors[from_unit] / factors[to_unit]
        return f"{converted:.4f} {to_unit}"

    elif category == 'mass':
        factors = {
            'kg': 1.0,
            'g': 0.001,
            'mg': 0.000001,
            't': 1000.0
        }
        converted = value * factors[from_unit] / factors[to_unit]
        return f"{converted:.4f} {to_unit}"

    elif category == 'temperature':
        if from_unit == to_unit:
            return f"{value:.2f} {to_unit}"
        # Konwersja do Celsjusza
        if from_unit == 'C':
            celsius = value
        elif from_unit == 'F':
            celsius = (value - 32) * 5 / 9
        elif from_unit == 'K':
            celsius = value - 273.15
        # Z Celsjusza do docelowej jednostki
        if to_unit == 'C':
            converted = celsius
        elif to_unit == 'F':
            converted = celsius * 9 / 5 + 32
        elif to_unit == 'K':
            converted = celsius + 273.15
        return f"{converted:.2f} {to_unit}"

    elif category == 'time':
        factors = {
            's': 1,
            'min': 60,
            'h': 3600,
            'd': 86400
        }
        converted = value * factors[from_unit] / factors[to_unit]
        return f"{converted:.4f} {to_unit}"

    return "Nieobsługiwana konwersja"
