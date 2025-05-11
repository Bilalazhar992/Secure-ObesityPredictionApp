import joblib
import numpy as np

# Load model and encoders
model = joblib.load('model_lgb.pkl')
encoders = joblib.load('encoders.pkl')
target_encoder = joblib.load('target_encoder.pkl')
OBESITY_HEALTH_RISKS = {
    "Insufficient_Weight": "Malnutrition, weakened immune system, osteoporosis, fertility problems, anemia, and other vitamin or nutrient deficiencies.",
    "Normal_Weight": "Generally low risk of health problems, but some individuals may still face issues like high cholesterol or hypertension based on genetics or lifestyle.",
    "Overweight_Level_I": "Increased risk of type 2 diabetes, heart disease, hypertension, high cholesterol, joint problems, and sleep apnea.",
    "Overweight_Level_II": "Higher risk of type 2 diabetes, heart disease, hypertension, stroke, fatty liver disease, gallbladder disease, sleep apnea, and certain cancers (e.g., colon, breast).",
    "Obesity_Type_I": "Elevated risk of type 2 diabetes, cardiovascular diseases, high blood pressure, sleep apnea, stroke, gallstones, fatty liver disease, and certain cancers. Also linked to mental health issues like depression and anxiety.",
    "Obesity_Type_II": "Very high risk of type 2 diabetes, cardiovascular diseases (heart attack, stroke), hypertension, sleep apnea, kidney disease, liver disease, and some cancers (e.g., endometrial, kidney). This level often leads to severe mobility problems and a reduced quality of life.",
    "Obesity_Type_III": "Extremely high risk of type 2 diabetes, cardiovascular disease, heart attack, stroke, kidney failure, liver disease, sleep apnea, joint problems (especially osteoarthritis), and certain cancers (e.g., colon, liver). Increased risk of premature death. Psychological issues, including severe depression and anxiety, are also common."
}

expected_features = [
    'Gender', 'Age', 'Height', 'Weight', 'family_history_with_overweight',
    'FAVC', 'FCVC', 'NCP', 'CAEC', 'SMOKE', 'CH2O', 'SCC', 'FAF', 'TUE',
    'CALC', 'MTRANS'
]

def preprocess_input(data_dict):
    processed = []
    for feature in expected_features:
        value = data_dict.get(feature)
        print(f"{feature} = {value}")
        try:
            if feature in encoders:
                value = encoders[feature].transform([value])[0]
            else:
                value = float(value)
            processed.append(value)
        except Exception as e:
            print(f"Error processing feature '{feature}': {e}")
            raise
    return np.array([processed])


def make_prediction(input_data):
    input_array = preprocess_input(input_data)
    print(input_array)
    pred_index = model.predict(input_array)[0]
    obesity_class = target_encoder.inverse_transform([pred_index])[0]
    health_risk = OBESITY_HEALTH_RISKS.get(obesity_class, "No data available.")
    return {
        "obesity_level": obesity_class.replace('_', ' '),
        "health_risk": health_risk
    }
