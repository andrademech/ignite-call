import { cn } from '@/lib/utils'

interface IFormAnnotationProps {
  className?: string
  children: React.ReactNode
}

export function FormAnnotation({ className, children }: IFormAnnotationProps) {
  return (
    <div className={cn('flex gap-4 rounded text-sm', className)}>
      {children}
    </div>
  )
}
