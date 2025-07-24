import { cn } from '@/lib/utils'
import React from 'react'

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-10 w-10 border-4',
}

export function Loader({ size = 'md', className, ...props }: LoaderProps) {
  return (
    <div
      className={cn(
        'inline-block animate-spin rounded-full border-primary border-t-transparent border-solid',
        sizeMap[size],
        className
      )}
      role='status'
      {...props}
    />
  )
}
