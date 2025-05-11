# from flask import Blueprint, request, jsonify, make_response
# from model import User, db
# from datetime import timedelta
# from flask import make_response
# from predict_logic import make_prediction 

# from flask_jwt_extended import create_access_token, set_access_cookies, unset_jwt_cookies, jwt_required, get_jwt_identity

# # Define Blueprints
# auth_bp = Blueprint("auth", __name__)
# predict_bp = Blueprint('predict', __name__)

# # Register user and login routes
# @auth_bp.route("/register", methods=["POST"])
# def register():
#     data = request.get_json()
#     if User.query.filter_by(email=data["email"]).first():
#         return jsonify({"msg": "Email already registered"}), 409

#     user = User(email=data["email"])
#     user.set_password(data["password"])
#     db.session.add(user)
#     db.session.commit()
#     return jsonify({"msg": "Registered successfully"}), 201


# @auth_bp.route('/login', methods=['POST'])  # Correct blueprint variable name
# def login():
#     data = request.get_json()
#     email = data.get('email')
#     password = data.get('password')

#     # Authenticate user
#     user = User.query.filter_by(email=email).first()
#     if not user or not user.check_password(password):
#         return jsonify({"msg": "Invalid credentials"}), 401

#     # Create JWT token
#     token = create_access_token(identity=user.id)

#     # Return response with user data and token
#     response = jsonify({
#         "user": {
#             "id": user.id,
#             "email": user.email,
            
#         },
#         "token": token
#     })
#     response.set_cookie('token', token, httponly=True)  # Set token in cookies
#     return response


# @auth_bp.route("/logout", methods=["POST"])
# def logout():
#     resp = jsonify({"msg": "Logged out"})
#     unset_jwt_cookies(resp)
#     return resp, 200

# @auth_bp.route("/verify-token", methods=["GET"])
# @jwt_required()
# def verify_token():
#     user_id = get_jwt_identity()
#     user = User.query.get(user_id)
#     if not user:
#         return jsonify({"msg": "User not found"}), 404
#     return jsonify({"user": {"id": user.id, "email": user.email}}), 200

