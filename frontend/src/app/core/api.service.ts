import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { PredictionRequest, PredictionResponse } from "../models/prediction.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class ApiService {
    private readonly baseUrl: string = environment.api.baseUrl;
    private readonly apiKey: string = environment.api.apiKey;

    private http: HttpClient = inject(HttpClient);

    predict(payload: PredictionRequest): Observable<PredictionResponse> {
        const headers = new HttpHeaders({
            "Content-Type": "application/json",
            "X-API-KEY": this.apiKey,
        });

        return this.http.post<PredictionResponse>(
            `${this.baseUrl}/predict`,
            payload,
            { headers }
        );

    }
}