"use client"
import { ProductData } from "@/models/Product"

export const ProductRow = ({
  plu,
  name,
  allergies,
  details,
  description,
  size,
  price,
}: ProductData) => (
  <div
    className={"grid grid-cols-[10%_1fr_10%_auto] sm:grid-cols-[10%_1fr_10%_10%] gap-2 avoidBreakPageInside"}
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
    <p className="text-right">{size}</p>
    <p>{price}</p>
  </div>
)
