import os
from dotenv import load_dotenv
load_dotenv()


class Config:
    API_KEY = os.environ.get("TITANIC_API_KEY")
    MODEL_PATH = os.path.join(
        os.path.dirname(__file__),
        "artifacts",
        "titanic_survival_model.joblib"
    )
