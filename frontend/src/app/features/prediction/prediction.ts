import { Component, inject, signal } from '@angular/core';
import { PredictionRequest, PredictionResponse } from '../../models/prediction.model';
import { ApiService } from '../../core/api.service';
import {
  BOOLEAN_OPTIONS,
  EMBARKED_OPTIONS,
  PASSENGER_CLASSES,
  SEX_OPTIONS,
  TITLE_OPTIONS
} from '../../data/prediction-options';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-prediction',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressBarModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    DecimalPipe],
  templateUrl: './prediction.html',
  styleUrl: './prediction.scss',
})
export class PredictionComponent {
  api: ApiService = inject(ApiService);
  result = signal<PredictionResponse | null>(null);
  errorMessage = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  passengerClasses = PASSENGER_CLASSES;
  sexOptions = SEX_OPTIONS;
  titleOptions = TITLE_OPTIONS;
  embarkedOptions = EMBARKED_OPTIONS;
  booleanOptions = BOOLEAN_OPTIONS;

  formData: PredictionRequest = {
    Pclass: this.passengerClasses[0].value,
    Sex: this.sexOptions[0].value,
    Age: null,
    Fare: null,
    Embarked: this.embarkedOptions[0].value,
    FamilySize: 1,
    IsAlone: 1,
    HasCabin: 0,
    Title: this.titleOptions[0].value
  };

  predict(): void {
    this.isLoading.set(true);
    this.result.set(null);
    this.errorMessage.set(null);

    this.api.predict(this.formData).subscribe({
      next: response => {
        this.result.set(response);
        this.isLoading.set(false);
      },
      error: err => {
        this.errorMessage.set(err?.error?.error || 'Prediction failed. Please try again.');
        this.isLoading.set(false);
      }
    });
  }
}
