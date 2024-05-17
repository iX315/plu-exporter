"use server"
import { NextResponse } from "next/server"
import { getMenuData } from "@/models/MenuData"

export async function GET() {
  const values = await getMenuData()

  if (values.length > 0) {
    return NextResponse.json({ values }, { status: 200 })
  } else {
    return NextResponse.json({ values }, { status: 500 })
  }
}
