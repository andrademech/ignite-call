interface IStepProps {
  active?: boolean
}

export function Step({ active = false }: IStepProps) {
  return (
    <div className="h-1 border">
      {active && <div className="h-1 bg-primary" />}
    </div>
  )
}
