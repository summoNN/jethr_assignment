// File: src/components/SalaryInput.tsx

import React, { useState } from 'react';
import { Calculator, RotateCcw, Sparkles, AlertCircle } from 'lucide-react';

interface SalaryInputProps {
  onCalculate: (ral: number) => void;
  onReset: () => void;
  isLoading: boolean;
  hasCalculated: boolean;
}

export const SalaryInput: React.FC<SalaryInputProps> = ({
  onCalculate,
  onReset,
  isLoading,
  hasCalculated,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const presets = [25000, 35000, 45000, 60000];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    if (error) setError(null);
  };

  const handlePresetClick = (amount: number) => {
    setInputValue(amount.toString());
    setError(null);
    onCalculate(amount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanValue = inputValue.replace(/\./g, '').replace(/,/g, '.');
    const numericRal = parseFloat(cleanValue);

    if (!inputValue.trim()) {
      setError('Inserisci una Retribuzione Annua Lorda (RAL).');
      return;
    }

    if (isNaN(numericRal) || numericRal <= 0) {
      setError('Inserisci una RAL valida e maggiore di 0 €.');
      return;
    }

    if (numericRal > 10000000) {
      setError('La RAL massima inseribile per questa simulazione è 10.000.000 €.');
      return;
    }

    setError(null);
    onCalculate(numericRal);
  };

  const handleResetClick = () => {
    setInputValue('');
    setError(null);
    onReset();
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-jet transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-600" />
            Inserisci la tua RAL
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Calcola in modo trasparente stipendio netto e imposte.
          </p>
        </div>
        {hasCalculated && (
          <button
            type="button"
            onClick={handleResetClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="ral-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
            Retribuzione Annua Lorda (RAL €)
          </label>
          <div className="relative rounded-xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 font-semibold text-lg">
              €
            </div>
            <input
              id="ral-input"
              type="number"
              min="0"
              step="500"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="es. 35.000"
              className={`block w-full pl-9 pr-4 py-3.5 text-lg font-semibold text-slate-900 bg-slate-50 border ${
                error
                  ? 'border-red-400 focus:ring-red-400 focus:border-red-400'
                  : 'border-slate-300 focus:ring-blue-600 focus:border-blue-600'
              } rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all`}
            />
          </div>
          {error && (
            <div className="mt-2.5 flex items-center gap-1.5 text-sm text-red-600 animate-fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Preset chips for fast interaction */}
        <div>
          <span className="text-xs text-slate-400 font-medium block mb-2">Esempi rapidi:</span>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handlePresetClick(preset)}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-transparent rounded-lg transition-all"
              >
                {preset.toLocaleString('it-IT')} €
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full relative inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer disabled:cursor-not-allowed overflow-hidden group"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Calcolo in corso...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Calcola Netto</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
