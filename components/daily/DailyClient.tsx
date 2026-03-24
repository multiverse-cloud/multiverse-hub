'use client'

import { useEffect, useState } from 'react'
import {
  Activity,
  Calendar,
  Clock,
  Coffee,
  DollarSign,
  Flame,
  Percent,
  Receipt,
  Ruler,
  Sun,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const numberFormatter = new Intl.NumberFormat('en-IN')

const DAILY_TOOLS = [
  { id: 'age', icon: Calendar, label: 'Age Calculator', href: '/tools/calculator/age-calculator', tone: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300', desc: 'Calculate exact age' },
  { id: 'bmi', icon: Activity, label: 'BMI Calculator', href: '/tools/calculator/bmi-calculator', tone: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300', desc: 'Body mass index' },
  { id: 'emi', icon: DollarSign, label: 'EMI Calculator', href: '/tools/calculator/emi-calculator', tone: 'bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300', desc: 'Loan EMI schedule' },
  { id: 'currency', icon: DollarSign, label: 'Currency Converter', href: '/tools/calculator/currency-converter', tone: 'bg-sky-100 text-sky-600 dark:bg-sky-950/40 dark:text-sky-300', desc: '170+ currencies' },
  { id: 'unit', icon: Ruler, label: 'Unit Converter', href: '/tools/calculator/unit-converter', tone: 'bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300', desc: 'Length, weight, temperature' },
  { id: 'pct', icon: Percent, label: 'Percentage', href: '/tools/calculator/percentage-calculator', tone: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-950/40 dark:text-yellow-300', desc: 'Percentages and discounts' },
  { id: 'compound', icon: TrendingUp, label: 'Compound Interest', href: '/tools/calculator/compound-interest-calculator', tone: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-300', desc: 'Investment growth' },
  { id: 'gst', icon: Receipt, label: 'GST Calculator', href: '/tools/calculator/gst-calculator', tone: 'bg-violet-100 text-violet-600 dark:bg-violet-950/40 dark:text-violet-300', desc: 'GST and taxes' },
  { id: 'tip', icon: Coffee, label: 'Tip Calculator', href: '/tools/calculator/tip-calculator', tone: 'bg-pink-100 text-pink-600 dark:bg-pink-950/40 dark:text-pink-300', desc: 'Bill splitting' },
  { id: 'date', icon: Calendar, label: 'Date Difference', href: '/tools/calculator/date-difference-calculator', tone: 'bg-teal-100 text-teal-600 dark:bg-teal-950/40 dark:text-teal-300', desc: 'Days between dates' },
  { id: 'timezone', icon: Clock, label: 'Timezone Converter', href: '/tools/calculator/timezone-converter', tone: 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200', desc: 'World time zones' },
  { id: 'calorie', icon: Flame, label: 'Calorie Calculator', href: '/tools/calculator/calorie-calculator', tone: 'bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-300', desc: 'Daily calorie needs' },
  { id: 'salary', icon: Wallet, label: 'Salary Calculator', href: '/tools/calculator/salary-calculator', tone: 'bg-green-100 text-green-600 dark:bg-green-950/40 dark:text-green-300', desc: 'Net salary after tax' },
]

function EMICalculator() {
  const [principal, setPrincipal] = useState('500000')
  const [rate, setRate] = useState('8.5')
  const [tenure, setTenure] = useState('60')

  const p = parseFloat(principal) || 0
  const r = parseFloat(rate) / 12 / 100
  const n = parseInt(tenure) || 1
  const emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
  const total = emi * n
  const interest = total - p

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-amber-500" /> EMI Calculator
      </h3>
      <div className="space-y-4">
        {[
          { label: 'Loan Amount (Rs)', value: principal, set: setPrincipal, min: '10000', max: '10000000' },
          { label: 'Interest Rate (% p.a.)', value: rate, set: setRate, min: '1', max: '30' },
          { label: 'Tenure (months)', value: tenure, set: setTenure, min: '6', max: '360' },
        ].map(({ label, value, set, min, max }) => (
          <div key={label}>
            <div className="flex justify-between text-sm mb-1.5">
              <label className="text-muted-foreground">{label}</label>
              <span className="font-semibold">{numberFormatter.format(parseFloat(value) || 0)}</span>
            </div>
            <input type="range" min={min} max={max} value={value} onChange={e => set(e.target.value)} className="w-full accent-indigo-600" />
          </div>
        ))}
        <div className="mt-4 grid grid-cols-3 gap-3 pt-4 border-t border-border">
          {[
            { label: 'Monthly EMI', value: `Rs ${isNaN(emi) ? 0 : emi.toFixed(0)}`, highlight: true },
            { label: 'Total Amount', value: `Rs ${isNaN(total) ? 0 : (total / 100000).toFixed(2)}L` },
            { label: 'Total Interest', value: `Rs ${isNaN(interest) ? 0 : (interest / 100000).toFixed(2)}L` },
          ].map(item => (
            <div key={item.label} className={cn('text-center p-3 rounded-xl', item.highlight ? 'bg-indigo-50 dark:bg-indigo-950/30' : 'bg-muted/50')}>
              <p className={cn('font-bold text-base', item.highlight && 'text-indigo-600 dark:text-indigo-400')}>{item.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AgeCalculator() {
  const [dob, setDob] = useState('1995-01-15')
  const birth = new Date(dob)
  const [today, setToday] = useState<Date | null>(null)

  useEffect(() => {
    setToday(new Date())
  }, [])

  const hasValidBirth = !Number.isNaN(birth.getTime())
  const ageYears = today && hasValidBirth ? today.getFullYear() - birth.getFullYear() : 0
  const ageMonths = today && hasValidBirth ? today.getMonth() - birth.getMonth() : 0
  const ageDays = today && hasValidBirth ? today.getDate() - birth.getDate() : 0
  const years = today && hasValidBirth && (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) ? ageYears - 1 : ageYears
  const months = today && hasValidBirth ? (ageMonths + 12) % 12 : 0
  const totalDays = today && hasValidBirth ? Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24)) : 0

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-violet-500" /> Age Calculator
      </h3>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground block mb-1.5">Date of Birth</label>
          <input type="date" value={dob} onChange={e => setDob(e.target.value)} className="w-full bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400" />
        </div>
        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border">
          {[
            { label: 'Years', value: today ? years : '--', color: 'text-violet-600 dark:text-violet-400' },
            { label: 'Months', value: today ? months : '--', color: 'text-indigo-600 dark:text-indigo-400' },
            { label: 'Total Days', value: today ? numberFormatter.format(totalDays) : '--', color: 'text-blue-600 dark:text-blue-400' },
          ].map(item => (
            <div key={item.label} className="text-center p-3 bg-muted/50 rounded-xl">
              <p className={cn('font-bold text-xl', item.color)}>{item.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function UnitConverter() {
  const [category, setCategory] = useState('length')
  const [value, setValue] = useState('100')

  const conversions: Record<string, { units: string[]; factors: number[]; label: string }> = {
    length: { label: 'Length', units: ['km', 'miles', 'meters', 'feet', 'inches', 'cm'], factors: [1, 0.621371, 1000, 3280.84, 39370.1, 100000] },
    weight: { label: 'Weight', units: ['kg', 'lbs', 'grams', 'ounces', 'tonnes'], factors: [1, 2.20462, 1000, 35.274, 0.001] },
    temperature: { label: 'Temperature', units: ['deg C', 'deg F', 'K'], factors: [1, 1, 1] },
  }

  const cat = conversions[category]
  const inputVal = parseFloat(value) || 0

  function convert(toUnit: string, idx: number) {
    if (category === 'temperature') {
      if (toUnit === 'deg F') return ((inputVal * 9 / 5) + 32).toFixed(2)
      if (toUnit === 'K') return (inputVal + 273.15).toFixed(2)
      return inputVal.toFixed(2)
    }
    return (inputVal * cat.factors[idx]).toFixed(4)
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <Ruler className="w-5 h-5 text-pink-500" /> Unit Converter
      </h3>
      <div className="space-y-3">
        <div className="flex gap-2">
          {Object.entries(conversions).map(([k, v]) => (
            <button key={k} onClick={() => setCategory(k)} className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-colors', category === k ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'bg-muted text-muted-foreground hover:text-foreground')}>
              {v.label}
            </button>
          ))}
        </div>
        <input type="number" value={value} onChange={e => setValue(e.target.value)} placeholder="Enter value..." className="w-full bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
        <div className="grid grid-cols-2 gap-2">
          {cat.units.map((unit, idx) => (
            <div key={unit} className="flex items-center justify-between bg-muted/50 rounded-lg px-3 py-2">
              <span className="text-xs text-muted-foreground">{unit}</span>
              <span className="text-sm font-semibold">{convert(unit, idx)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function DailyClient() {
  return (
    <div>
      <section className="page-hero">
        <div className="page-hero-inner text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/10 dark:bg-slate-100 dark:text-slate-950">
            <Sun className="h-5 w-5" />
          </div>
          <p className="section-label">Daily Tools Universe</p>
          <h1 className="section-title">Daily Tools</h1>
          <p className="section-sub">Calculators, converters and everyday utilities.</p>
        </div>
      </section>

      <section className="page-content">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mb-10">
          {DAILY_TOOLS.map(tool => {
            const Icon = tool.icon

            return (
              <Link key={tool.id} href={tool.href} className="group bg-card border border-border rounded-2xl p-4 flex flex-col gap-2.5 card-hover">
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110', tool.tone)}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-xs leading-tight">{tool.label}</p>
                  <p className="text-xs text-muted-foreground">{tool.desc}</p>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mb-4 text-center">
          <p className="section-label">Quick Access</p>
          <h2 className="section-title text-2xl md:text-3xl">Quick Calculators</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <EMICalculator />
          <AgeCalculator />
          <UnitConverter />
        </div>
      </section>
    </div>
  )
}
