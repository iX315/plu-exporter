import { Box, SkeletonText } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Data } from "../types";

import { Item } from "./Item";

export const Main = () => {
  const [data, setData] = useState<Data>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/data")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <SkeletonText noOfLines={5} spacing={4} isLoaded={!isLoading} />
      {!data || !data.values ? (
        <p>No data</p>
      ) : (
        data.values.map((value, i) => <Item key={i} {...value} />)
      )}
    </>
  );
};
