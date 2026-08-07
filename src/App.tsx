// File: src/App.tsx

import React, { useState, useRef } from 'react';
import { SalaryInput } from './components/SalaryInput';
import { Results } from './components/Results';
import { Disclaimer } from './components/Disclaimer';
import { SalaryCalculation } from './types/salary';
import { calculateNetSalary } from './utils/tax';
import { Zap, ShieldCheck } from 'lucide-react';

export const App: React.FC = () => {
  const [calculation, setCalculation] = useState<SalaryCalculation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleCalculate = (ral: number) => {
    setIsLoading(true);

    // Simulated calculation delay (~500ms) for smooth UX feedback
    setTimeout(() => {
      const result = calculateNetSalary(ral);
      setCalculation(result);
      setIsLoading(false);

      // Smooth scroll to results on mobile/desktop
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }, 500);
  };

  const handleReset = () => {
    setCalculation(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Jet HR Header Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black shadow-sm tracking-tight">
              Jet
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight">
                Jet HR <span className="font-medium text-slate-500">Calculator</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Simulation Engine
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500 hidden md:flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              IRPEF 2026 Ready
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* Title & Tagline Banner */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 fill-blue-600" />
            <span>Calcolo veloce da RAL a Netto</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Quanto guadagni davvero in busta paga?
          </h1>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
            Inserisci la tua Retribuzione Annua Lorda (RAL) per scoprire subito lo stipendio netto mensile e annuale con il calcolo progressivo IRPEF.
          </p>
        </div>

        {/* Salary Input Component */}
        <SalaryInput
          onCalculate={handleCalculate}
          onReset={handleReset}
          isLoading={isLoading}
          hasCalculated={calculation !== null}
        />

        {/* Results Container */}
        <div ref={resultsRef}>
          {calculation && !isLoading && (
            <Results calculation={calculation} />
          )}

          {/* Skeleton loading preview while calculating */}
          {isLoading && (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-jet space-y-6 animate-pulse">
              <div className="h-6 bg-slate-200 rounded-md w-1/3"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-24 bg-slate-100 rounded-xl"></div>
                <div className="h-24 bg-slate-100 rounded-xl"></div>
              </div>
              <div className="h-40 bg-slate-100 rounded-xl"></div>
            </div>
          )}
        </div>

        {/* Bonus & Disclaimers Section */}
        <Disclaimer />
      </main>
    </div>
  );
};
