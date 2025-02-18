import { useState } from 'react'

export function Slider({ min = 0, max = 100, step = 1, value, onValueChange, className }) {
  const percentage = ((value[0] - min) / (max - min)) * 100

  return (
    <div className={`relative flex w-full touch-none select-none items-center ${className}`}>
      <div className="relative w-full h-2 rounded-full bg-secondary">
        <div
          className="absolute h-full bg-primary rounded-full"
          style={{ width: `${percentage}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={(e) => onValueChange([Number(e.target.value)])}
          className="absolute w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  )
}