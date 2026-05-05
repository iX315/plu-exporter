"use client"

import { RefObject } from "react"

import { ProductRow } from "."
import type { Group as GroupType, Product } from "@/generated/prisma/client"

type GroupProps = GroupType & {
  pageRef: RefObject<number>
  products: Product[]
}

export const Group = ({
  pageRef,
  pre,
  name,
  description,
  post,
  page,
  products,
}: GroupProps) => {
  let addBreakBefore = ""

  if (page !== pageRef.current) {
    pageRef.current = page
    addBreakBefore = "print:break-before-page"
  }

  return (
    <div suppressHydrationWarning className={`entry-group ${addBreakBefore}`}>
      <p className="entry-group-pre">{pre}</p>
      <h2 className={"entry-group-heading"}>
        {name}
      </h2>
      {description ? (
        <h3 className={"entry-group-description"}>
          {description}
        </h3>
      ) : null}
      <div>
        {products.map((product, i) => (
          <ProductRow key={i} {...product} />
        ))}
      </div>
      <p className="entry-group-post">
        {post}
      </p>
    </div>
  )
}
