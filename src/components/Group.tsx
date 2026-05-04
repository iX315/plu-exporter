"use client"

import { RefObject } from "react"

import { ProductRow } from "."
import type { Menu } from '@/utils'

export const Group = ({
  pageRef,
  group,
  products,
}: Menu & { pageRef: RefObject<number> }) => {
  let addBreakBefore = ""

  if (group.page !== pageRef.current) {
    pageRef.current = group.page
    addBreakBefore = "print:break-before-page"
  }

  return (
    <div suppressHydrationWarning className={`entry-group ${addBreakBefore}`}>
      <p className="entry-group-pre">{group.pre}</p>
      <h2 className={"entry-group-heading"}>
        {group.name}
      </h2>
      {group.description ? (
        <h3 className={"entry-group-description"}>
          {group.description}
        </h3>
      ) : null}
      <div>
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
