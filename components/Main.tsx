import { SkeletonText } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Data } from "../types";

import { Item } from "./Item";

export const Main = () => {
  const [data, setData] = useState<Data>();
  const [isLoading, setLoading] = useState(true);
  const page = useRef(1);

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

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
  );
};
