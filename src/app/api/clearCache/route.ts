"use server"
import { isCorrectSecret, isProd } from "../../../utils/env"
import { NextResponse } from "next/server"

const handler = async (req: Request) => {
  const { secret } = await req.json()

  if (!process.env.CACHE_SECRET || !secret || Array.isArray(secret)) {
    return NextResponse.json({ message: "Not available" }, { status: 401 })
    return
  }

  const methodIsCorrect = req.method === (isProd() ? "POST" : "GET")

  if (isCorrectSecret(secret) && methodIsCorrect) {
    return NextResponse.json({ message: "Cache cleared" }, { status: 200 })
  }
  return NextResponse.json({ message: "Forbidden" }, { status: 403 })
}

export async function GET(req: Request) {
  handler(req)
}
export async function POST(req: Request) {
  handler(req)
}
