from flask import Blueprint, render_template

dice_simulator_bp = Blueprint(
    'dice_simulator',
    __name__,
    template_folder='templates',
)

@dice_simulator_bp.route('/kostka')
def dice_simulator():
    return render_template('dice_simulator.html')
