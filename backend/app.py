# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from .calculator import estimate_materials
app = Flask(__name__)
# CORS allows your React frontend to make requests to this Flask backend
CORS(app, resources={r"/api/*": {"origins": "https://materialandtheirpricecalculator1.onrender.com"}})

@app.route('/api/estimate', methods=['POST'])
def get_estimation():
    try:
        data = request.get_json()
        
        # Extract data from the request
        length = float(data['length'])
        width = float(data['width'])
        height = float(data['height'])
        floors = int(data['floors'])
        
        # Basic validation
        if not all([length > 0, width > 0, height > 0, floors > 0]):
            return jsonify({"error": "All dimensions must be positive numbers."}), 400

        # Call the calculation engine
        results = estimate_materials(length, width, height, floors)
        
        return jsonify(results)

    except (KeyError, TypeError, ValueError):
        return jsonify({"error": "Invalid input data. Please provide length, width, height, and floors."}), 400
    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {e}"}), 500

if __name__ == '__main__':
    app.run(debug=True) # Runs on http://127.0.0.1:5000

