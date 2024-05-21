"use client"
import { useRef } from "react"
import { Item } from "./"
import { MenuData } from "@/models/MenuData"

export interface MainProps {
  data?: {
    values: MenuData[]
  }
  isLoading: boolean
}

export const Main = ({ data, isLoading }: MainProps) => {
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
        <Item key={i} {...value} pageRef={page} />
      ))}
    </>
  )
}
