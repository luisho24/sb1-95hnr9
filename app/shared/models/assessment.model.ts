export interface Assessment {
  id: string;
  date: Date;
  age: number;
  systolicBP: number;
  diastolicBP: number;
  bloodSugar: number;
  temperature: number;
  heartRate: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface AssessmentForm {
  age: number;
  systolicBP: number;
  diastolicBP: number;
  bloodSugar: number;
  temperature: number;
  heartRate: number;
}