
from config import Config
from functools import wraps
import pandas as pd
import joblib
from flask import Flask, request, jsonify


app = Flask(__name__)
app.config.from_object(Config)

if not app.config.get("API_KEY"):
    raise RuntimeError(
        "API key not set. Please configure the TITANIC_API_KEY environment variable.")

model = joblib.load(app.config["MODEL_PATH"])

EXPECTED_FEATURES = [
    "Pclass",
    "Sex",
    "Age",
    "Fare",
    "Embarked",
    "FamilySize",
    "IsAlone",
    "HasCabin",
    "Title"
]


def require_api_key(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        api_key = request.headers.get("X-API-Key")
        if not api_key or api_key != app.config["API_KEY"]:
            return jsonify({"error": "Unauthorized"}), 401
        return f(*args, **kwargs)
    return decorated


@app.route("/predict", methods=["POST"])
@require_api_key
def predict():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON payload"}), 400

    try:
        df = pd.DataFrame([data])

        missing_features = set(EXPECTED_FEATURES) - set(df.columns)
        if missing_features:
            return jsonify({
                "error": "Missing features",
                "missing": list(missing_features)
            }), 400

        prediction = model.predict(df)[0]
        probability = model.predict_proba(df)[0][1]

        return jsonify({
            "survived": int(prediction),
            "survival_probability": round(float(probability), 4)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(debug=True)
