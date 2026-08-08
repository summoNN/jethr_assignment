// File: src/types/salary.ts

export interface IrpefBracketDetail {
  bracketLabel: string;
  rate: number;
  taxableAmountInBracket: number;
  taxAmount: number;
}

export interface SalaryCalculation {
  ral: number;
  inpsContributions: number;
  inpsRate: number;
  taxableIncome: number;
  irpef: number;
  irpefBrackets: IrpefBracketDetail[];
  regionalTax: number;
  regionalTaxRate: number;
  regionalBrackets?: IrpefBracketDetail[];
  municipalTax: number;
  municipalTaxRate: number;
  totalTaxes: number;
  totalDeductions: number;
  netAnnual: number;
  netMonthly: number;
  monthlyInstallments: number;
  effectiveTaxRate: number; // Tasse / RAL %
  totalRetentionRate: number; // (Contributi + Tasse) / RAL %
}

export interface TaxAssumptions {
  contractType: string;
  category: string;
  residence: string;
  dependents: number;
  taxReliefs: boolean;
  installments: number;
  inpsRate: number;
  regionalRate: number;
  municipalRate: number;
  municipalExemptionThreshold: number;
}
