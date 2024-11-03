import { Observable, of } from '@nativescript/core';
import { Assessment, AssessmentForm } from '../models/assessment.model';

export class AssessmentService {
  private assessments: Assessment[] = [];

  getAssessments(): Promise<Assessment[]> {
    return Promise.resolve(this.assessments);
  }

  addAssessment(form: AssessmentForm): Promise<Assessment> {
    const assessment: Assessment = {
      id: Date.now().toString(),
      date: new Date(),
      ...form,
      riskLevel: this.calculateRiskLevel(form),
    };

    this.assessments.unshift(assessment);
    return Promise.resolve(assessment);
  }

  private calculateRiskLevel(form: AssessmentForm): 'low' | 'medium' | 'high' {
    let riskPoints = 0;

    // Age risk
    if (form.age < 18 || form.age > 35) riskPoints += 2;

    // Blood pressure risk
    if (form.systolicBP > 140 || form.diastolicBP > 90) riskPoints += 3;
    if (form.systolicBP > 160 || form.diastolicBP > 100) riskPoints += 2;

    // Blood sugar risk
    if (form.bloodSugar > 140) riskPoints += 2;
    if (form.bloodSugar > 200) riskPoints += 3;

    // Temperature risk
    if (form.temperature > 38) riskPoints += 2;

    // Heart rate risk
    if (form.heartRate > 100 || form.heartRate < 60) riskPoints += 2;

    if (riskPoints >= 7) return 'high';
    if (riskPoints >= 4) return 'medium';
    return 'low';
  }
}