"use client"
import { Product } from "@/models/Product"

const baseUrl = 'https://static.funwero.xyz/images/'

export const ProductRow = ({
  plu,
  name,
  image,
  allergies,
  details,
  description,
  size,
  price,
}: Product) => (
  <div className={"product-grid"}>
    <div>
      <p className="product-plu">{plu}</p>
      {image ? <img className={"product-img"} src={`${baseUrl}${image}`} /> : <div />}
    </div>
    <div>
      {name ? <span className="product-name">{name}</span> : null}
      {allergies && " "}
      {allergies ? <sup>{allergies}</sup> : null}
      {details && " "}
      {details ? <span className="product-details">{details}</span> : null}
      {name ? <br /> : null}
      {image ? <img className={"product-img-mobile"} src={`${baseUrl}${image}`} /> : <div />}
      <p className={"product-description"}>
        {description}
      </p>
      
    </div>
    <p className="product-size">{size}</p>
    <p className="product-price">{price}</p>
  </div>
)
