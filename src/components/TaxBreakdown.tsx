// File: src/components/TaxBreakdown.tsx

import React from 'react';
import { SalaryCalculation } from '../types/salary';
import { formatCurrency, formatPercent } from '../utils/currency';
import { ArrowDown, ShieldCheck, PieChart, Layers } from 'lucide-react';

interface TaxBreakdownProps {
  calculation: SalaryCalculation;
}

export const TaxBreakdown: React.FC<TaxBreakdownProps> = ({ calculation }) => {
  const {
    ral,
    inpsContributions,
    inpsRate,
    taxableIncome,
    irpef,
    regionalTax,
    regionalTaxRate,
    municipalTax,
    municipalTaxRate,
    totalTaxes,
    netAnnual,
  } = calculation;

  if (ral <= 0) return null;

  const inpsPercent = (inpsContributions / ral) * 100;
  const taxesPercent = (totalTaxes / ral) * 100;
  const netPercent = (netAnnual / ral) * 100;

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-jet space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-indigo-600" />
            Breakdown della RAL
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Ripartizione percentuale di contributi, tasse e netto.
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full">
          Trattenute totali: {formatPercent((inpsContributions + totalTaxes) / ral)}
        </span>
      </div>

      {/* Visual Stacked Progress Bar */}
      <div>
        <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-2">
          <span>Distribuzione RAL</span>
          <span>100% ({formatCurrency(ral)})</span>
        </div>
        <div className="h-6 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner p-0.5">
          <div
            style={{ width: `${netPercent}%` }}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-l-full transition-all duration-700 relative group cursor-pointer"
            title={`Netto: ${formatCurrency(netAnnual)} (${netPercent.toFixed(1)}%)`}
          >
            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow pointer-events-none whitespace-nowrap transition-opacity">
              Netto: {netPercent.toFixed(1)}%
            </div>
          </div>

          <div
            style={{ width: `${taxesPercent}%` }}
            className="bg-gradient-to-r from-amber-500 to-orange-500 h-full transition-all duration-700 relative group cursor-pointer"
            title={`Tasse: ${formatCurrency(totalTaxes)} (${taxesPercent.toFixed(1)}%)`}
          >
            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow pointer-events-none whitespace-nowrap transition-opacity">
              Tasse: {taxesPercent.toFixed(1)}%
            </div>
          </div>

          <div
            style={{ width: `${inpsPercent}%` }}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-r-full transition-all duration-700 relative group cursor-pointer"
            title={`INPS: ${formatCurrency(inpsContributions)} (${inpsPercent.toFixed(1)}%)`}
          >
            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow pointer-events-none whitespace-nowrap transition-opacity">
              INPS: {inpsPercent.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-2 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100/80">
            <div className="flex items-center justify-center gap-1.5 font-bold text-emerald-800">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              Stipendio Netto
            </div>
            <div className="text-slate-900 font-extrabold mt-1 text-sm">{formatCurrency(netAnnual)}</div>
            <div className="text-emerald-700 text-[11px] font-medium">{netPercent.toFixed(1)}% della RAL</div>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-100/80">
            <div className="flex items-center justify-center gap-1.5 font-bold text-amber-800">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
              Tasse Totali
            </div>
            <div className="text-slate-900 font-extrabold mt-1 text-sm">{formatCurrency(totalTaxes)}</div>
            <div className="text-amber-700 text-[11px] font-medium">{taxesPercent.toFixed(1)}% della RAL</div>
          </div>

          <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100/80">
            <div className="flex items-center justify-center gap-1.5 font-bold text-blue-800">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
              Contributi INPS
            </div>
            <div className="text-slate-900 font-extrabold mt-1 text-sm">{formatCurrency(inpsContributions)}</div>
            <div className="text-blue-700 text-[11px] font-medium">{inpsPercent.toFixed(1)}% della RAL</div>
          </div>
        </div>
      </div>

      {/* Step-by-Step Waterfall Flow (RAL -> Contributi -> Tasse -> Netto) */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" />
          Percorso del calcolo (Waterfall)
        </h4>

        <div className="space-y-3">
          {/* Step 1: RAL */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/60">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold">
                1
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">RAL (Retribuzione Annua Lorda)</div>
                <div className="text-xs text-slate-500">Punto di partenza lordo contrattuale</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-base font-extrabold text-slate-900">{formatCurrency(ral)}</div>
              <div className="text-xs text-slate-400">100%</div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center -my-1">
            <ArrowDown className="w-4 h-4 text-slate-400" />
          </div>

          {/* Step 2: Contributi INPS */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/50 border border-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                2
              </div>
              <div>
                <div className="text-sm font-bold text-blue-950">Contributi INPS Dipendente</div>
                <div className="text-xs text-blue-600">Aliquota standard {formatPercent(inpsRate)}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-base font-bold text-blue-700">- {formatCurrency(inpsContributions)}</div>
              <div className="text-xs text-blue-600 font-medium">Imponibile: {formatCurrency(taxableIncome)}</div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center -my-1">
            <ArrowDown className="w-4 h-4 text-slate-400" />
          </div>

          {/* Step 3: Tasse IRPEF & Addizionali */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/50 border border-amber-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">
                3
              </div>
              <div>
                <div className="text-sm font-bold text-amber-950">Tasse Irpef + Addizionali</div>
                <div className="text-xs text-amber-700">
                  IRPEF ({formatCurrency(irpef)}) + Reg. ({formatPercent(regionalTaxRate)}) + Com. ({formatPercent(municipalTaxRate)})
                </div>
              </div>
            </div>
              <div className="text-right">
                <div className="text-base font-bold text-amber-700">- {formatCurrency(totalTaxes)}</div>
                <div className="text-xs text-amber-600 font-medium">
                  Reg: {formatCurrency(regionalTax)} | Com: {municipalTax > 0 ? formatCurrency(municipalTax) : 'Esente'}
                </div>
              </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center -my-1">
            <ArrowDown className="w-4 h-4 text-emerald-500" />
          </div>

          {/* Step 4: Netto Finale */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-50 border-2 border-emerald-300 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-sm font-black shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-base font-extrabold text-emerald-950">Retribuzione Netta Annuale</div>
                <div className="text-xs text-emerald-700 font-medium">
                  Disponibilità reale netta in tasca ({calculation.monthlyInstallments} mensilità)
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg sm:text-xl font-black text-emerald-700">{formatCurrency(netAnnual)}</div>
              <div className="text-xs font-bold text-emerald-800 bg-emerald-200/70 px-2 py-0.5 rounded-full inline-block mt-0.5">
                {formatCurrency(calculation.netMonthly)} / mese
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
