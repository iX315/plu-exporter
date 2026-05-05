'use client'

import type { Product, Allergen } from '@/generated/prisma/client'

const baseUrl = 'https://static.funwero.xyz/images/'

export const ProductRow = ({
  plu,
  name,
  image,
  allergens,
  details,
  description,
  size,
  price
}: Product & { allergens?: Allergen[] }) => (
  <div className={'product-grid'}>
    <div className="w-full">
      <p className="product-plu">{plu}</p>
      {image ? <img className={'product-img'} src={`${baseUrl}${image}`} /> : <div />}
    </div>
    <div>
      {name ? <span className="product-name">{name}</span> : null}
      {allergens && ' '}
      {allergens ? <sup>{allergens.map(a => a.name).join(', ')}</sup> : null}
      {details && ' '}
      {details ? <span className="product-details">{details}</span> : null}
      {name ? <br /> : null}
      {image ? <img className={'product-img-mobile'} src={`${baseUrl}${image}`} /> : <div />}
      <p className={'product-description'}>
        {description}
      </p>

    </div>
    <p className="product-size">{size}</p>
    <p className="product-price">{price}</p>
  </div>
)
