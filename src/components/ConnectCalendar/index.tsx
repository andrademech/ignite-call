'use client'

import { ArrowRight, Check } from 'lucide-react'
import { Button } from '../ui/button'

import { signIn, useSession } from 'next-auth/react'

export function ConnectCalendarForm() {
  const session = useSession()

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded bg-zinc-900 px-4 py-6">
      <div className="boder-zinc-700 flex w-full items-center justify-between rounded border px-6 py-4">
        <h4 className="strong">Google Agenda</h4>
        <Button
          variant="outline"
          size="lg"
          type="submit"
          className="my-1 flex gap-4 border-2 border-igniteSecondary bg-transparent text-ignitePrimary hover:bg-igniteSecondary"
          onClick={() => signIn('google')}
          disabled={!!session.data}
        >
          {session.data ? (
            <>
              Conectado
              <Check size={16} />
            </>
          ) : (
            <>
              Conectar
              <ArrowRight size={16} />
            </>
          )}
        </Button>
      </div>

      <Button
        variant="default"
        size="lg"
        type="submit"
        className="my-1 flex w-full gap-4 bg-ignitePrimary text-white hover:bg-igniteSecondary disabled:bg-zinc-700"
        disabled={!session.data}
      >
        Próximo passo
        <ArrowRight size={16} />
      </Button>
    </div>
  )
}
