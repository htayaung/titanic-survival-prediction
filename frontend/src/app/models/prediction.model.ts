export interface PredictionRequest {
    Pclass: number;
    Sex: string;
    Age: number | null;
    Fare: number | null;
    Embarked: string;
    FamilySize: number;
    IsAlone: 0 | 1;
    HasCabin: 0 | 1;
    Title: string;
}

export interface PredictionResponse {
    survived: number;
    survival_probability: number;
}
