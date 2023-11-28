import { useContext } from 'react'
import {
  NavWrapper,
  HeaderContainer,
  ProductsContainer,
  InfoContainer,
  NavContainer
} from '@/styles/components/CartNavbar'
import { X } from '@phosphor-icons/react'
import { ProductView } from './ProductView'
import { PurchaseContext } from '../providers/Purchase'

type CartNavbarProps = {
  isShow: boolean
  handleClose: () => void
}

export function CartNavbar({ isShow, handleClose }: CartNavbarProps) {
  const { cartProducts, buyProduct, totalPrice, quantityItems } = useContext(PurchaseContext)

  function handleBuyCart() {
    buyProduct()
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
          {cartProducts?.map((product) => {
            return <ProductView key={product?.id} {...product} />
          }
          )}
        </ProductsContainer>

        <InfoContainer>
          <div>
            <span>Quantity</span>
            <span>{quantityItems} {quantityItems !== 1 ? 'items' : 'item'}</span>
          </div>

          <div>
            <strong>Total</strong>
            <strong>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(totalPrice)}
            </strong>
          </div>
        </InfoContainer>

        <button onClick={handleBuyCart}>Finalize Purchase</button>
      </NavContainer>
    </NavWrapper>
  )
}

