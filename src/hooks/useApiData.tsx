import { useEffect, useState } from "react"
import { Data } from "../types"

export const useApiData = () => {
  const [data, setData] = useState<Data>()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  return {
    data,
    isLoading,
  }
}
