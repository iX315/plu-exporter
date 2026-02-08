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
    addBreakBefore = "print:break-before-page"
  }

  return (
    <div className={`entry-group ${addBreakBefore}`}>
      <p className="entry-group-pre">{group.pre}</p>
      <h2 className={"entry-group-heading"}>
        {group.name}
      </h2>
      <h3 className={"entry-group-description"}>
        {group.description}
      </h3>
      <div className={"py-product-row"}>
        {products.map((product, i) => (
          <ProductRow key={i} {...product} />
        ))}
      </div>
      <p className="entry-group-post">
        {group.post}
      </p>
    </div>
  )
}
