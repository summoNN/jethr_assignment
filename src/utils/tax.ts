// File: src/utils/tax.ts

import { SalaryCalculation, TaxAssumptions, IrpefBracketDetail } from '../types/salary';

/**
 * Standard simulator assumptions as defined by contract specifications.
 */
export const DEFAULT_ASSUMPTIONS: TaxAssumptions = {
  contractType: 'Tempo Indeterminato',
  category: 'Impiegato',
  residence: 'Milano (Lombardia)',
  dependents: 0,
  taxReliefs: false,
  installments: 13,
  inpsRate: 0.0919, // 9.19%
  regionalRate: 0.0123, // 1.23%
  municipalRate: 0.0080, // 0.80%
  municipalExemptionThreshold: 23000, // €23,000 exemption threshold for Milano
};

/**
 * IRPEF Brackets configuration (National brackets currently in force: 23%, 33%, 43%).
 */
export const IRPEF_BRACKETS = [
  { max: 28000, rate: 0.23, label: 'Fino a 28.000 €' },
  { max: 50000, rate: 0.33, label: 'Da 28.000,01 € a 50.000 €' },
  { max: Infinity, rate: 0.43, label: 'Oltre 50.000 €' },
];

/**
 * Regional IRPEF Brackets for Lombardia (2026 progressive rates: 1.23%, 1.58%, 1.72%, 1.73%).
 */
export const REGIONAL_IRPEF_BRACKETS = [
  { max: 15000, rate: 0.0123, label: 'Fino a 15.000 €' },
  { max: 28000, rate: 0.0158, label: 'Da 15.000,01 € a 28.000 €' },
  { max: 50000, rate: 0.0172, label: 'Da 28.000,01 € a 50.000 €' },
  { max: Infinity, rate: 0.0173, label: 'Oltre 50.000 €' },
];

/**
 * Pure function to calculate mandatory employee INPS social security contributions.
 *
 * @param ral - Retribuzione Annua Lorda in Euros
 * @param rate - INPS contribution rate (default: 9.19%)
 * @returns Total annual employee INPS contributions
 */
export const calculateContributions = (
  ral: number,
  rate: number = DEFAULT_ASSUMPTIONS.inpsRate
): number => {
  if (ral <= 0 || isNaN(ral)) return 0;
  return Math.round(ral * rate * 100) / 100;
};

/**
 * Pure function to calculate taxable income (Reddito Imponibile IRPEF).
 * Formula: RAL - Contributi INPS
 *
 * @param ral - Retribuzione Annua Lorda in Euros
 * @param contributions - Pre-computed INPS contributions (optional)
 * @returns Taxable income for IRPEF and local addizionali
 */
export const calculateTaxableIncome = (
  ral: number,
  contributions?: number
): number => {
  if (ral <= 0 || isNaN(ral)) return 0;
  const inps = contributions !== undefined ? contributions : calculateContributions(ral);
  return Math.max(0, Math.round((ral - inps) * 100) / 100);
};

/**
 * Pure function to calculate national IRPEF using progressive tax brackets.
 * Brackets:
 * - 0 to €28,000: 23%
 * - €28,000.01 to €50,000: 33%
 * - Over €50,000: 43%
 *
 * @param taxableIncome - Reddito Imponibile in Euros
 * @returns Total annual national IRPEF tax
 */
export const calculateIrpef = (taxableIncome: number): number => {
  if (taxableIncome <= 0 || isNaN(taxableIncome)) return 0;

  let totalIrpef = 0;
  let previousThreshold = 0;

  for (const bracket of IRPEF_BRACKETS) {
    if (taxableIncome > previousThreshold) {
      const taxableInBracket = Math.min(taxableIncome - previousThreshold, bracket.max - previousThreshold);
      const taxInBracket = taxableInBracket * bracket.rate;
      totalIrpef += taxInBracket;
      previousThreshold = bracket.max;
    } else {
      break;
    }
  }

  return Math.round(totalIrpef * 100) / 100;
};

/**
 * Pure function to get detailed IRPEF breakdown per bracket.
 *
 * @param taxableIncome - Reddito Imponibile in Euros
 * @returns Detailed breakdown array per bracket
 */
export const calculateIrpefDetails = (taxableIncome: number): IrpefBracketDetail[] => {
  if (taxableIncome <= 0 || isNaN(taxableIncome)) return [];

  const details: IrpefBracketDetail[] = [];
  let previousThreshold = 0;

  for (const bracket of IRPEF_BRACKETS) {
    if (taxableIncome > previousThreshold) {
      const taxableInBracket = Math.min(taxableIncome - previousThreshold, bracket.max - previousThreshold);
      const taxAmount = Math.round(taxableInBracket * bracket.rate * 100) / 100;

      details.push({
        bracketLabel: bracket.label,
        rate: bracket.rate,
        taxableAmountInBracket: Math.round(taxableInBracket * 100) / 100,
        taxAmount,
      });

      previousThreshold = bracket.max;
    }
  }

  return details;
};

/**
 * Pure function to calculate regional tax (Addizionale Regionale Lombardia) with progressive tax brackets.
 * Lombardia 2026 progressive brackets:
 * - Up to €15,000: 1.23%
 * - €15,000.01 to €28,000: 1.58%
 * - €28,000.01 to €50,000: 1.72%
 * - Over €50,000: 1.73%
 *
 * @param taxableIncome - Reddito Imponibile in Euros
 * @returns Total annual regional tax
 */
export const calculateRegionalTax = (taxableIncome: number): number => {
  if (taxableIncome <= 0 || isNaN(taxableIncome)) return 0;

  let totalRegionalTax = 0;
  let previousThreshold = 0;

  for (const bracket of REGIONAL_IRPEF_BRACKETS) {
    if (taxableIncome > previousThreshold) {
      const taxableInBracket = Math.min(taxableIncome - previousThreshold, bracket.max - previousThreshold);
      const taxInBracket = taxableInBracket * bracket.rate;
      totalRegionalTax += taxInBracket;
      previousThreshold = bracket.max;
    } else {
      break;
    }
  }

  return Math.round(totalRegionalTax * 100) / 100;
};

/**
 * Pure function to get detailed Regional IRPEF breakdown per bracket for Lombardia.
 *
 * @param taxableIncome - Reddito Imponibile in Euros
 * @returns Detailed breakdown array per regional bracket
 */
export const calculateRegionalTaxDetails = (taxableIncome: number): IrpefBracketDetail[] => {
  if (taxableIncome <= 0 || isNaN(taxableIncome)) return [];

  const details: IrpefBracketDetail[] = [];
  let previousThreshold = 0;

  for (const bracket of REGIONAL_IRPEF_BRACKETS) {
    if (taxableIncome > previousThreshold) {
      const taxableInBracket = Math.min(taxableIncome - previousThreshold, bracket.max - previousThreshold);
      const taxAmount = Math.round(taxableInBracket * bracket.rate * 100) / 100;

      details.push({
        bracketLabel: bracket.label,
        rate: bracket.rate,
        taxableAmountInBracket: Math.round(taxableInBracket * 100) / 100,
        taxAmount,
      });

      previousThreshold = bracket.max;
    }
  }

  return details;
};

/**
 * Pure function to calculate municipal tax (Addizionale Comunale).
 * For Milano, an exemption threshold applies up to €23,000 of taxable income.
 * If taxable income <= threshold, municipal tax is €0.
 * If taxable income > threshold, single rate of 0.80% applies to total taxable income.
 *
 * @param taxableIncome - Reddito Imponibile in Euros
 * @param rate - Municipal tax rate (default: 0.80% for Milano)
 * @param threshold - Exemption threshold (default: €23,000 for Milano)
 * @returns Total annual municipal tax
 */
export const calculateMunicipalTax = (
  taxableIncome: number,
  rate: number = DEFAULT_ASSUMPTIONS.municipalRate,
  threshold: number = DEFAULT_ASSUMPTIONS.municipalExemptionThreshold
): number => {
  if (taxableIncome <= 0 || isNaN(taxableIncome) || taxableIncome <= threshold) return 0;
  return Math.round(taxableIncome * rate * 100) / 100;
};

/**
 * Pure master calculation function that coordinates all pure calculation steps
 * to produce the complete SalaryCalculation result object.
 *
 * @param ral - Retribuzione Annua Lorda in Euros
 * @returns Complete SalaryCalculation object
 */
export const calculateNetSalary = (ral: number): SalaryCalculation => {
  const safeRal = Math.max(0, isNaN(ral) ? 0 : ral);

  const inpsContributions = calculateContributions(safeRal);
  const taxableIncome = calculateTaxableIncome(safeRal, inpsContributions);
  const irpef = calculateIrpef(taxableIncome);
  const irpefBrackets = calculateIrpefDetails(taxableIncome);
  const regionalTax = calculateRegionalTax(taxableIncome);
  const regionalBrackets = calculateRegionalTaxDetails(taxableIncome);
  const regionalTaxRate = taxableIncome > 0 ? Math.round((regionalTax / taxableIncome) * 10000) / 10000 : DEFAULT_ASSUMPTIONS.regionalRate;
  const municipalTax = calculateMunicipalTax(taxableIncome);

  const totalTaxes = Math.round((irpef + regionalTax + municipalTax) * 100) / 100;
  const totalDeductions = Math.round((inpsContributions + totalTaxes) * 100) / 100;

  const netAnnual = Math.max(0, Math.round((taxableIncome - totalTaxes) * 100) / 100);
  const monthlyInstallments = DEFAULT_ASSUMPTIONS.installments;
  const netMonthly = Math.max(0, Math.round((netAnnual / monthlyInstallments) * 100) / 100);

  const effectiveTaxRate = safeRal > 0 ? Math.round((totalTaxes / safeRal) * 10000) / 100 : 0;
  const totalRetentionRate = safeRal > 0 ? Math.round((totalDeductions / safeRal) * 10000) / 100 : 0;

  return {
    ral: safeRal,
    inpsContributions,
    inpsRate: DEFAULT_ASSUMPTIONS.inpsRate,
    taxableIncome,
    irpef,
    irpefBrackets,
    regionalTax,
    regionalTaxRate,
    regionalBrackets,
    municipalTax,
    municipalTaxRate: DEFAULT_ASSUMPTIONS.municipalRate,
    totalTaxes,
    totalDeductions,
    netAnnual,
    netMonthly,
    monthlyInstallments,
    effectiveTaxRate,
    totalRetentionRate,
  };
};
