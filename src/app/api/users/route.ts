import { prisma } from '@/lib/prisma'
import { NextApiResponse } from 'next'

import { cookies } from 'next/headers'

export async function POST(request: Request, response: NextApiResponse) {
  const { name, username } = await request.json()

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (userExists) {
    return new Response(JSON.stringify({ message: 'User already exists' }), {
      status: 400,
    })
  }

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })

  cookies().set('@ignitecall:userId', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })

  console.log(user)
  return new Response(JSON.stringify({ user, response }), {
    status: 201,
  })
}
