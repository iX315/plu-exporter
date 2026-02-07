"use client"
import { Product } from "@/models/Product"

export const ProductRow = ({
  plu,
  name,
  allergies,
  details,
  description,
  size,
  price,
}: Product) => (
  <div
    className={"grid grid-cols-[6%_1fr_10%_auto] sm:grid-cols-[8%_1fr_10%_10%] gap-8 avoidBreakPageInside"}
  >
    <p>{plu}</p>
    <div className={"gap-2"}>
      <b>{name}</b>
      {allergies && " "}
      <sup>{allergies}</sup>
      {details && " "}
      <i>{details}</i>
      <br />
      <p className={"text-sm whitespace-pre-line"}>
        <i>{description}</i>
      </p>
    </div>
    <p className="text-nowrap place-self-end">{size}</p>
    <p className="text-nowrap">{price}</p>
  </div>
)
