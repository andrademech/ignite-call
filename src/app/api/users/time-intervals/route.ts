import { NextApiResponse } from 'next'

import { authOptions } from '@/app/lib/auth'
import { getServerSession } from 'next-auth/next'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    }),
  ),
})

export async function POST(request: Request, response: NextApiResponse) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new Response(JSON.stringify({ message: 'You must be logged in.' }), {
      status: 401,
    })
  }

  const requestBody: string = await request.json()

  const { intervals } = timeIntervalsBodySchema.parse(requestBody)

  await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          time_end_in_minutes: interval.endTimeInMinutes,
          time_start_in_minutes: interval.startTimeInMinutes,
          week_day: interval.weekDay,
          user_id: session.user.id,
        },
      })
    }),
  )

  return new Response(JSON.stringify({ response }), {
    status: 201,
  })
}
