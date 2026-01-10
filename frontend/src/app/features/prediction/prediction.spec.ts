import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionComponent } from './prediction';

describe('Prediction', () => {
  let component: PredictionComponent;
  let fixture: ComponentFixture<PredictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PredictionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
