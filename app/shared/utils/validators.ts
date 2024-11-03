export const validators = {
  required: (value: any) => value !== undefined && value !== null && value !== '',
  age: (value: number) => value >= 12 && value <= 65,
  systolicBP: (value: number) => value >= 70 && value <= 190,
  diastolicBP: (value: number) => value >= 40 && value <= 100,
  bloodSugar: (value: number) => value >= 30 && value <= 500,
  temperature: (value: number) => value >= 35 && value <= 42,
  heartRate: (value: number) => value >= 40 && value <= 200,
};