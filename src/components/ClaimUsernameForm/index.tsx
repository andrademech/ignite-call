'use client'

import { ArrowRight, AlertCircleIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormAnnotation } from '../FormAnnotation'

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
    formState: { errors },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    console.log(data.username)
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
            prefix="ignite.com/"
            {...register('username')}
          />
        </div>

        <Button
          variant="default"
          size="lg"
          type="submit"
          className="flex w-full gap-4"
        >
          Reservar usuario
          <ArrowRight size={16} />
        </Button>
      </form>
      <FormAnnotation>
        {errors.username?.message ? (
          <div className="flex w-full items-center justify-center gap-4 rounded bg-destructive p-2 text-red-100 md:w-fit">
            <AlertCircleIcon className="text-red-100" />
            <span className="">{errors.username?.message as string}</span>
          </div>
        ) : (
          <span>Digite o nome do usuário</span>
        )}
      </FormAnnotation>
    </>
  )
}
