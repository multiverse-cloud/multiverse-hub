'use client'

import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  endTime: Date
}

interface TimeBlockProps {
  value: number
  label: string
}

function TimeBlock({ value, label }: TimeBlockProps) {
  return (
    <div className="text-center">
      <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-3">
        <span className="text-2xl lg:text-3xl font-bold">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <p className="text-xs text-white/70 mt-1">{label}</p>
    </div>
  )
}

export function CountdownTimer({ endTime }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const end = endTime.getTime()
      const difference = end - now

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  return (
    <div className="flex items-center gap-3">
      <TimeBlock value={timeLeft.hours} label="Hours" />
      <span className="text-2xl font-bold">:</span>
      <TimeBlock value={timeLeft.minutes} label="Minutes" />
      <span className="text-2xl font-bold">:</span>
      <TimeBlock value={timeLeft.seconds} label="Seconds" />
    </div>
  )
}
