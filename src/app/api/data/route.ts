"use server"
import { NextResponse } from "next/server"
import { GetMenuData } from "@/utils"

export async function GET() {
  const values = await GetMenuData()

  if (values.length > 0) {
    return NextResponse.json({ values }, { status: 200 })
  } else {
    return NextResponse.json({ values }, { status: 500 })
  }
}
