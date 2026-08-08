# 🚀 Italian Gross-to-Net Salary Calculator (RAL to Net)

A modern, fast, and responsive web application built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. Designed with inspiration from **Jet HR**, **Linear**, and **Stripe**, this application accurately calculates net annual and monthly salary from Gross Annual Salary (**RAL - Retribuzione Annua Lorda**) using current Italian tax laws.

![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20TypeScript%20%7C%20Vite%20%7C%20Tailwind-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🌟 Key Features

- **⚡ Fast Frontend-Only Logic**: Zero backend dependencies; pure mathematical & tax logic implemented entirely in pure, side-effect-free TypeScript functions.
- **📊 Interactive Visual Breakdown**:
  - **Stacked Distribution Bar**: Visual representation of Net Salary vs. IRPEF & Taxes vs. INPS Contributions.
  - **Waterfall Flowchart**: 4-step breakdown tracing the journey from Gross RAL to final Net income.
- **🇮🇹 Italian IRPEF Brackets**: Accurate progressive tax bracket calculation (23%, 33%, 43%) alongside local regional and municipal tax additions.
- **🎨 Modern UI & UX**:
  - Soft cards, clean shadows, and typography inspired by Jet HR and Linear.
  - Quick sample presets (€25k, €35k, €45k, €60k) for instant testing.
  - Simulated loading feedback (~500ms) with smooth result entrance animations.
  - Form validation with error states and one-click reset.
- **📚 Educational & Transparency Bonus Sections**:
  - Interactive **"How the Net Salary is Calculated"** accordion guide.
  - Configurable **"Simulator Baseline Assumptions"** breakdown.
  - Simulation notice disclaimer.

---

## 🧮 Tax Calculation Logic & Formulas

All tax operations reside in `src/utils/tax.ts` as pure functions:

1. **INPS Social Security Contributions (`calculateContributions`)**:
   $$\text{INPS} = \text{RAL} \times 9.19\%$$
2. **Taxable Income (`calculateTaxableIncome`)**:
   $$\text{Taxable Income} = \text{RAL} - \text{INPS}$$
3. **National IRPEF (`calculateIrpef`)** applied progressively:
   - **Up to €28,000**: 23%
   - **€28,000.01 to €50,000**: 33%
   - **Over €50,000**: 43%
4. **Regional Tax (`calculateRegionalTax`)** applied progressively ([Source: Regione Lombardia](https://www.regione.lombardia.it/bollo-auto-e-tributi-regionali/red-addizionale-regionale-irpef)):
   - **Up to €15,000**: 1.23%
   - **€15,000.01 to €28,000**: 1.58%
   - **€28,000.01 to €50,000**: 1.72%
   - **Over €50,000**: 1.73%
5. **Municipal Tax (`calculateMunicipalTax`)** ([Source: Comune di Milano](https://www.comune.milano.it/argomenti/tributi/addizionale-comunale-irpef)):
   - **Taxable Income $\le$ €23,000**: Exempt (€0)
   - **Taxable Income > €23,000**: $$\text{Municipal Tax} = \text{Taxable Income} \times 0.80\% \quad \text{(Milan baseline)}$$
6. **Net Salary (`calculateNetSalary`)**:
   $$\text{Net Annual} = \text{Taxable Income} - (\text{IRPEF} + \text{Regional Tax} + \text{Municipal Tax})$$
   $$\text{Net Monthly} = \frac{\text{Net Annual}}{13}$$

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── Disclaimer.tsx       # Simulation disclaimers, guide accordion & assumptions
│   ├── Results.tsx          # Key metrics, tax card groups & IRPEF bracket detail
│   ├── SalaryInput.tsx      # RAL numerical input, presets, validation & submit
│   ├── SummaryCard.tsx      # Reusable highlight card component
│   └── TaxBreakdown.tsx     # Visual progress bar & 4-step waterfall diagram
├── types/
│   └── salary.ts            # TypeScript interfaces for calculation results & assumptions
├── utils/
│   ├── currency.ts          # Intl locale currency formatting (it-IT Euro)
│   └── tax.ts               # Pure calculation functions (INPS, IRPEF, Addizionali)
├── App.tsx                  # Header layout, state management & orchestration
├── main.tsx                 # React DOM entry point
└── index.css                # Tailwind base imports & custom shadow utilities
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18.0 or higher) and **npm** installed on your system.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/jethr_assignment.git
   cd jethr_assignment
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production**:
   ```bash
   npm run build
   ```
   The production-ready assets will be compiled into the `dist/` directory.

---

## 📌 Simulator Baseline Assumptions

Unless specified otherwise, the default parameters applied in this prototype assume:
- **Contract**: Permanent Employee (*Tempo Indeterminato*)
- **Category**: White-Collar / Specialist (*Impiegato*)
- **Residence**: Milan, Lombardy (*Milano*)
- **Dependents**: None (0)
- **Tax Deductions / Special Exemptions**: None
- **Installments**: 13 Monthly Payments

---

## 🔗 Official Tax Sources & References

- **Addizionale Comunale IRPEF (Comune di Milano)**: [Comune di Milano - Addizionale Comunale IRPEF Official Page](https://www.comune.milano.it/argomenti/tributi/addizionale-comunale-irpef)
- **Addizionale Regionale IRPEF (Regione Lombardia)**: [Regione Lombardia - Addizionale Regionale IRPEF Official Page](https://www.regione.lombardia.it/bollo-auto-e-tributi-regionali/red-addizionale-regionale-irpef)

---

## ⚠️ Disclaimer

*This application is an indicative simulation tool created for demonstration and evaluation purposes. It does not constitute an official paystub (cedolino) or certified financial/tax advice. Actual net salary may vary based on collective bargaining agreements (CCNL), family allowances, personal deductions, and local municipality surcharges.*
