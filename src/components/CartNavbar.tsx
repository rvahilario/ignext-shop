import {
  NavWrapper,
  HeaderContainer,
  ProductsContainer,
  InfoContainer,
  NavContainer
} from '@/styles/components/CartNavbar'
import { X } from '@phosphor-icons/react'
import { ProductView } from './ProductView'

type CartNavbarProps = {
  isShow: boolean
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
  handleClose: () => void
}

export function CartNavbar({ isShow, products, handleClose }: CartNavbarProps) {
  function handleBuyCart() {
    console.log('handleBuyCart')
  }

  return (
    <NavWrapper transform={isShow ? 'show' : 'hidden'}>
      <HeaderContainer>
        <button onClick={handleClose}>
          <X />
        </button>
      </HeaderContainer>

      <NavContainer>
        <h2>Shopping bag</h2>

        <ProductsContainer>
          {products?.map((product) => (
            <ProductView key={product?.id} {...product} />
          ))}
        </ProductsContainer>

        <InfoContainer>
          <div>
            <span>Quantity</span>
            <span>{products?.length} {products?.length > 1 ? 'items' : 'item'}</span>
          </div>

          <div>
            <strong>Total</strong>
            <strong>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(369.7)}
            </strong>
          </div>
        </InfoContainer>

        <button onClick={handleBuyCart}>Finalize Purchase</button>
      </NavContainer>
    </NavWrapper>
  )
}

