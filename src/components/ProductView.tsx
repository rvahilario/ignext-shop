import { useContext } from "react"
import { ImageContainer, ProductContainer } from "@/styles/components/ProductView"
import Image from "next/image"
import { PurchaseContext } from "../providers/Purchase"

type ProductViewProps = {
  id: string
  name: string
  imageUrl: string
  price: string
}

export function ProductView({ id, name, imageUrl, price }: ProductViewProps) {
  const { removeFromCart } = useContext(PurchaseContext)

  function handleRemoveFromCart() {
    removeFromCart(id)
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={imageUrl} height={94.79} width={94.79} alt={name} />
      </ImageContainer>

      <div>
        <h3>{name}</h3>
        <strong>{price}</strong>
        <button onClick={handleRemoveFromCart}>Remove</button>
      </div>
    </ProductContainer>
  )
}
