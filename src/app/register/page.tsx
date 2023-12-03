import { MultiStep } from '@/components/MultiStep'
import { RegisterForm } from '@/components/RegisterForm'

export default function Register() {
  return (
    <div className="mx-auto mt-24 flex max-w-[33.75rem] flex-col gap-6 px-4">
      <div className="px-6">
        <h2 className="text-3xl font-bold md:text-2xl md:leading-loose">
          Bem-vindo ao Ignite Call!
        </h2>
        <p className="md:leading-relaxed">
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </p>
      </div>
      <MultiStep size={4} currentStep={1} />

      <RegisterForm />
    </div>
  )
}
