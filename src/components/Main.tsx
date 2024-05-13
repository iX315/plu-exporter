"use client"
import { SkeletonText } from "@chakra-ui/react"
import { useRef } from "react"

import { Item } from "./"
import { Data } from "@/types"

export interface MainProps {
  data?: Data
  isLoading: boolean
}

export const Main = ({ data, isLoading }: MainProps) => {
  const page = useRef(1)

  if (isLoading) {
    return <SkeletonText noOfLines={5} spacing={4} isLoaded={!isLoading} />
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
