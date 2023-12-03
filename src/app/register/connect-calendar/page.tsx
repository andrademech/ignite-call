import { ConnectCalendarForm } from '@/components/ConnectCalendar'
import { MultiStep } from '@/components/MultiStep'

export default function ConnectCalendar() {
  return (
    <div className="mx-auto mt-24 flex max-w-[33.75rem] flex-col gap-6 px-4">
      <div className="px-6">
        <h2 className="text-3xl font-bold md:text-2xl md:leading-loose">
          Conecte sua agenda!
        </h2>
        <p className="md:leading-relaxed">
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </p>
      </div>
      <MultiStep size={4} currentStep={2} />

      <ConnectCalendarForm />
    </div>
  )
}
