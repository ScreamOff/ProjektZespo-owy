from flask import Blueprint, render_template

currency_rates_bp = Blueprint(
    'currency_rates',
    __name__,
    template_folder='templates',
    static_folder='static',
    static_url_path='static'
)

@currency_rates_bp.route('/kursy-walut')
def currency_rates():
    return render_template('currency_rates.html')
