"use client"
import { useRef } from "react"
import { Group as GroupComponent } from "."
import type { Group, Product } from "@/generated/prisma/client"

export interface MainProps {
  data?: {
    values: (Group & {products: Product[]})[]
  }
  isLoading: boolean
}

export const MenuLoader = ({ data, isLoading }: MainProps) => {
  const page = useRef(1)

  if (isLoading) {
    return (
      <p className="gap-5">
        <span className="w-full h-4 bg-gray-200" />
        <span className="w-full h-4 bg-gray-200" />
        <span className="w-full h-4 bg-gray-200" />
        <span className="w-full h-4 bg-gray-200" />
        <span className="w-full h-4 bg-gray-200" />
      </p>
    )
  }

  if (!data || !data.values) return <p>No data</p>

  return (
    <>
      {data.values.map((value, i) => (
        <GroupComponent key={i} {...value} pageRef={page} />
      ))}
    </>
  )
}
