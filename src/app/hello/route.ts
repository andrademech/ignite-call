import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const data = 'Hello world'

  console.log(data)

  return NextResponse.json({ data })
}