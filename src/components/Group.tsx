"use client"
import { Menu } from "@/models/Menu"
import { ProductRow } from "."
import { MutableRefObject } from "react"

export const Group = ({
  pageRef,
  group,
  products,
}: Menu & { pageRef: MutableRefObject<number> }) => {
  let addBreakBefore = ""

  if (group.page !== pageRef.current) {
    pageRef.current = group.page
    addBreakBefore = "breakPageBefore"
  }

  return (
    <div className={`pb-8 avoidBreakPageInside ${addBreakBefore}`}>
      <p>{group.pre}</p>
      <h2 className={"text-orange-500"}>
        <b>
          <i>{group.name}</i>
        </b>
      </h2>
      <h3 className={"text-orange-500 text-sm py-1"}>
        <i>{group.description}</i>
      </h3>
      <div className={"py-4"}>
        {products.map((product, i) => (
          <ProductRow key={i} {...product} />
        ))}
      </div>
      <p className="text-center text-md">
        <b>
          <i>{group.post}</i>
        </b>
      </p>
    </div>
  )
}
