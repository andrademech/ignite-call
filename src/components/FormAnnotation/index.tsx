import { cn } from '@/lib/utils'

interface IFormAnnotationProps {
  className?: string
  children: React.ReactNode
}

export function FormAnnotation({ className, children }: IFormAnnotationProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded bg-destructive px-2 py-1 text-xs text-red-100',
        className,
      )}
    >
      {children}
    </div>
  )
}
