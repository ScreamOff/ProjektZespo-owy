from flask import Blueprint, render_template, jsonify, request
import requests
import json
import os



yahtzee_blueprint = Blueprint('yahtzee', __name__, template_folder='templates')
@yahtzee_blueprint.route('/')
def yahtzee():
    return render_template('yahtzee.html')