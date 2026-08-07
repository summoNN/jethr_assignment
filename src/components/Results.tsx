// File: src/components/Results.tsx

import React from 'react';
import { SalaryCalculation } from '../types/salary';
import { SummaryCard } from './SummaryCard';
import { TaxBreakdown } from './TaxBreakdown';
import { formatCurrency, formatPercent } from '../utils/currency';
import {
  Wallet,
  Calendar,
  Building,
  Receipt,
  Landmark
} from 'lucide-react';

interface ResultsProps {
  calculation: SalaryCalculation;
}

export const Results: React.FC<ResultsProps> = ({ calculation }) => {
  const {
    ral,
    inpsContributions,
    inpsRate,
    taxableIncome,
    irpef,
    irpefBrackets,
    regionalTax,
    regionalTaxRate,
    municipalTax,
    municipalTaxRate,
    netAnnual,
    netMonthly,
    monthlyInstallments,
    effectiveTaxRate,
    totalTaxes,
  } = calculation;

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Primary Highlights: Net Monthly & Net Annual */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <SummaryCard
          title="Netto Mensile"
          value={formatCurrency(netMonthly)}
          subtitle={`Calcolato su ${monthlyInstallments} mensilità`}
          variant="primary"
          badge={`${monthlyInstallments} Mensilità`}
          icon={<Calendar className="w-6 h-6 text-white" />}
        />

        <SummaryCard
          title="Netto Annuale"
          value={formatCurrency(netAnnual)}
          subtitle={`Corrisponde al ${( (netAnnual / ral) * 100 ).toFixed(1)}% della RAL`}
          variant="success"
          badge="Totale Netto Anno"
          icon={<Wallet className="w-6 h-6 text-emerald-700" />}
        />
      </div>

      {/* Grid: Retribuzione vs Tasse */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Retribuzione Group */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-jet space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building className="w-4 h-4 text-blue-600" />
              Retribuzione & Imponibile
            </h3>
            <span className="text-xs text-slate-400 font-medium">Valori Annui</span>
          </div>

          <div className="space-y-3.5">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
              <span className="text-sm font-medium text-slate-600">RAL (Lordo Annuo)</span>
              <span className="text-base font-bold text-slate-900">{formatCurrency(ral)}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
              <div>
                <span className="text-sm font-medium text-slate-600 block">Contributi INPS</span>
                <span className="text-xs text-slate-400">Aliquota dipendente {formatPercent(inpsRate)}</span>
              </div>
              <span className="text-base font-bold text-blue-700">- {formatCurrency(inpsContributions)}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/60 border border-blue-100">
              <div>
                <span className="text-sm font-bold text-blue-950 block">Reddito Imponibile IRPEF</span>
                <span className="text-xs text-blue-600">Base per il calcolo delle imposte</span>
              </div>
              <span className="text-base font-extrabold text-blue-900">{formatCurrency(taxableIncome)}</span>
            </div>
          </div>
        </div>

        {/* Tasse Group */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-jet space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Receipt className="w-4 h-4 text-amber-600" />
              Imposte & Addizionali
            </h3>
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
              Pressione fiscale: {effectiveTaxRate.toFixed(1)}%
            </span>
          </div>

          <div className="space-y-3.5">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
              <div>
                <span className="text-sm font-medium text-slate-600 block">IRPEF Nazionale</span>
                <span className="text-xs text-slate-400">Progressiva per scaglioni</span>
              </div>
              <span className="text-base font-bold text-slate-900">{formatCurrency(irpef)}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
              <div>
                <span className="text-sm font-medium text-slate-600 block">Addizionale Regionale</span>
                <span className="text-xs text-slate-400">Regione Lombardia ({formatPercent(regionalTaxRate)})</span>
              </div>
              <span className="text-base font-bold text-slate-900">{formatCurrency(regionalTax)}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
              <div>
                <span className="text-sm font-medium text-slate-600 block">Addizionale Comunale</span>
                <span className="text-xs text-slate-400">Comune di Milano ({formatPercent(municipalTaxRate)})</span>
              </div>
              <span className="text-base font-bold text-slate-900">{formatCurrency(municipalTax)}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/60 border border-amber-100">
              <span className="text-sm font-bold text-amber-950">Totale Tasse Annue</span>
              <span className="text-base font-extrabold text-amber-800">{formatCurrency(totalTaxes)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* IRPEF Brackets Detail Dropdown/Card */}
      {irpefBrackets.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-jet">
          <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Landmark className="w-4 h-4 text-purple-600" />
            Dettaglio Scaglioni IRPEF Nazionali Applicati
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {irpefBrackets.map((bracket, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs space-y-1">
                <div className="font-bold text-slate-800 flex justify-between">
                  <span>{bracket.bracketLabel}</span>
                  <span className="text-purple-600 font-extrabold">{formatPercent(bracket.rate, 0)}</span>
                </div>
                <div className="text-slate-500">
                  Imponibile quota: <span className="font-medium text-slate-700">{formatCurrency(bracket.taxableAmountInBracket)}</span>
                </div>
                <div className="text-slate-900 font-bold pt-1 border-t border-slate-200/60 mt-1">
                  Imposta: {formatCurrency(bracket.taxAmount)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Breakdown Component */}
      <TaxBreakdown calculation={calculation} />
    </div>
  );
};
