import Image from 'next/image'
import previewImage from '@/assets/app-preview.svg'

export default function Home() {
  return (
    <div className="md:max-w-container ml-auto flex h-screen items-center justify-center gap-20 overflow-hidden">
      <div className="max-w-sm px-4 py-10 md:max-w-[30rem]">
        <h2 className="mb-4 text-3xl font-bold md:text-5xl md:leading-tight">
          Agendamento descomplicado
        </h2>
        <p className="md:text-lg">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </p>
      </div>

      <div className="hidden md:block md:overflow-hidden md:pr-8">
        <Image
          src={previewImage}
          height={400}
          quality={100}
          priority
          alt="Calendário simbolizando aplicação em funcionamento"
        />
      </div>
    </div>
  )
}

/**
 * export const Container = styled('div', {
  maxWidth: 'calc(100vw - (100vw - 1160px) / 2)',
  marginLeft: 'auto',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  gap: '$20',
})

export const Hero = styled('div', {
  maxWidth: 480,
  padding: '0 $10',

  [`${Heading}`]: {
    '@media(max-width: 600px)': {
      fontSize: '$6xl',
    },
  },

  [`${Text}`]: {
    maskType: '$2',
    color: '$gray200',
  },
})

export const Preview = styled('div', {
  paddingRight: '$8',
  overflow: 'hidden',

  '@media(max-width: 600px)': {
    display: 'none',
  },
})
 6 changes: 1 addition & 5 deletions6  
src/pages/index.page.tsx
 */
