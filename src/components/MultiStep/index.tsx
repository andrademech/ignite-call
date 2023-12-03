import { cn } from '@/lib/utils'
import { Step } from './Step'

export interface MultiStepProps {
  size: number
  currentStep?: number
}

export function MultiStep({ size, currentStep = 1 }: MultiStepProps) {
  return (
    <div className="px-6">
      <span className="text-sm">
        Passo {currentStep} de {size}
      </span>

      <div className={cn('mt-1 grid grid-cols-4 gap-2')}>
        {Array.from({ length: size }, (_, i) => i + 1).map((step) => {
          return <Step key={step} active={currentStep >= step} />
        })}
      </div>
    </div>
  )
}

MultiStep.displayName = 'MultiStep'
