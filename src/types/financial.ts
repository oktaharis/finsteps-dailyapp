
export interface FinancialStep {
  id: number;
  title: string;
  description: string;
  target?: number;
  current?: number;
  completed: boolean;
  notes?: string;
  icon: string;
  color: string;
}

export interface UserProgress {
  id?: string;
  user_id: string;
  step_id: number;
  current_amount: number;
  target_amount: number;
  completed: boolean;
  notes: string;
  updated_at?: string;
}

export interface FinancialProfile {
  id?: string;
  user_id: string;
  monthly_income: number;
  monthly_expenses: number;
  current_savings: number;
  financial_goals: string;
  updated_at?: string;
}
