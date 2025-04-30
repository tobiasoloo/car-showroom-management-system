from flask import Flask, jsonify, request, abort
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Sample data
cars = [
    {"id": 1, "make": "Toyota", "model": "Corolla", "year": 2020, "license_plate": "ABC123", "daily_rate": 50, "is_available": True},
    {"id": 2, "make": "Honda", "model": "Civic", "year": 2019, "license_plate": "XYZ456", "daily_rate": 60, "is_available": True},
]

bookings = []

# Helper function to find a car by ID
def find_car(car_id):
    return next((car for car in cars if car["id"] == car_id), None

# Helper function to find a booking by ID
def find_booking(booking_id):
    return next((booking for booking in bookings if booking["id"] == booking_id), None

# Get all cars
@app.route("/cars", methods=["GET"])
def get_cars():
    return jsonify(cars)

# Add a new car
@app.route("/cars", methods=["POST"])
def add_car():
    data = request.get_json()
    if not data or not all(key in data for key in ["make", "model", "year", "license_plate", "daily_rate"]):
        abort(400, description="Invalid input: Missing required fields.")

    new_car = {
        "id": len(cars) + 1,
        "make": data["make"],
        "model": data["model"],
        "year": data["year"],
        "license_plate": data["license_plate"],
        "daily_rate": data["daily_rate"],
        "is_available": True,
    }
    cars.append(new_car)
    return jsonify(new_car), 201

# Get all bookings
@app.route("/bookings", methods=["GET"])
def get_bookings():
    return jsonify(bookings)

# Create a new booking
@app.route("/bookings", methods=["POST"])
def create_booking():
    data = request.get_json()
    if not data or not all(key in data for key in ["car_id", "start_date", "end_date"]):
        abort(400, description="Invalid input: Missing required fields.")

    car_id = data["car_id"]
    car, _ = find_car(car_id)
    if not car or not car["is_available"]:
        abort(400, description="Car is not available.")

    car["is_available"] = False
    new_booking = {
        "id": len(bookings) + 1,
        "car_id": car_id,
        "start_date": data["start_date"],
        "end_date": data["end_date"],
        "status": "Active",
    }
    bookings.append(new_booking)
    return jsonify(new_booking), 201

# Update booking status
@app.route("/bookings/<int:booking_id>", methods=["PUT"])
def update_booking(booking_id):
    data = request.get_json()
    if not data or "status" not in data:
        abort(400, description="Invalid input: Missing status.")

    booking, _ = find_booking(booking_id)
    if not booking:
        abort(404, description="Booking not found.")

    booking["status"] = data["status"]
    if data["status"] == "Completed":
        car, _ = find_car(booking["car_id"])
        if car:
            car["is_available"] = True

    return jsonify(booking)

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)