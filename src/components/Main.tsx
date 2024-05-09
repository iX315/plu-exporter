"use client"
import { SkeletonText } from "@chakra-ui/react"
import { useRef } from "react"

import { Item } from "./Item"
import { useApiData } from "../hooks/useApiData"

export const Main = () => {
  const page = useRef(1)
  const { data, isLoading } = useApiData()

  return (
    <>
      {isLoading ? (
        <SkeletonText noOfLines={5} spacing={4} isLoaded={!isLoading} />
      ) : !data || !data.values ? (
        <p>No data</p>
      ) : (
        data &&
        data.values.map((value, i) => (
          <Item key={i} {...value} pageRef={page} />
        ))
      )}
    </>
  )
}
