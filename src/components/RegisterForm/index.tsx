'use client'

import { AlertCircleIcon, ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormAnnotation } from '../FormAnnotation'
import { zodResolver } from '@hookform/resolvers/zod'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário deve ter no mínimo 3 letras' })
    .regex(/^([a-z\\\\-]+)$/i, {
      message: 'O usuário deve conter apenas letras e hifens',
    })
    .transform((username) => username.toLowerCase()),
  name: z.string().min(3, { message: 'O nome deve ter no mínimo 3 letras' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  async function handleRegister(data: RegisterFormData) {
    console.log(data.username, data.name)
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="flex flex-col items-center justify-center gap-4 rounded bg-zinc-900 p-6"
    >
      <label className="w-full">Nome do usuário</label>

      <div className="flex w-full items-center justify-center gap-2">
        <p className="text-sm font-semibold">ignite.com/</p>
        <Input
          type="text"
          placeholder="Seu usuario"
          {...register('username')}
        />
      </div>

      {errors.username && (
        <FormAnnotation>
          <AlertCircleIcon className="text-red-100" />
          <span className="">{errors.username.message as string}</span>
        </FormAnnotation>
      )}

      <label className="w-full">Nome completo</label>

      <div className="flex w-full items-center justify-center">
        <Input type="text" placeholder="Seu nome" {...register('name')} />
      </div>
      {errors.name && (
        <FormAnnotation>
          <AlertCircleIcon className="text-red-100" />
          <span className="">{errors.name?.message as string}</span>
        </FormAnnotation>
      )}

      <Button
        variant="default"
        size="lg"
        type="submit"
        className="bg-ignitePrimary hover:bg-igniteSecondary my-1 flex w-full gap-4 text-white"
        disabled={isSubmitting}
      >
        Próximo passo
        <ArrowRight size={16} />
      </Button>
    </form>
  )
}
