'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeftRight,
  CalendarDays,
  CheckCircle2,
  ClipboardCopy,
  Clock3,
  Gauge,
  RefreshCw,
  Sparkles,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import type { Tool } from '@/lib/tools-data'
import { type CalculatorStudioSlug } from '@/lib/calculator-studio'
import { cn } from '@/lib/utils'

type FieldOption = {
  label: string
  value: string
}

type FieldConfig = {
  key: string
  label: string
  type: 'number' | 'date' | 'datetime-local' | 'select'
  placeholder?: string
  min?: string
  max?: string
  step?: string
  options?: FieldOption[]
  suffix?: string
  helper?: string
  span?: 'full' | 'half'
}

type PresetConfig = {
  label: string
  hint: string
  values: Record<string, string>
}

type Metric = {
  label: string
  value: string
}

type CalculatorResult = {
  ready: boolean
  headline: string
  subheadline: string
  primaryLabel: string
  primaryValue: string
  secondaryLabel: string
  secondaryValue: string
  stats: Metric[]
  insight: string
  summary: string
}

type CalculatorDefinition = {
  eyebrow: string
  title: string
  summary: string
  badges: string[]
  tip: string
  fieldTitle: string
  fieldSummary: string
  fields: FieldConfig[]
  defaultValues: Record<string, string>
  presets: PresetConfig[]
  calculate: (values: Record<string, string>) => CalculatorResult
}

const integerFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 0,
})

const CURRENCY_OPTIONS: FieldOption[] = [
  { label: 'Indian Rupee', value: 'INR' },
  { label: 'US Dollar', value: 'USD' },
  { label: 'Euro', value: 'EUR' },
  { label: 'British Pound', value: 'GBP' },
  { label: 'UAE Dirham', value: 'AED' },
  { label: 'Singapore Dollar', value: 'SGD' },
  { label: 'Japanese Yen', value: 'JPY' },
  { label: 'Australian Dollar', value: 'AUD' },
]

const CURRENCY_RATES: Record<string, number> = {
  USD: 1,
  INR: 83.12,
  EUR: 0.92,
  GBP: 0.79,
  AED: 3.67,
  SGD: 1.34,
  JPY: 151.2,
  AUD: 1.53,
}

const UNIT_GROUPS = {
  length: {
    label: 'Length',
    from: 'm',
    to: 'ft',
    units: {
      mm: 0.001,
      cm: 0.01,
      m: 1,
      km: 1000,
      in: 0.0254,
      ft: 0.3048,
      yd: 0.9144,
      mi: 1609.34,
    },
  },
  weight: {
    label: 'Weight',
    from: 'kg',
    to: 'lb',
    units: {
      g: 0.001,
      kg: 1,
      lb: 0.45359237,
      oz: 0.0283495231,
      tonne: 1000,
    },
  },
  area: {
    label: 'Area',
    from: 'sqm',
    to: 'sqft',
    units: {
      sqm: 1,
      sqft: 0.09290304,
      acre: 4046.8564224,
      hectare: 10000,
    },
  },
  temperature: {
    label: 'Temperature',
    from: 'C',
    to: 'F',
    units: {
      C: 1,
      F: 1,
      K: 1,
    },
  },
} as const

const TIMEZONE_OPTIONS: FieldOption[] = [
  { label: 'India Standard Time', value: 'Asia/Kolkata' },
  { label: 'UTC', value: 'UTC' },
  { label: 'Dubai', value: 'Asia/Dubai' },
  { label: 'London', value: 'Europe/London' },
  { label: 'Berlin', value: 'Europe/Berlin' },
  { label: 'New York', value: 'America/New_York' },
  { label: 'Los Angeles', value: 'America/Los_Angeles' },
  { label: 'Singapore', value: 'Asia/Singapore' },
  { label: 'Tokyo', value: 'Asia/Tokyo' },
  { label: 'Sydney', value: 'Australia/Sydney' },
]

const ACTIVITY_OPTIONS: FieldOption[] = [
  { label: 'Sedentary', value: 'sedentary' },
  { label: 'Light', value: 'light' },
  { label: 'Moderate', value: 'moderate' },
  { label: 'Active', value: 'active' },
  { label: 'Athlete', value: 'athlete' },
]

const GOAL_OPTIONS: FieldOption[] = [
  { label: 'Maintain', value: 'maintain' },
  { label: 'Cut', value: 'cut' },
  { label: 'Bulk', value: 'bulk' },
]

const SEX_OPTIONS: FieldOption[] = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
]

function formatNumber(value: number, digits = 0) {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value)
}

function formatCurrency(value: number, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'JPY' ? 0 : 2,
  }).format(value)
}

function formatPercent(value: number, digits = 1) {
  return `${formatNumber(value, digits)}%`
}

function parseNumber(value: string) {
  const numeric = Number(value)
  return Number.isFinite(numeric) ? numeric : 0
}

function daysBetween(start: Date, end: Date) {
  return Math.floor((end.getTime() - start.getTime()) / 86400000)
}

function diffDateParts(start: Date, end: Date) {
  let years = end.getFullYear() - start.getFullYear()
  let months = end.getMonth() - start.getMonth()
  let days = end.getDate() - start.getDate()

  if (days < 0) {
    months -= 1
    const previousMonthDays = new Date(end.getFullYear(), end.getMonth(), 0).getDate()
    days += previousMonthDays
  }

  if (months < 0) {
    years -= 1
    months += 12
  }

  return { years, months, days }
}

function countWeekdays(start: Date, end: Date) {
  let count = 0
  const cursor = new Date(start)
  while (cursor <= end) {
    const day = cursor.getDay()
    if (day !== 0 && day !== 6) count += 1
    cursor.setDate(cursor.getDate() + 1)
  }
  return count
}

function getBirthdayCountdown(birthDate: Date, compareDate: Date) {
  const nextBirthday = new Date(compareDate.getFullYear(), birthDate.getMonth(), birthDate.getDate())
  if (nextBirthday < compareDate) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1)
  }
  return Math.ceil((nextBirthday.getTime() - compareDate.getTime()) / 86400000)
}

function convertTemperature(value: number, from: string, to: string) {
  let celsius = value
  if (from === 'F') celsius = ((value - 32) * 5) / 9
  if (from === 'K') celsius = value - 273.15

  if (to === 'F') return (celsius * 9) / 5 + 32
  if (to === 'K') return celsius + 273.15
  return celsius
}

function convertUnit(value: number, group: keyof typeof UNIT_GROUPS, from: string, to: string) {
  if (group === 'temperature') {
    return convertTemperature(value, from, to)
  }

  const units = UNIT_GROUPS[group].units as Record<string, number>
  const base = value * units[from]
  return base / units[to]
}

function getTimeZoneParts(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  const values = Object.fromEntries(
    formatter
      .formatToParts(date)
      .filter(part => part.type !== 'literal')
      .map(part => [part.type, part.value])
  )

  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
    hour: Number(values.hour),
    minute: Number(values.minute),
    second: Number(values.second),
  }
}

function getTimeZoneOffsetMinutes(date: Date, timeZone: string) {
  const parts = getTimeZoneParts(date, timeZone)
  const asUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second)
  return (asUtc - date.getTime()) / 60000
}

function zonedDateTimeToUtc(dateTimeValue: string, timeZone: string) {
  const [datePart, timePart = '00:00'] = dateTimeValue.split('T')
  const [year, month, day] = datePart.split('-').map(Number)
  const [hour, minute] = timePart.split(':').map(Number)
  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute))
  const offset = getTimeZoneOffsetMinutes(utcGuess, timeZone)
  return new Date(utcGuess.getTime() - offset * 60000)
}

function formatInTimeZone(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

function metric(label: string, value: string): Metric {
  return { label, value }
}

const CALCULATOR_DEFINITIONS: Record<CalculatorStudioSlug, CalculatorDefinition> = {
  'age-calculator': {
    eyebrow: 'Personal timeline',
    title: 'Age Calculator',
    summary: 'Calculate exact age, total days lived, and the next birthday window inside one clean workspace.',
    badges: ['Exact age', 'Next birthday', 'Calendar ready'],
    tip: 'Set a future compare date to plan milestones, renewals, or birthday campaigns.',
    fieldTitle: 'Birth details',
    fieldSummary: 'Use two dates to generate an exact age snapshot.',
    fields: [
      { key: 'birthDate', label: 'Date of birth', type: 'date' },
      { key: 'compareDate', label: 'As of date', type: 'date' },
    ],
    defaultValues: {
      birthDate: '1998-04-15',
      compareDate: new Date().toISOString().slice(0, 10),
    },
    presets: [
      { label: 'Adult check', hint: 'Everyday age lookup', values: { birthDate: '1998-04-15' } },
      { label: 'Teen profile', hint: 'School-age example', values: { birthDate: '2009-09-12' } },
      { label: 'Senior profile', hint: 'Retirement planning', values: { birthDate: '1960-01-20' } },
    ],
    calculate(values) {
      const birthDate = new Date(values.birthDate)
      const compareDate = new Date(values.compareDate)
      if (Number.isNaN(birthDate.getTime()) || Number.isNaN(compareDate.getTime()) || compareDate < birthDate) {
        return {
          ready: false,
          headline: 'Enter valid dates',
          subheadline: 'The compare date should be on or after the birth date.',
          primaryLabel: 'Exact age',
          primaryValue: '--',
          secondaryLabel: 'Days lived',
          secondaryValue: '--',
          stats: [metric('Years', '--'), metric('Months', '--'), metric('Days', '--'), metric('Next birthday', '--')],
          insight: 'Use a birth date and compare date to unlock the age breakdown.',
          summary: '',
        }
      }

      const parts = diffDateParts(birthDate, compareDate)
      const totalDays = daysBetween(birthDate, compareDate)
      const nextBirthday = getBirthdayCountdown(birthDate, compareDate)
      const weeks = totalDays / 7

      return {
        ready: true,
        headline: `${parts.years} years ${parts.months} months`,
        subheadline: `Calculated as of ${compareDate.toLocaleDateString('en-IN', { dateStyle: 'medium' })}.`,
        primaryLabel: 'Exact age',
        primaryValue: `${parts.years}y ${parts.months}m ${parts.days}d`,
        secondaryLabel: 'Days lived',
        secondaryValue: integerFormatter.format(totalDays),
        stats: [
          metric('Years', `${parts.years}`),
          metric('Months total', integerFormatter.format(parts.years * 12 + parts.months)),
          metric('Weeks lived', formatNumber(weeks, 1)),
          metric('Next birthday', `${nextBirthday} days`),
        ],
        insight: nextBirthday === 0 ? 'Today is the birthday date in the selected timeline.' : `There are ${nextBirthday} days left until the next birthday.`,
        summary: `Exact age: ${parts.years} years ${parts.months} months ${parts.days} days. Total days lived: ${totalDays}.`,
      }
    },
  },
  'bmi-calculator': {
    eyebrow: 'Health snapshot',
    title: 'BMI Calculator',
    summary: 'Measure body mass index, healthy weight range, and quick health guidance from one lightweight panel.',
    badges: ['BMI score', 'Healthy range', 'Instant guidance'],
    tip: 'BMI is a screening metric, not a diagnosis. Pair it with waist, activity, and body composition context.',
    fieldTitle: 'Body metrics',
    fieldSummary: 'Use height and weight to calculate your body mass index.',
    fields: [
      { key: 'weightKg', label: 'Weight', type: 'number', min: '20', step: '0.1', suffix: 'kg' },
      { key: 'heightCm', label: 'Height', type: 'number', min: '100', step: '0.1', suffix: 'cm' },
    ],
    defaultValues: {
      weightKg: '72',
      heightCm: '175',
    },
    presets: [
      { label: 'Lean profile', hint: 'Athletic range', values: { weightKg: '63', heightCm: '176' } },
      { label: 'Balanced profile', hint: 'Everyday example', values: { weightKg: '72', heightCm: '175' } },
      { label: 'Bulk profile', hint: 'Higher BMI example', values: { weightKg: '94', heightCm: '175' } },
    ],
    calculate(values) {
      const weight = parseNumber(values.weightKg)
      const heightCm = parseNumber(values.heightCm)
      if (weight <= 0 || heightCm <= 0) {
        return {
          ready: false,
          headline: 'Add height and weight',
          subheadline: 'Both values are required for a BMI calculation.',
          primaryLabel: 'BMI',
          primaryValue: '--',
          secondaryLabel: 'Category',
          secondaryValue: '--',
          stats: [metric('Healthy low', '--'), metric('Healthy high', '--'), metric('BMI prime', '--'), metric('Surface area', '--')],
          insight: 'Enter valid body metrics to see the health range.',
          summary: '',
        }
      }

      const bmi = weight / Math.pow(heightCm / 100, 2)
      const category = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Healthy' : bmi < 30 ? 'Overweight' : 'Obese'
      const healthyLow = 18.5 * Math.pow(heightCm / 100, 2)
      const healthyHigh = 24.9 * Math.pow(heightCm / 100, 2)
      const bmiPrime = bmi / 25
      const bodySurface = Math.sqrt((heightCm * weight) / 3600)

      return {
        ready: true,
        headline: `BMI ${formatNumber(bmi, 1)} - ${category}`,
        subheadline: 'This score uses the standard metric BMI formula.',
        primaryLabel: 'BMI score',
        primaryValue: formatNumber(bmi, 1),
        secondaryLabel: 'Category',
        secondaryValue: category,
        stats: [
          metric('Healthy low', `${formatNumber(healthyLow, 1)} kg`),
          metric('Healthy high', `${formatNumber(healthyHigh, 1)} kg`),
          metric('BMI prime', formatNumber(bmiPrime, 2)),
          metric('Surface area', `${formatNumber(bodySurface, 2)} m2`),
        ],
        insight: category === 'Healthy' ? 'Your BMI falls inside the usual healthy range.' : `A BMI in the ${category.toLowerCase()} range may need broader health context before any decision.`,
        summary: `BMI score ${formatNumber(bmi, 1)} in the ${category} range. Healthy weight range for this height is ${formatNumber(healthyLow, 1)} to ${formatNumber(healthyHigh, 1)} kg.`,
      }
    },
  },
  'emi-calculator': {
    eyebrow: 'Loan planning',
    title: 'EMI Calculator',
    summary: 'Estimate monthly EMI, total interest, and the repayment split before you commit to a loan.',
    badges: ['Monthly EMI', 'Interest share', 'Repayment snapshot'],
    tip: 'Try longer tenures only after comparing the extra interest you pay across the full loan.',
    fieldTitle: 'Loan inputs',
    fieldSummary: 'Adjust principal, rate, tenure, and down payment in one place.',
    fields: [
      { key: 'principal', label: 'Loan value', type: 'number', min: '10000', step: '1000', suffix: 'INR' },
      { key: 'downPayment', label: 'Down payment', type: 'number', min: '0', step: '1000', suffix: 'INR' },
      { key: 'annualRate', label: 'Interest rate', type: 'number', min: '0.1', step: '0.1', suffix: '% p.a.' },
      { key: 'tenureMonths', label: 'Tenure', type: 'number', min: '1', step: '1', suffix: 'months' },
    ],
    defaultValues: {
      principal: '1800000',
      downPayment: '300000',
      annualRate: '8.4',
      tenureMonths: '84',
    },
    presets: [
      { label: 'Car loan', hint: 'Shorter tenure', values: { principal: '950000', downPayment: '150000', annualRate: '9.1', tenureMonths: '60' } },
      { label: 'Home loan', hint: 'Longer repayment', values: { principal: '4500000', downPayment: '500000', annualRate: '8.1', tenureMonths: '240' } },
      { label: 'Personal loan', hint: 'Higher rate example', values: { principal: '600000', downPayment: '0', annualRate: '14.5', tenureMonths: '36' } },
    ],
    calculate(values) {
      const principal = parseNumber(values.principal)
      const downPayment = parseNumber(values.downPayment)
      const annualRate = parseNumber(values.annualRate)
      const tenureMonths = parseNumber(values.tenureMonths)
      const financedAmount = principal - downPayment

      if (financedAmount <= 0 || annualRate <= 0 || tenureMonths <= 0) {
        return {
          ready: false,
          headline: 'Enter valid loan values',
          subheadline: 'Loan amount, rate, and tenure are needed for EMI.',
          primaryLabel: 'Monthly EMI',
          primaryValue: '--',
          secondaryLabel: 'Total interest',
          secondaryValue: '--',
          stats: [metric('Financed amount', '--'), metric('Total payment', '--'), metric('Interest share', '--'), metric('EMI / lakh', '--')],
          insight: 'Add valid finance details to see the repayment split.',
          summary: '',
        }
      }

      const monthlyRate = annualRate / 12 / 100
      const emi = financedAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths) / (Math.pow(1 + monthlyRate, tenureMonths) - 1)
      const totalPayment = emi * tenureMonths
      const totalInterest = totalPayment - financedAmount
      const interestShare = (totalInterest / totalPayment) * 100

      return {
        ready: true,
        headline: `EMI ready for ${integerFormatter.format(tenureMonths)} months`,
        subheadline: `Based on a financed amount of ${formatCurrency(financedAmount)}.`,
        primaryLabel: 'Monthly EMI',
        primaryValue: formatCurrency(emi),
        secondaryLabel: 'Total interest',
        secondaryValue: formatCurrency(totalInterest),
        stats: [
          metric('Financed amount', formatCurrency(financedAmount)),
          metric('Total payment', formatCurrency(totalPayment)),
          metric('Interest share', formatPercent(interestShare, 1)),
          metric('EMI per lakh', formatCurrency((emi / financedAmount) * 100000)),
        ],
        insight: interestShare > 35 ? 'A large share of this loan goes toward interest. Compare a shorter tenure if possible.' : 'This repayment mix stays relatively balanced for the selected tenure.',
        summary: `Monthly EMI is ${formatCurrency(emi)}. Total repayment is ${formatCurrency(totalPayment)} including ${formatCurrency(totalInterest)} in interest.`,
      }
    },
  },
  'currency-converter': {
    eyebrow: 'Indicative FX rates',
    title: 'Currency Converter',
    summary: 'Convert between major currencies with quick rate view, reverse rate, and travel-friendly checks.',
    badges: ['Major currencies', 'Reverse rate', 'Quick compare'],
    tip: 'Rates here are indicative. Banks, cards, and remittance platforms may add their own spread.',
    fieldTitle: 'Conversion inputs',
    fieldSummary: 'Pick the source, target, and amount to convert.',
    fields: [
      { key: 'amount', label: 'Amount', type: 'number', min: '0', step: '0.01', span: 'full' },
      { key: 'fromCurrency', label: 'From', type: 'select', options: CURRENCY_OPTIONS },
      { key: 'toCurrency', label: 'To', type: 'select', options: CURRENCY_OPTIONS },
    ],
    defaultValues: {
      amount: '1000',
      fromCurrency: 'INR',
      toCurrency: 'USD',
    },
    presets: [
      { label: 'INR to USD', hint: 'Freelance payout check', values: { amount: '100000', fromCurrency: 'INR', toCurrency: 'USD' } },
      { label: 'USD to AED', hint: 'Travel budget', values: { amount: '1200', fromCurrency: 'USD', toCurrency: 'AED' } },
      { label: 'EUR to INR', hint: 'Invoice planning', values: { amount: '850', fromCurrency: 'EUR', toCurrency: 'INR' } },
    ],
    calculate(values) {
      const amount = parseNumber(values.amount)
      const fromCurrency = values.fromCurrency
      const toCurrency = values.toCurrency

      if (amount <= 0 || !CURRENCY_RATES[fromCurrency] || !CURRENCY_RATES[toCurrency]) {
        return {
          ready: false,
          headline: 'Set amount and currencies',
          subheadline: 'Choose valid source and target currencies.',
          primaryLabel: 'Converted amount',
          primaryValue: '--',
          secondaryLabel: 'Rate',
          secondaryValue: '--',
          stats: [metric('Source', '--'), metric('Target', '--'), metric('Reverse rate', '--'), metric('2% buffer', '--')],
          insight: 'Enter a valid amount to view the conversion.',
          summary: '',
        }
      }

      const usdValue = amount / CURRENCY_RATES[fromCurrency]
      const converted = usdValue * CURRENCY_RATES[toCurrency]
      const rate = CURRENCY_RATES[toCurrency] / CURRENCY_RATES[fromCurrency]
      const reverseRate = 1 / rate

      return {
        ready: true,
        headline: `${formatCurrency(amount, fromCurrency)} to ${toCurrency}`,
        subheadline: 'Indicative spot-style conversion using the selected pair.',
        primaryLabel: 'Converted amount',
        primaryValue: formatCurrency(converted, toCurrency),
        secondaryLabel: 'Pair rate',
        secondaryValue: `1 ${fromCurrency} = ${formatNumber(rate, 4)} ${toCurrency}`,
        stats: [
          metric('Source', formatCurrency(amount, fromCurrency)),
          metric('Target', formatCurrency(converted, toCurrency)),
          metric('Reverse rate', `1 ${toCurrency} = ${formatNumber(reverseRate, 4)} ${fromCurrency}`),
          metric('2% buffer', formatCurrency(converted * 0.98, toCurrency)),
        ],
        insight: fromCurrency === toCurrency ? 'Source and target currencies are the same, so no conversion change is needed.' : 'Keep a 1% to 3% spread in mind if you are comparing card or remittance rates.',
        summary: `${formatCurrency(amount, fromCurrency)} converts to ${formatCurrency(converted, toCurrency)} at an indicative rate of ${formatNumber(rate, 4)}.`,
      }
    },
  },
  'unit-converter': {
    eyebrow: 'Measurement workspace',
    title: 'Unit Converter',
    summary: 'Convert length, weight, area, and temperature from one clean panel with flexible presets.',
    badges: ['Multi-unit', 'Live conversion', 'Everyday reference'],
    tip: 'Switch the measurement group first to load the most relevant source and target units.',
    fieldTitle: 'Measurement inputs',
    fieldSummary: 'Pick the measurement group, value, and target unit.',
    fields: [
      {
        key: 'unitCategory',
        label: 'Measurement group',
        type: 'select',
        options: [
          { label: 'Length', value: 'length' },
          { label: 'Weight', value: 'weight' },
          { label: 'Area', value: 'area' },
          { label: 'Temperature', value: 'temperature' },
        ],
        span: 'full',
      },
      { key: 'value', label: 'Value', type: 'number', min: '0', step: '0.01', span: 'full' },
      { key: 'fromUnit', label: 'From unit', type: 'select' },
      { key: 'toUnit', label: 'To unit', type: 'select' },
    ],
    defaultValues: {
      unitCategory: 'length',
      value: '25',
      fromUnit: 'm',
      toUnit: 'ft',
    },
    presets: [
      { label: 'Height check', hint: 'Meters to feet', values: { unitCategory: 'length', value: '1.78', fromUnit: 'm', toUnit: 'ft' } },
      { label: 'Travel temp', hint: 'Celsius to Fahrenheit', values: { unitCategory: 'temperature', value: '30', fromUnit: 'C', toUnit: 'F' } },
      { label: 'Shipping weight', hint: 'Kg to lb', values: { unitCategory: 'weight', value: '12', fromUnit: 'kg', toUnit: 'lb' } },
    ],
    calculate(values) {
      const group = (values.unitCategory || 'length') as keyof typeof UNIT_GROUPS
      const amount = parseNumber(values.value)
      const fromUnit = values.fromUnit
      const toUnit = values.toUnit
      if (!fromUnit || !toUnit || amount <= 0) {
        return {
          ready: false,
          headline: 'Choose units and add a value',
          subheadline: 'A source, target, and numeric value are required.',
          primaryLabel: 'Converted value',
          primaryValue: '--',
          secondaryLabel: 'Reference',
          secondaryValue: '--',
          stats: [metric('Measurement group', '--'), metric('Source', '--'), metric('Target', '--'), metric('Reference', '--')],
          insight: 'Once the units are selected, the converted value appears instantly.',
          summary: '',
        }
      }

      const converted = convertUnit(amount, group, fromUnit, toUnit)
      const reverse = convertUnit(1, group, fromUnit, toUnit)

      return {
        ready: true,
        headline: `${UNIT_GROUPS[group].label} conversion ready`,
        subheadline: `Converted ${formatNumber(amount, 2)} ${fromUnit} into ${toUnit}.`,
        primaryLabel: 'Converted value',
        primaryValue: `${formatNumber(converted, 4)} ${toUnit}`,
        secondaryLabel: 'Pair rate',
        secondaryValue: `1 ${fromUnit} = ${formatNumber(reverse, 4)} ${toUnit}`,
        stats: [
          metric('Measurement group', UNIT_GROUPS[group].label),
          metric('Source', `${formatNumber(amount, 2)} ${fromUnit}`),
          metric('Target', `${formatNumber(converted, 4)} ${toUnit}`),
          metric('Reference', `${formatNumber(convertUnit(amount, group, fromUnit, UNIT_GROUPS[group].from), 4)} ${UNIT_GROUPS[group].from}`),
        ],
        insight: group === 'temperature' ? 'Temperature conversions use exact scale formulas instead of flat ratios.' : 'Converted values are based on standard unit factors for quick practical use.',
        summary: `${formatNumber(amount, 2)} ${fromUnit} equals ${formatNumber(converted, 4)} ${toUnit}.`,
      }
    },
  },
  'percentage-calculator': {
    eyebrow: 'Percent planning',
    title: 'Percentage Calculator',
    summary: 'Handle shares, increases, discounts, and quick percent checks in one compact calculation flow.',
    badges: ['Share of total', 'Increase or discount', 'Quick math'],
    tip: 'Keep the total in the second field and use the adjustment percent for increase and discount scenarios.',
    fieldTitle: 'Percentage inputs',
    fieldSummary: 'Use the same numbers to view ratio and change scenarios.',
    fields: [
      { key: 'value', label: 'Value', type: 'number', min: '0', step: '0.01' },
      { key: 'total', label: 'Total', type: 'number', min: '0', step: '0.01' },
      { key: 'changePercent', label: 'Adjustment', type: 'number', min: '0', step: '0.01', suffix: '%' },
    ],
    defaultValues: {
      value: '420',
      total: '1200',
      changePercent: '15',
    },
    presets: [
      { label: 'Exam score', hint: 'Marks percentage', values: { value: '76', total: '100', changePercent: '5' } },
      { label: 'Sales discount', hint: 'Offer preview', values: { value: '0', total: '2499', changePercent: '18' } },
      { label: 'Growth check', hint: 'Budget increase', values: { value: '420', total: '1200', changePercent: '15' } },
    ],
    calculate(values) {
      const value = parseNumber(values.value)
      const total = parseNumber(values.total)
      const changePercent = parseNumber(values.changePercent)
      if (total <= 0) {
        return {
          ready: false,
          headline: 'Enter a valid total',
          subheadline: 'The total should be greater than zero.',
          primaryLabel: 'Share of total',
          primaryValue: '--',
          secondaryLabel: 'Change amount',
          secondaryValue: '--',
          stats: [metric('Percent of total', '--'), metric('Increase result', '--'), metric('Discount result', '--'), metric('Remaining', '--')],
          insight: 'Add your total and optional value to unlock percentage math.',
          summary: '',
        }
      }

      const share = (value / total) * 100
      const changeAmount = (total * changePercent) / 100
      const increased = total + changeAmount
      const discounted = total - changeAmount

      return {
        ready: true,
        headline: `${formatPercent(share, 2)} of total`,
        subheadline: `This compares ${formatNumber(value, 2)} against ${formatNumber(total, 2)}.`,
        primaryLabel: 'Share of total',
        primaryValue: formatPercent(share, 2),
        secondaryLabel: 'Change amount',
        secondaryValue: formatNumber(changeAmount, 2),
        stats: [
          metric('Percent of total', formatPercent(share, 2)),
          metric('Increase result', formatNumber(increased, 2)),
          metric('Discount result', formatNumber(discounted, 2)),
          metric('Remaining', formatNumber(Math.max(total - value, 0), 2)),
        ],
        insight: `A ${formatNumber(changePercent, 2)}% adjustment on the total changes it by ${formatNumber(changeAmount, 2)}.`,
        summary: `${formatNumber(value, 2)} is ${formatPercent(share, 2)} of ${formatNumber(total, 2)}. A ${formatNumber(changePercent, 2)}% adjustment equals ${formatNumber(changeAmount, 2)}.`,
      }
    },
  },
  'compound-interest-calculator': {
    eyebrow: 'Growth modeling',
    title: 'Compound Interest',
    summary: 'Model long-term growth with compounding, recurring contributions, and final wealth projection.',
    badges: ['Future value', 'Recurring savings', 'Growth view'],
    tip: 'Monthly contributions can change the outcome more than chasing small rate improvements over time.',
    fieldTitle: 'Investment inputs',
    fieldSummary: 'Set the initial capital, annual return, timeline, and monthly contribution.',
    fields: [
      { key: 'principal', label: 'Initial investment', type: 'number', min: '0', step: '1000', suffix: 'INR' },
      { key: 'annualRate', label: 'Expected return', type: 'number', min: '0', step: '0.1', suffix: '% p.a.' },
      { key: 'years', label: 'Years', type: 'number', min: '1', step: '1' },
      { key: 'compoundsPerYear', label: 'Compounds per year', type: 'number', min: '1', step: '1' },
      { key: 'monthlyContribution', label: 'Monthly contribution', type: 'number', min: '0', step: '500', suffix: 'INR', span: 'full' },
    ],
    defaultValues: {
      principal: '250000',
      annualRate: '11',
      years: '10',
      compoundsPerYear: '12',
      monthlyContribution: '15000',
    },
    presets: [
      { label: 'Starter SIP', hint: 'Long runway', values: { principal: '50000', annualRate: '10', years: '15', monthlyContribution: '5000', compoundsPerYear: '12' } },
      { label: 'Aggressive build', hint: 'Higher monthly input', values: { principal: '250000', annualRate: '12', years: '12', monthlyContribution: '25000', compoundsPerYear: '12' } },
      { label: 'Conservative plan', hint: 'Lower expected return', values: { principal: '400000', annualRate: '8', years: '8', monthlyContribution: '10000', compoundsPerYear: '4' } },
    ],
    calculate(values) {
      const principal = parseNumber(values.principal)
      const annualRate = parseNumber(values.annualRate)
      const years = parseNumber(values.years)
      const compoundsPerYear = parseNumber(values.compoundsPerYear)
      const monthlyContribution = parseNumber(values.monthlyContribution)

      if (principal < 0 || annualRate < 0 || years <= 0 || compoundsPerYear <= 0) {
        return {
          ready: false,
          headline: 'Enter valid growth inputs',
          subheadline: 'Years and compounding frequency should be above zero.',
          primaryLabel: 'Future value',
          primaryValue: '--',
          secondaryLabel: 'Net gain',
          secondaryValue: '--',
          stats: [metric('Invested capital', '--'), metric('Contribution total', '--'), metric('Projected gain', '--'), metric('Effective monthly target', '--')],
          insight: 'Add investment values to project the future corpus.',
          summary: '',
        }
      }

      const principalGrowth = principal * Math.pow(1 + annualRate / 100 / compoundsPerYear, compoundsPerYear * years)
      const monthlyRate = annualRate / 12 / 100
      const months = years * 12
      const contributionGrowth = monthlyContribution > 0 && monthlyRate > 0
        ? monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
        : monthlyContribution * months
      const futureValue = principalGrowth + contributionGrowth
      const invested = principal + monthlyContribution * months
      const gain = futureValue - invested

      return {
        ready: true,
        headline: `Projected corpus in ${years} years`,
        subheadline: 'Includes compound growth on both the base amount and recurring contribution.',
        primaryLabel: 'Future value',
        primaryValue: formatCurrency(futureValue),
        secondaryLabel: 'Net gain',
        secondaryValue: formatCurrency(gain),
        stats: [
          metric('Invested capital', formatCurrency(principal)),
          metric('Contribution total', formatCurrency(monthlyContribution * months)),
          metric('Projected gain', formatCurrency(gain)),
          metric('Invested vs final', `${formatPercent((futureValue / Math.max(invested, 1)) * 100 - 100, 1)} uplift`),
        ],
        insight: monthlyContribution > 0 ? 'Recurring monthly additions are doing a large share of the lifting in this projection.' : 'This scenario depends entirely on compounding the initial capital.',
        summary: `The projected corpus is ${formatCurrency(futureValue)} after ${years} years, with ${formatCurrency(gain)} earned over the invested amount.`,
      }
    },
  },
  'gst-calculator': {
    eyebrow: 'Tax breakdown',
    title: 'GST Calculator',
    summary: 'Add GST to a base amount or extract GST from an inclusive price with a clean tax split.',
    badges: ['Inclusive or exclusive', 'CGST and SGST split', 'Quick invoice math'],
    tip: 'Use inclusive mode when the amount already includes tax and you need the taxable base value.',
    fieldTitle: 'Tax inputs',
    fieldSummary: 'Set the amount, GST rate, and whether the value already includes tax.',
    fields: [
      { key: 'amount', label: 'Amount', type: 'number', min: '0', step: '0.01', suffix: 'INR' },
      { key: 'gstRate', label: 'GST rate', type: 'number', min: '0', step: '0.1', suffix: '%' },
      {
        key: 'mode',
        label: 'Calculation mode',
        type: 'select',
        options: [
          { label: 'Add GST to base amount', value: 'exclusive' },
          { label: 'Extract GST from final amount', value: 'inclusive' },
        ],
        span: 'full',
      },
    ],
    defaultValues: {
      amount: '12500',
      gstRate: '18',
      mode: 'exclusive',
    },
    presets: [
      { label: '5% goods', hint: 'Lower slab', values: { amount: '4200', gstRate: '5', mode: 'exclusive' } },
      { label: '18% invoice', hint: 'Common service slab', values: { amount: '12500', gstRate: '18', mode: 'exclusive' } },
      { label: 'Inclusive retail', hint: 'Tax already inside', values: { amount: '999', gstRate: '18', mode: 'inclusive' } },
    ],
    calculate(values) {
      const amount = parseNumber(values.amount)
      const gstRate = parseNumber(values.gstRate)
      const mode = values.mode || 'exclusive'
      if (amount <= 0 || gstRate < 0) {
        return {
          ready: false,
          headline: 'Enter amount and GST rate',
          subheadline: 'Use positive values to calculate the tax split.',
          primaryLabel: 'GST amount',
          primaryValue: '--',
          secondaryLabel: 'Final total',
          secondaryValue: '--',
          stats: [metric('Taxable value', '--'), metric('CGST', '--'), metric('SGST', '--'), metric('Rate', '--')],
          insight: 'Switch between exclusive and inclusive modes based on the invoice format.',
          summary: '',
        }
      }

      const exclusiveBase = mode === 'exclusive' ? amount : amount / (1 + gstRate / 100)
      const gstAmount = mode === 'exclusive' ? (amount * gstRate) / 100 : amount - exclusiveBase
      const finalTotal = mode === 'exclusive' ? amount + gstAmount : amount

      return {
        ready: true,
        headline: `${formatPercent(gstRate, 1)} GST ${mode === 'exclusive' ? 'added' : 'extracted'}`,
        subheadline: mode === 'exclusive' ? 'Tax added on top of the base amount.' : 'Tax separated from the final inclusive amount.',
        primaryLabel: 'GST amount',
        primaryValue: formatCurrency(gstAmount),
        secondaryLabel: 'Final total',
        secondaryValue: formatCurrency(finalTotal),
        stats: [
          metric('Taxable value', formatCurrency(exclusiveBase)),
          metric('CGST', formatCurrency(gstAmount / 2)),
          metric('SGST', formatCurrency(gstAmount / 2)),
          metric('Rate', formatPercent(gstRate, 1)),
        ],
        insight: mode === 'inclusive' ? 'Inclusive mode is useful when a seller shares only the final billed amount.' : 'Exclusive mode gives you the invoice-ready total after tax.',
        summary: `GST amount is ${formatCurrency(gstAmount)} on a taxable base of ${formatCurrency(exclusiveBase)}. Final total is ${formatCurrency(finalTotal)}.`,
      }
    },
  },
  'tip-calculator': {
    eyebrow: 'Dining split',
    title: 'Tip Calculator',
    summary: 'Calculate tip amount, shared bill totals, and per-person payout without messy mental math.',
    badges: ['Tip amount', 'Per-person split', 'Quick dining math'],
    tip: 'Use the people field for exact split planning before sending money or collecting the bill.',
    fieldTitle: 'Bill details',
    fieldSummary: 'Add the bill, tip rate, and the number of people sharing it.',
    fields: [
      { key: 'billAmount', label: 'Bill amount', type: 'number', min: '0', step: '0.01', suffix: 'INR' },
      { key: 'tipPercent', label: 'Tip rate', type: 'number', min: '0', step: '0.1', suffix: '%' },
      { key: 'people', label: 'People splitting', type: 'number', min: '1', step: '1' },
    ],
    defaultValues: {
      billAmount: '3250',
      tipPercent: '12.5',
      people: '4',
    },
    presets: [
      { label: 'Cafe split', hint: 'Small group', values: { billAmount: '850', tipPercent: '10', people: '2' } },
      { label: 'Dinner table', hint: 'Family split', values: { billAmount: '3250', tipPercent: '12.5', people: '4' } },
      { label: 'Large group', hint: 'Party bill', values: { billAmount: '7800', tipPercent: '15', people: '8' } },
    ],
    calculate(values) {
      const billAmount = parseNumber(values.billAmount)
      const tipPercent = parseNumber(values.tipPercent)
      const people = Math.max(1, parseNumber(values.people))
      if (billAmount <= 0) {
        return {
          ready: false,
          headline: 'Enter a bill amount',
          subheadline: 'The bill value is required to split the total.',
          primaryLabel: 'Tip amount',
          primaryValue: '--',
          secondaryLabel: 'Per person',
          secondaryValue: '--',
          stats: [metric('Bill total', '--'), metric('Tip rate', '--'), metric('Grand total', '--'), metric('Tip per person', '--')],
          insight: 'Add the bill amount and the split becomes ready.',
          summary: '',
        }
      }

      const tipAmount = (billAmount * tipPercent) / 100
      const grandTotal = billAmount + tipAmount
      const perPerson = grandTotal / people

      return {
        ready: true,
        headline: `${people} way split ready`,
        subheadline: `Tip added at ${formatPercent(tipPercent, 1)}.`,
        primaryLabel: 'Tip amount',
        primaryValue: formatCurrency(tipAmount),
        secondaryLabel: 'Per person',
        secondaryValue: formatCurrency(perPerson),
        stats: [
          metric('Bill total', formatCurrency(billAmount)),
          metric('Tip rate', formatPercent(tipPercent, 1)),
          metric('Grand total', formatCurrency(grandTotal)),
          metric('Tip per person', formatCurrency(tipAmount / people)),
        ],
        insight: people > 1 ? `Each person owes about ${formatCurrency(perPerson)} including tip.` : 'Single-person mode shows the full tipped total.',
        summary: `Tip amount is ${formatCurrency(tipAmount)} and the grand total is ${formatCurrency(grandTotal)}. Split across ${people}, each person pays ${formatCurrency(perPerson)}.`,
      }
    },
  },
  'date-difference-calculator': {
    eyebrow: 'Timeline math',
    title: 'Date Difference',
    summary: 'Measure exact day spans, weekday counts, and planning windows between two dates.',
    badges: ['Day count', 'Weekday count', 'Project planning'],
    tip: 'Turn on inclusive range when you need both the start and end dates counted inside the final span.',
    fieldTitle: 'Date range',
    fieldSummary: 'Set the start date, end date, and range behavior.',
    fields: [
      { key: 'startDate', label: 'Start date', type: 'date' },
      { key: 'endDate', label: 'End date', type: 'date' },
      {
        key: 'inclusive',
        label: 'Count both dates',
        type: 'select',
        options: [
          { label: 'No', value: 'no' },
          { label: 'Yes', value: 'yes' },
        ],
        span: 'full',
      },
    ],
    defaultValues: {
      startDate: '2026-01-01',
      endDate: '2026-03-25',
      inclusive: 'yes',
    },
    presets: [
      { label: 'Quarter sprint', hint: 'Project window', values: { startDate: '2026-01-01', endDate: '2026-03-31', inclusive: 'yes' } },
      { label: 'Short event', hint: 'Campaign burst', values: { startDate: '2026-04-01', endDate: '2026-04-10', inclusive: 'no' } },
      { label: 'Annual span', hint: 'Year check', values: { startDate: '2026-01-01', endDate: '2026-12-31', inclusive: 'yes' } },
    ],
    calculate(values) {
      const startDate = new Date(values.startDate)
      const endDate = new Date(values.endDate)
      const inclusive = values.inclusive === 'yes'
      if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime()) || endDate < startDate) {
        return {
          ready: false,
          headline: 'Choose a valid date range',
          subheadline: 'The end date should not be before the start date.',
          primaryLabel: 'Total days',
          primaryValue: '--',
          secondaryLabel: 'Weekdays',
          secondaryValue: '--',
          stats: [metric('Weeks', '--'), metric('Months', '--'), metric('Weekdays', '--'), metric('Weekends', '--')],
          insight: 'Set both dates to calculate the span.',
          summary: '',
        }
      }

      const rawDays = daysBetween(startDate, endDate)
      const totalDays = inclusive ? rawDays + 1 : rawDays
      const weekdayEnd = inclusive ? endDate : new Date(endDate.getTime() - 86400000)
      const weekdayCount = totalDays > 0 ? countWeekdays(startDate, weekdayEnd) : 0
      const weekends = totalDays - weekdayCount

      return {
        ready: true,
        headline: `${integerFormatter.format(totalDays)} day range`,
        subheadline: inclusive ? 'Inclusive range count is enabled.' : 'Exclusive end-date difference is shown.',
        primaryLabel: 'Total days',
        primaryValue: integerFormatter.format(totalDays),
        secondaryLabel: 'Weekdays',
        secondaryValue: integerFormatter.format(weekdayCount),
        stats: [
          metric('Weeks', formatNumber(totalDays / 7, 1)),
          metric('Months', formatNumber(totalDays / 30.44, 1)),
          metric('Weekdays', integerFormatter.format(weekdayCount)),
          metric('Weekends', integerFormatter.format(Math.max(weekends, 0))),
        ],
        insight: weekdayCount > 0 ? `This range includes about ${weekdayCount} business-day style working days.` : 'This is a very short date range with no practical weekday span.',
        summary: `The date range covers ${totalDays} days and about ${weekdayCount} weekdays.`,
      }
    },
  },
  'timezone-converter': {
    eyebrow: 'Global scheduling',
    title: 'Timezone Converter',
    summary: 'Convert meetings, launches, and deadlines across major time zones with a clear source and target view.',
    badges: ['Meeting ready', 'Global teams', 'Offset view'],
    tip: 'Pick the source timezone that matches the original meeting invite before checking the target region.',
    fieldTitle: 'Schedule inputs',
    fieldSummary: 'Use one local datetime and two timezones to compare the translated schedule.',
    fields: [
      { key: 'dateTime', label: 'Local date and time', type: 'datetime-local', span: 'full' },
      { key: 'fromZone', label: 'From timezone', type: 'select', options: TIMEZONE_OPTIONS },
      { key: 'toZone', label: 'To timezone', type: 'select', options: TIMEZONE_OPTIONS },
    ],
    defaultValues: {
      dateTime: '2026-03-25T18:30',
      fromZone: 'Asia/Kolkata',
      toZone: 'America/New_York',
    },
    presets: [
      { label: 'India to New York', hint: 'Client meeting', values: { dateTime: '2026-03-25T18:30', fromZone: 'Asia/Kolkata', toZone: 'America/New_York' } },
      { label: 'London to Dubai', hint: 'Operations sync', values: { dateTime: '2026-06-01T09:00', fromZone: 'Europe/London', toZone: 'Asia/Dubai' } },
      { label: 'Tokyo to Sydney', hint: 'Regional handoff', values: { dateTime: '2026-07-14T16:00', fromZone: 'Asia/Tokyo', toZone: 'Australia/Sydney' } },
    ],
    calculate(values) {
      if (!values.dateTime || !values.fromZone || !values.toZone) {
        return {
          ready: false,
          headline: 'Set the schedule and timezones',
          subheadline: 'The converter needs one datetime and both timezone values.',
          primaryLabel: 'Converted time',
          primaryValue: '--',
          secondaryLabel: 'Offset gap',
          secondaryValue: '--',
          stats: [metric('Source view', '--'), metric('Target view', '--'), metric('UTC view', '--'), metric('Offset gap', '--')],
          insight: 'Choose the source and target timezones to translate the schedule.',
          summary: '',
        }
      }

      const utcDate = zonedDateTimeToUtc(values.dateTime, values.fromZone)
      if (Number.isNaN(utcDate.getTime())) {
        return {
          ready: false,
          headline: 'Enter a valid datetime',
          subheadline: 'The selected datetime could not be interpreted.',
          primaryLabel: 'Converted time',
          primaryValue: '--',
          secondaryLabel: 'Offset gap',
          secondaryValue: '--',
          stats: [metric('Source view', '--'), metric('Target view', '--'), metric('UTC view', '--'), metric('Offset gap', '--')],
          insight: 'Use a valid datetime value to continue.',
          summary: '',
        }
      }

      const sourceOffset = getTimeZoneOffsetMinutes(utcDate, values.fromZone)
      const targetOffset = getTimeZoneOffsetMinutes(utcDate, values.toZone)
      const offsetGap = (targetOffset - sourceOffset) / 60

      return {
        ready: true,
        headline: 'Time conversion ready',
        subheadline: `Source ${values.fromZone} converted into ${values.toZone}.`,
        primaryLabel: 'Converted time',
        primaryValue: formatInTimeZone(utcDate, values.toZone),
        secondaryLabel: 'Offset gap',
        secondaryValue: `${formatNumber(offsetGap, 1)} hours`,
        stats: [
          metric('Source view', formatInTimeZone(utcDate, values.fromZone)),
          metric('Target view', formatInTimeZone(utcDate, values.toZone)),
          metric('UTC view', formatInTimeZone(utcDate, 'UTC')),
          metric('Offset gap', `${formatNumber(offsetGap, 1)} hours`),
        ],
        insight: values.fromZone === values.toZone ? 'The source and target zones are the same, so the time stays unchanged.' : 'Double-check daylight saving windows for regions that change offsets seasonally.',
        summary: `${formatInTimeZone(utcDate, values.fromZone)} in ${values.fromZone} becomes ${formatInTimeZone(utcDate, values.toZone)} in ${values.toZone}.`,
      }
    },
  },
  'calorie-calculator': {
    eyebrow: 'Nutrition target',
    title: 'Calorie Calculator',
    summary: 'Estimate maintenance calories, body-weight based protein target, and goal calories from one fitness panel.',
    badges: ['BMR estimate', 'Target calories', 'Macro hints'],
    tip: 'Treat this as a planning baseline. Track weight changes for two to three weeks before locking a new target.',
    fieldTitle: 'Body and activity',
    fieldSummary: 'Use your profile, activity, and goal to build a calorie target.',
    fields: [
      { key: 'sex', label: 'Sex', type: 'select', options: SEX_OPTIONS },
      { key: 'age', label: 'Age', type: 'number', min: '12', step: '1' },
      { key: 'weightKg', label: 'Weight', type: 'number', min: '25', step: '0.1', suffix: 'kg' },
      { key: 'heightCm', label: 'Height', type: 'number', min: '120', step: '0.1', suffix: 'cm' },
      { key: 'activity', label: 'Activity', type: 'select', options: ACTIVITY_OPTIONS },
      { key: 'goal', label: 'Goal', type: 'select', options: GOAL_OPTIONS },
    ],
    defaultValues: {
      sex: 'male',
      age: '29',
      weightKg: '74',
      heightCm: '176',
      activity: 'moderate',
      goal: 'maintain',
    },
    presets: [
      { label: 'Office routine', hint: 'Maintain weight', values: { sex: 'male', age: '29', weightKg: '74', heightCm: '176', activity: 'moderate', goal: 'maintain' } },
      { label: 'Fat loss phase', hint: 'Cut calories', values: { sex: 'female', age: '31', weightKg: '68', heightCm: '165', activity: 'light', goal: 'cut' } },
      { label: 'Lean bulk', hint: 'Surplus target', values: { sex: 'male', age: '26', weightKg: '70', heightCm: '178', activity: 'active', goal: 'bulk' } },
    ],
    calculate(values) {
      const sex = values.sex || 'male'
      const age = parseNumber(values.age)
      const weightKg = parseNumber(values.weightKg)
      const heightCm = parseNumber(values.heightCm)
      const activity = values.activity || 'moderate'
      const goal = values.goal || 'maintain'

      if (age <= 0 || weightKg <= 0 || heightCm <= 0) {
        return {
          ready: false,
          headline: 'Enter body and activity details',
          subheadline: 'Age, weight, and height are required for a calorie estimate.',
          primaryLabel: 'Target calories',
          primaryValue: '--',
          secondaryLabel: 'Maintenance',
          secondaryValue: '--',
          stats: [metric('BMR', '--'), metric('Protein', '--'), metric('Water', '--'), metric('Goal mode', '--')],
          insight: 'Add your profile to generate a starting calorie target.',
          summary: '',
        }
      }

      const bmr = sex === 'female'
        ? 10 * weightKg + 6.25 * heightCm - 5 * age - 161
        : 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      const activityFactor = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        athlete: 1.9,
      }[activity] || 1.55
      const maintenance = bmr * activityFactor
      const target = goal === 'cut' ? maintenance - 400 : goal === 'bulk' ? maintenance + 300 : maintenance
      const protein = weightKg * (goal === 'bulk' ? 2 : 1.8)
      const water = weightKg * 0.035

      return {
        ready: true,
        headline: `${goal === 'cut' ? 'Cut' : goal === 'bulk' ? 'Bulk' : 'Maintain'} target ready`,
        subheadline: 'This uses the Mifflin-St Jeor BMR formula with an activity multiplier.',
        primaryLabel: 'Target calories',
        primaryValue: `${integerFormatter.format(Math.round(target))} kcal`,
        secondaryLabel: 'Maintenance',
        secondaryValue: `${integerFormatter.format(Math.round(maintenance))} kcal`,
        stats: [
          metric('BMR', `${integerFormatter.format(Math.round(bmr))} kcal`),
          metric('Protein', `${formatNumber(protein, 0)} g`),
          metric('Water', `${formatNumber(water, 1)} L`),
          metric('Goal mode', goal),
        ],
        insight: goal === 'maintain' ? 'Use this as a baseline and adjust only after tracking real weight trends.' : `A ${goal} target is best validated with weekly progress checks rather than daily scale swings.`,
        summary: `Maintenance calories are about ${Math.round(maintenance)} kcal per day, with a ${goal} target of about ${Math.round(target)} kcal.`,
      }
    },
  },
}

function fieldValueLabel(toolSlug: CalculatorStudioSlug, key: string, value: string) {
  if (!value) return '--'

  if (toolSlug === 'currency-converter' && (key === 'fromCurrency' || key === 'toCurrency')) {
    return CURRENCY_OPTIONS.find(option => option.value === value)?.label || value
  }

  if (toolSlug === 'unit-converter' && key === 'unitCategory') {
    return UNIT_GROUPS[value as keyof typeof UNIT_GROUPS]?.label || value
  }

  if (toolSlug === 'timezone-converter' && (key === 'fromZone' || key === 'toZone')) {
    return TIMEZONE_OPTIONS.find(option => option.value === value)?.label || value
  }

  return value
}

async function copySummary(text: string) {
  if (!text) return
  await navigator.clipboard.writeText(text)
}

export default function CalculatorStudio({ tool }: { tool: Tool }) {
  const definition = CALCULATOR_DEFINITIONS[tool.slug as CalculatorStudioSlug]
  const [values, setValues] = useState<Record<string, string>>({ ...definition.defaultValues })
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setValues({ ...definition.defaultValues })
    setCopied(false)
  }, [definition, tool.slug])

  const result = useMemo(() => definition.calculate(values), [definition, values])
  const progress = result.ready ? 100 : 24

  function updateValue(key: string, value: string) {
    setValues(current => {
      if (tool.slug === 'unit-converter' && key === 'unitCategory') {
        const group = UNIT_GROUPS[value as keyof typeof UNIT_GROUPS]
        return {
          ...current,
          unitCategory: value,
          fromUnit: group.from,
          toUnit: group.to,
        }
      }

      if (tool.slug === 'currency-converter' && key === 'fromCurrency' && current.toCurrency === value) {
        return {
          ...current,
          fromCurrency: value,
          toCurrency: current.fromCurrency,
        }
      }

      if (tool.slug === 'currency-converter' && key === 'toCurrency' && current.fromCurrency === value) {
        return {
          ...current,
          toCurrency: value,
          fromCurrency: current.toCurrency,
        }
      }

      return {
        ...current,
        [key]: value,
      }
    })
  }

  function resetWorkspace() {
    setValues({ ...definition.defaultValues })
    setCopied(false)
  }

  async function handleCopy() {
    if (!result.summary) return
    await copySummary(result.summary)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  function fieldOptions(field: FieldConfig) {
    if (tool.slug === 'unit-converter' && (field.key === 'fromUnit' || field.key === 'toUnit')) {
      const group = (values.unitCategory || 'length') as keyof typeof UNIT_GROUPS
      return Object.keys(UNIT_GROUPS[group].units).map(unit => ({
        label: unit,
        value: unit,
      }))
    }

    return field.options || []
  }

  return (
    <div className="space-y-8" data-tool-shell="true">
      <header className="max-w-3xl">
        <div className="flex flex-wrap gap-2">
          {definition.badges.map(item => (
            <span key={item} className="premium-chip">
              {item}
            </span>
          ))}
        </div>
        <p className="mt-6 premium-kicker">{definition.eyebrow}</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl dark:text-slate-50">
          {definition.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
          {definition.summary}
        </p>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.14fr)_360px]">
        <div className="space-y-5">
          <section className="premium-panel p-5 sm:p-6">
            <div className="mb-5">
              <p className="premium-kicker">{definition.fieldTitle}</p>
              <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
                Configure the calculation
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                {definition.fieldSummary}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {definition.fields.map(field => {
                const options = fieldOptions(field)

                return (
                  <label
                    key={field.key}
                    className={cn('space-y-2', field.span === 'full' && 'sm:col-span-2')}
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {field.label}
                    </span>

                    {field.type === 'select' ? (
                      <select
                        value={values[field.key] || ''}
                        onChange={event => updateValue(field.key, event.target.value)}
                        className="w-full rounded-2xl bg-white px-4 py-3 text-sm text-slate-700 outline-none ring-1 ring-slate-200 transition focus:ring-2 focus:ring-indigo-300 dark:bg-slate-900/70 dark:text-slate-100 dark:ring-slate-800"
                      >
                        {options.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="relative">
                        <input
                          type={field.type}
                          value={values[field.key] || ''}
                          min={field.min}
                          max={field.max}
                          step={field.step}
                          placeholder={field.placeholder}
                          onChange={event => updateValue(field.key, event.target.value)}
                          className="w-full rounded-2xl bg-white px-4 py-3 text-sm text-slate-700 outline-none ring-1 ring-slate-200 transition focus:ring-2 focus:ring-indigo-300 dark:bg-slate-900/70 dark:text-slate-100 dark:ring-slate-800"
                        />
                        {field.suffix && (
                          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                            {field.suffix}
                          </span>
                        )}
                      </div>
                    )}

                    {field.helper && (
                      <p className="text-xs text-slate-500 dark:text-slate-400">{field.helper}</p>
                    )}
                  </label>
                )
              })}
            </div>

            <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-600 ring-1 ring-slate-200 dark:bg-slate-950/30 dark:text-slate-300 dark:ring-slate-800">
              {definition.tip}
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="premium-card p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="premium-kicker">Preset scenarios</p>
                  <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
                    Quick starting points
                  </h2>
                </div>
                <Sparkles className="h-5 w-5 text-indigo-500" />
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {definition.presets.map(preset => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setValues(current => ({ ...current, ...preset.values }))}
                    className="rounded-2xl bg-slate-50 px-4 py-4 text-left ring-1 ring-slate-200 transition hover:bg-slate-100 dark:bg-slate-950/30 dark:ring-slate-800 dark:hover:bg-slate-900"
                  >
                    <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">{preset.label}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{preset.hint}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="premium-card p-5">
              <p className="premium-kicker">Input snapshot</p>
              <div className="mt-4 space-y-4">
                {definition.fields.slice(0, 4).map(field => (
                  <div key={field.key}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {field.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-950 dark:text-slate-50">
                      {fieldValueLabel(tool.slug as CalculatorStudioSlug, field.key, values[field.key] || '')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-5">
          <section className="premium-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
                Live calculation
              </h2>
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">
                {progress}%
              </span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-[linear-gradient(135deg,#24389c,#465fd6)] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-5 flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-4 ring-1 ring-slate-200 dark:bg-slate-950/30 dark:ring-slate-800">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300">
                {result.ready ? <CheckCircle2 className="h-5 w-5" /> : <Gauge className="h-5 w-5" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">{result.headline}</p>
                <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">{result.subheadline}</p>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-[26px] bg-[radial-gradient(circle_at_top,#1f2560,#090c18_68%)] p-6 text-white shadow-[0_28px_80px_-32px_rgba(15,23,42,0.75)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
              <Wallet className="h-5 w-5" />
            </div>
            <h2 className="mt-6 font-display text-3xl font-extrabold tracking-tight">
              {result.primaryValue}
            </h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
              {result.primaryLabel}
            </p>
            <p className="mt-3 text-sm leading-6 text-white/70">
              {result.ready ? result.summary : 'Enter valid inputs to unlock the final calculation state.'}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/6 px-4 py-4 ring-1 ring-white/10">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">{result.secondaryLabel}</p>
                <p className="mt-2 text-sm font-semibold text-white">{result.secondaryValue}</p>
              </div>
              <div className="rounded-2xl bg-white/6 px-4 py-4 ring-1 ring-white/10">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">Status</p>
                <p className="mt-2 text-sm font-semibold text-white">{result.ready ? 'Ready to use' : 'Waiting for inputs'}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => void handleCopy()}
                disabled={!result.ready}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ClipboardCopy className="h-4 w-4" />
                {copied ? 'Copied' : 'Copy summary'}
              </button>
              <button
                type="button"
                onClick={resetWorkspace}
                className="inline-flex items-center gap-2 rounded-full bg-white/8 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/12"
              >
                <RefreshCw className="h-4 w-4" />
                Reset
              </button>
            </div>
          </section>

          <section className="premium-card p-5">
            <p className="premium-kicker">Smart note</p>
            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-3">
                <TrendingUp className="mt-0.5 h-4 w-4 text-slate-400" />
                <div>
                  <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">{result.insight}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Use this output as a planning reference, then adjust with your real-world context.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="premium-card overflow-hidden">
          <div className="border-b border-slate-200/70 px-5 py-4 dark:border-slate-800/70">
            <p className="premium-kicker">Comparison stats</p>
            <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
              Result breakdown
            </h2>
          </div>
          <div className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-4">
            {result.stats.map(item => (
              <div
                key={item.label}
                className="rounded-[22px] bg-slate-50 px-4 py-4 ring-1 ring-slate-200 dark:bg-slate-950/30 dark:ring-slate-800"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-950 dark:text-slate-50">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="premium-card p-5">
          <p className="premium-kicker">Workflow note</p>
          <h2 className="mt-2 font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
            Keep it clear
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-3">
              <CalendarDays className="mt-1 h-4 w-4 text-slate-400" />
              <span>Set the core values or dates first.</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowLeftRight className="mt-1 h-4 w-4 text-slate-400" />
              <span>Use presets when you want quick scenario checks.</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock3 className="mt-1 h-4 w-4 text-slate-400" />
              <span>Copy the summary once the result looks right.</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
