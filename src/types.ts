/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SymptomScore {
  incompleteEmptying: number; // 0-5
  frequency: number; // 0-5
  intermittency: number; // 0-5
  urgency: number; // 0-5
  weakStream: number; // 0-5
  straining: number; // 0-5
  nocturia: number; // 0-5 (times waking up)
}

export interface ProgressEntry {
  date: string; // YYYY-MM-DD
  wakeUps: number; // times woken up to urinate range 0-10
  streamStrength: number; // 1 to 5 (1=Muito Fraco, ..., 5=Muito Forte)
  sleepQuality: 'Mal' | 'Regular' | 'Bem';
  notes?: string;
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  takenOkra: boolean; // Baba de quiabo de manhã
  takenPectin: boolean; // Pectina cítrica de tarde/noite
  waterIntake: number; // litros
  symptomsSeverity: 'good' | 'moderate' | 'bad';
  notes?: string;
}
