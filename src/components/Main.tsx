"use client"
import { useRef } from "react"
import { Group } from "./"
import { Menu } from "@/models/Menu"

export interface MainProps {
  data?: {
    values: Menu[]
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
        <Group key={i} {...value} pageRef={page} />
      ))}
    </>
  )
}
