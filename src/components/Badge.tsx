import React from 'react'

interface BadgeProps {
  variant: 'main' | 'secondary' | 'bonus'
  children: React.ReactNode
}

export function Badge({ variant, children }: BadgeProps) {
  const variants = {
    main: 'bg-red-100 text-red-800 border-red-200',
    secondary: 'bg-blue-100 text-blue-800 border-blue-200',
    bonus: 'bg-green-100 text-green-800 border-green-200'
  }

  return (
    <span className={`
      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
      border ${variants[variant]} transition-colors duration-200
    `}>
      {children}
    </span>
  )
}