'use client'

import { AlertCircleIcon, ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormAnnotation } from '../FormAnnotation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'

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
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const searchParams = useSearchParams()

  const router = useRouter()

  useEffect(() => {
    if (searchParams.get('username') === null) return
    setValue('username', searchParams.get('username') as string)
  }, [searchParams, setValue])

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      })

      await router.push('/register/connect-calendar')
    } catch (err) {
      if (err instanceof AxiosError) {
        alert(err?.response?.data?.message)
      }
    }
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

      <div className="w-full">
        {errors.username && (
          <FormAnnotation>
            <AlertCircleIcon size={16} className="text-red-100" />
            <span className="">{errors.username.message as string}</span>
          </FormAnnotation>
        )}
      </div>

      <label className="w-full">Nome completo</label>

      <div className="flex w-full items-center justify-center">
        <Input type="text" placeholder="Seu nome" {...register('name')} />
      </div>

      <div className="w-full">
        {errors.name && (
          <FormAnnotation>
            <AlertCircleIcon size={16} className="text-red-100" />
            <span className="">{errors.name?.message as string}</span>
          </FormAnnotation>
        )}
      </div>

      <Button
        variant="default"
        size="lg"
        type="submit"
        className="my-1 flex w-full gap-4 bg-ignitePrimary text-white hover:bg-igniteSecondary"
        disabled={isSubmitting}
      >
        Próximo passo
        <ArrowRight size={16} />
      </Button>
    </form>
  )
}
