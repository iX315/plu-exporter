import { Allergen } from "@/models/Allergen"
import { Fragment } from "react"

export const Allergens = ({ data }: { data: Allergen[] }) => (
  <div>
    <h3 className="pb-3">Allergens</h3>
    <div className="text-xs grid gap-2 grid-cols-[auto_1fr]">
      {data.map(({ id, name, description }) => (
        <Fragment key={id}>
          <p>{id}.</p>
          <div>
            <p className="font-semibold">{name}</p>
            <p className="italic">{description}</p>
          </div>
        </Fragment>
      ))}
    </div>
  </div>
)
