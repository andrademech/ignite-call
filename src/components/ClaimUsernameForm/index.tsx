'use client'

import { ArrowRight, AlertCircleIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormAnnotation } from '../FormAnnotation'
import { useRouter } from 'next/navigation'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário deve ter no mínimo 3 letras' })
    .regex(/^([a-z\\\\-]+)$/i, {
      message: 'O usuário deve conter apenas letras e hifens',
    })
    .transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  const router = useRouter()

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    const { username } = data

    await router.push(`/register?username=${username}`)
  }

  return (
    <>
      <form
        className="flex flex-col items-center justify-center gap-4 rounded bg-zinc-900 p-5 lg:flex-row"
        onSubmit={handleSubmit(handleClaimUsername)}
      >
        <div className="flex w-full items-center justify-center gap-4">
          <p className="font-bold">ignite.com/</p>
          <Input
            type="text"
            placeholder="seu-usuario"
            {...register('username')}
          />
        </div>

        <Button
          variant="default"
          size="lg"
          type="submit"
          className="flex w-full gap-4"
          disabled={isSubmitting}
        >
          Reservar usuario
          <ArrowRight size={16} />
        </Button>
      </form>
      {errors.username ? (
        <FormAnnotation>
          <AlertCircleIcon size={16} className="text-red-100" />
          <span className="">{errors.username.message as string}</span>
        </FormAnnotation>
      ) : (
        <FormAnnotation className="justify-start bg-transparent text-white">
          <span>Digite o nome do usuário</span>
        </FormAnnotation>
      )}
    </>
  )
}
