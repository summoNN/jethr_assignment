// File: src/utils/currency.ts

/**
 * Format a numeric value into Italian Euro currency string format.
 * Example: 35000 -> "35.000,00 €" or "€ 35.000"
 *
 * @param amount - The number to format
 * @param includeDecimals - Whether to force 2 decimal places (default: true)
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, includeDecimals: boolean = true): string => {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '0,00 €';
  }

  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: includeDecimals ? 2 : 0,
    maximumFractionDigits: includeDecimals ? 2 : 0,
  }).format(amount);
};

/**
 * Format a decimal percentage into readable Italian percentage format.
 * Example: 0.0919 -> "9,19%"
 *
 * @param rate - The rate as a decimal (e.g. 0.0919)
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted percentage string
 */
export const formatPercent = (rate: number, decimals: number = 2): string => {
  if (isNaN(rate) || rate === null || rate === undefined) {
    return '0%';
  }

  return new Intl.NumberFormat('it-IT', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(rate);
};
