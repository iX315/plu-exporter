'use server'
import { NextResponse } from 'next/server'

import { dbClient } from '@/utils/dbClient'

export async function GET() {
  const values = await dbClient.group.findMany({ where: { language: undefined }, include: { products: true } })

  if (values.length > 0) {
    return NextResponse.json({ values }, { status: 200 })
  } else {
    return NextResponse.json({ values }, { status: 500 })
  }
}
