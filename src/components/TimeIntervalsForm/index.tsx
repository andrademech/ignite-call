'use client'

import { AlertCircleIcon, ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Input } from '../ui/input'
import { useFieldArray, useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { getWeekDays } from '@/utils/get-week-days'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormAnnotation } from '../FormAnnotation'
import { convertTimeStringToMinutes } from '@/utils/convert-time-string-to-minutes'
import { api } from '@/lib/axios'

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'Você precisa selecionar pelo menos um dia da semana',
    })
    .transform((intervals) => {
      return intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
          endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
        }
      })
    })
    .refine(
      (intervals) => {
        return intervals.every(
          (interval) => interval.startTimeInMinutes < interval.endTimeInMinutes,
        )
      },
      {
        message: 'O horário de início deve ser menor que o horário de término',
      },
    ),
})

type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>

export function TimeIntervalsForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
    control,
  } = useForm<TimeIntervalsFormInput, unknown, TimeIntervalsFormOutput>({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  })

  const weekDays = getWeekDays()

  const { fields } = useFieldArray({
    name: 'intervals',
    control,
  })

  const intervals = watch('intervals')

  async function handleSetTimeIntervals(data: TimeIntervalsFormOutput) {
    const { intervals } = data

    await api.post('/users/time-intervals', {
      intervals,
    })
  }

  return (
    <form
      className="flex w-full flex-col items-center justify-center gap-4 rounded border border-zinc-700 bg-zinc-900 p-6"
      onSubmit={handleSubmit(handleSetTimeIntervals)}
    >
      <div className="w-full rounded border border-zinc-700">
        {fields.map((field, index) => {
          return (
            <div
              className="flex w-full flex-col items-center justify-between gap-4 rounded border-b border-zinc-700 py-4"
              key={field.id}
            >
              <div className="flex w-full items-center justify-between px-4">
                <div className="flex items-center gap-3">
                  <Controller
                    name={`intervals.${index}.enabled`}
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        className="h-8 w-8 border border-zinc-700 bg-background data-[state=checked]:border-none data-[state=checked]:bg-ignitePrimary data-[state=checked]:text-zinc-100"
                        onCheckedChange={(checked) => {
                          field.onChange(checked === true)
                        }}
                        checked={field.value}
                      />
                    )}
                  />
                  <span className="text-zinc-100">
                    {weekDays[field.weekDay]}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    step={60}
                    className="calendar-picker"
                    disabled={intervals[index].enabled === false}
                    {...register(`intervals.${index}.startTime`)}
                  />
                  <Input
                    type="time"
                    step={60}
                    className="calendar-picker"
                    disabled={intervals[index].enabled === false}
                    {...register(`intervals.${index}.endTime`)}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {errors.intervals && (
        <FormAnnotation>
          <AlertCircleIcon size={16} className="text-red-100" />
          <span>
            Horário de término não pode ser menor que o horário de início ou{' '}
            <br />
            você precisa selecionar pelo menos um dia da semana
          </span>
        </FormAnnotation>
      )}

      <Button
        variant="default"
        size="lg"
        type="submit"
        className="my-1 flex w-full gap-4 bg-ignitePrimary text-white hover:bg-igniteSecondary disabled:bg-zinc-700"
        disabled={isSubmitting}
      >
        Próximo passo
        <ArrowRight size={16} />
      </Button>
    </form>
  )
}
