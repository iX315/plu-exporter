"use server"
import { isCorrectSecret, isProd } from "../../../utils/env"
import { NextResponse } from "next/server"

export async function ALL(req: Request) {
  const { secret } = await req.json()

  if (!process.env.CACHE_SECRET || !secret || Array.isArray(secret)) {
    return NextResponse.json(
      { message: "Not available" },
      {
        status: 401,
      },
    )
    return
  }

  const methodIsCorrect = req.method === (isProd() ? "POST" : "GET")

  if (isCorrectSecret(secret) && methodIsCorrect) {
    return NextResponse.json(
      { message: "Cache cleared" },
      {
        status: 200,
      },
    )
  }
  return NextResponse.json(
    { message: "Not allowed" },
    {
      status: 500,
    },
  )
}
