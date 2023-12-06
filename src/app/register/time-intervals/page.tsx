import { MultiStep } from '@/components/MultiStep'
import { TimeIntervalsForm } from '@/components/TimeIntervalsForm'

export default function TimeIntervals() {
  return (
    <div className="mx-auto mt-24 flex max-w-[33.75rem] flex-col gap-6">
      <div className="px-6">
        <h2 className="text-3xl font-bold md:text-2xl md:leading-loose">
          Quase lá
        </h2>
        <p className="md:leading-relaxed">
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </p>
      </div>
      <MultiStep size={4} currentStep={3} />

      <TimeIntervalsForm />
    </div>
  )
}
