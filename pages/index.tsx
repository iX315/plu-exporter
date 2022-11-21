import { Box, Grid, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Data, ProductData } from "./api/data"

const ProductRow = ({ PLU, Name, Allergies, Details, Description, Size, Price }: ProductData) => (
  <Grid templateColumns='10% 1fr 10% 10%' gap={2} pb={"0.5em"} className={'avoidBreakPageInside'}>
    <Text>{PLU}</Text>
    <Box>
      <Text as="b">{Name}</Text>{Allergies && ' '}<Text as='sup'>{Allergies}</Text>{Details && ' '}<Text as="i">{Details}</Text>
      <br />
      <Text size="sm"><i>{Description}</i></Text>
    </Box>
    <Text>{Size}</Text>
    <Text>{Price}</Text>
  </Grid>
)

export default function Home() {
  const [data, setData] = useState<Data>()
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/data')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data || !data.values) return <p>No data</p>

  return (
    <Box padding={"3em"}>
      {data.values.map(({ group, products }, i) => {
        return (
          <Box key={i} pb={"2em"} className={'avoidBreakPageInside'}>
            <Text>{group.pre}</Text>
            <Text as="h2" color="orange"><b><i>{group.Name}</i></b></Text>
            <Text as="h3" color="orange" size="13px" py={"0.2em"}><i>{group.Description}</i></Text>
            <Box py={"1em"}>
              {products.map((product, i) => <ProductRow key={i} {...product} />)}
            </Box>
            <Text align={"center"} size="md"><b><i>{group.post}</i></b></Text>
          </Box>
        )
      })}
    </Box>
  )
}
