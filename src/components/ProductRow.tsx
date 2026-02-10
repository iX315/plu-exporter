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
  <div className={"product-grid"}>
    <p className="product-plu">{plu}</p>
    <div>
      {name ? <span className="product-name">{name}</span> : null}
      {allergies && " "}
      <sup>{allergies}</sup>
      {details && " "}
      <span className="product-details">{details}</span>
      <br />
      <p className={"product-description"}>
        {description}
      </p>
    </div>
    <p className="product-size">{size}</p>
    <p className="product-price">{price}</p>
  </div>
)
