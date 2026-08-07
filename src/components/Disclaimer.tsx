// File: src/components/Disclaimer.tsx

import React, { useState } from 'react';
import {
  AlertTriangle,
  ChevronDown,
  HelpCircle,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { DEFAULT_ASSUMPTIONS } from '../utils/tax';

export const Disclaimer: React.FC = () => {
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);
  const [assumptionsOpen, setAssumptionsOpen] = useState<boolean>(false);

  return (
    <div className="space-y-6 pt-4">
      {/* Simulation Warning Banner */}
      <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-sm">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
          <span className="font-bold block text-amber-950 mb-0.5">
            Simulazione indicativa non ufficiale
          </span>
          I calcoli presentati in questa applicazione hanno scopo puramente illustrativo e promozionale.
          Non costituiscono un cedolino paga né una consulenza fiscale o contabile ufficiale.
          Il netto effettivo in busta paga può variare in base a contratti collettivi (CCNL), detrazioni personali, assegni familiari e addizionali specifiche.
        </div>
      </div>

      {/* Accordion: Come viene calcolato il netto */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-jet overflow-hidden">
        <button
          type="button"
          onClick={() => setAccordionOpen(!accordionOpen)}
          className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2 text-sm sm:text-base">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Come viene calcolato il netto? (Guida alla formula)
          </span>
          <ChevronDown
            className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
              accordionOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {accordionOpen && (
          <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-600 space-y-4 border-t border-slate-100 animate-fade-in">
            <p className="leading-relaxed">
              La trasformazione dalla Retribuzione Annua Lorda (RAL) allo stipendio netto segue un algoritmo a cascata stabilito dalla normativa fiscale italiana:
            </p>

            <ol className="space-y-3 list-decimal list-inside text-slate-700 font-medium">
              <li className="p-3 bg-slate-50 rounded-xl">
                <strong className="text-slate-900">Calcolo dei Contributi INPS:</strong> Si applica l'aliquota a carico del lavoratore (9.19%) sulla RAL lorda.
              </li>
              <li className="p-3 bg-slate-50 rounded-xl">
                <strong className="text-slate-900">Determinazione dell'Imponibile IRPEF:</strong> Si sottrae l'importo dei contributi INPS dalla RAL (<code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-xs">Imponibile = RAL - Contributi</code>).
              </li>
              <li className="p-3 bg-slate-50 rounded-xl">
                <strong className="text-slate-900">Calcolo dell'IRPEF Lorda:</strong> Si applicano gli scaglioni IRPEF progressivi (23% fino a 28k, 35% fino a 50k, 43% oltre 50k) sul Reddito Imponibile.
              </li>
              <li className="p-3 bg-slate-50 rounded-xl">
                <strong className="text-slate-900">Calcolo Addizionali Locali:</strong> Si applica l'addizionale regionale (1.23% in Lombardia) e l'addizionale comunale (0.80% a Milano) sull'imponibile IRPEF.
              </li>
              <li className="p-3 bg-slate-50 rounded-xl">
                <strong className="text-slate-900">Ottenimento del Netto:</strong> Si sottraggono IRPEF e Addizionali dall'imponibile per trovare il netto annuo, e si divide per 13 mensilità per ottenere il netto mensile.
              </li>
            </ol>
          </div>
        )}
      </div>

      {/* Section: Assunzioni del simulatore */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-jet overflow-hidden">
        <button
          type="button"
          onClick={() => setAssumptionsOpen(!assumptionsOpen)}
          className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2 text-sm sm:text-base">
            <FileText className="w-5 h-5 text-indigo-600" />
            Assunzioni del simulatore (Parametri predefiniti)
          </span>
          <ChevronDown
            className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
              assumptionsOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {assumptionsOpen && (
          <div className="px-6 pb-6 pt-2 border-t border-slate-100 animate-fade-in">
            <p className="text-xs text-slate-500 mb-4">
              I seguenti parametri standard sono adottati per standardizzare il calcolo:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <div>
                  <span className="text-slate-400 block">Tipo di Contratto</span>
                  <span className="font-bold text-slate-800">{DEFAULT_ASSUMPTIONS.contractType}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <div>
                  <span className="text-slate-400 block">Qualifica</span>
                  <span className="font-bold text-slate-800">{DEFAULT_ASSUMPTIONS.category}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <div>
                  <span className="text-slate-400 block">Residenza Fiscale</span>
                  <span className="font-bold text-slate-800">{DEFAULT_ASSUMPTIONS.residence}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <div>
                  <span className="text-slate-400 block">Familiari a carico</span>
                  <span className="font-bold text-slate-800">Nessuno (0)</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <div>
                  <span className="text-slate-400 block">Mensilità</span>
                  <span className="font-bold text-slate-800">{DEFAULT_ASSUMPTIONS.installments} Mensilità</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <div>
                  <span className="text-slate-400 block">Agevolazioni Fisc. particolari</span>
                  <span className="font-bold text-slate-800">Nessuna</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Final Legal Disclaimer Footer text */}
      <div className="text-center text-xs text-slate-400 pt-4 border-t border-slate-200/60">
        <p>© {new Date().getFullYear()} Jet HR Simulator — Strumento dimostrativo per sviluppatori e professionisti HR.</p>
      </div>
    </div>
  );
};
