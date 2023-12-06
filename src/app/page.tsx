import Image from 'next/image'
import previewApp from '@/assets/app-preview.png'
import { ClaimUsernameForm } from '@/components/ClaimUsernameForm'

export default function Home() {
  return (
    <div className="md:max-w-container ml-auto flex h-screen items-center justify-center gap-20">
      <div className="flex max-w-md flex-col gap-4 py-10 md:max-w-[36rem]">
        <h2 className="text-3xl font-bold md:text-5xl md:leading-tight">
          Agendamento descomplicado
        </h2>
        <p className="md:text-lg">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </p>

        <ClaimUsernameForm />
      </div>

      <div className="hidden md:block md:overflow-hidden md:pr-8">
        <Image
          src={previewApp}
          quality={100}
          priority
          alt="Calendário simbolizando aplicação em funcionamento"
          style={{
            minWidth: '100%',
            maxWidth: '100%',
          }}
        />
      </div>
    </div>
  )
}
