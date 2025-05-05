from flask import Blueprint, render_template, request, jsonify
import random
import string

password_generator_bp = Blueprint(
    'password_generator',
    __name__,
    template_folder='templates',
    static_folder='static',
    static_url_path='/password_generator/static'
)

@password_generator_bp.route('/generator-hasel')
def password_generator():
    return render_template('password_generator.html')

@password_generator_bp.route('/generate-password', methods=['POST'])
def generate_password():
    data = request.get_json()
    length = int(data.get('length', 12))
    use_upper = data.get('uppercase', False)
    use_lower = data.get('lowercase', False)
    use_digits = data.get('digits', False)
    use_special = data.get('special', False)

    characters = ''
    if use_upper:
        characters += string.ascii_uppercase
    if use_lower:
        characters += string.ascii_lowercase
    if use_digits:
        characters += string.digits
    if use_special:
        characters += "!@#$%^&*()-_=+[]{}|;:,.<>?/"

    if not characters:
        return jsonify({'error': 'No character types selected'}), 400

    password = ''.join(random.choice(characters) for _ in range(length))
    return jsonify({'password': password})
