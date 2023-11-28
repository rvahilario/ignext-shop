import { createContext, ReactNode, useEffect, useReducer } from 'react'
import axios from 'axios'

type ProductType = {
  imageUrl: string
  name: string
  price: string
  id: string
  description?: string
  defaultPriceId?: string
  quantity?: number
}

type PurchaseContextProps = {
  cartProducts: ProductType[]
  addToCart: (product: ProductType) => void
  removeFromCart: (productId: string) => void
  buyProduct: () => void
  totalPrice: number
  quantityItems: number
}

export const PurchaseContext = createContext({} as PurchaseContextProps)

type PurchaseContextProviderProps = {
  children: ReactNode
}

const LOCAL_STORAGE_KEY = '@ignite-shop/purchase/v0.01'

export function PurchaseProvider({
  children,
}: PurchaseContextProviderProps) {
  const [purchaseState, dispatch] = useReducer(
    (state: any, action: any) => {
      switch (action.type) {
        case 'SET_RECOVERED_VALUE': {
          return action.payload.cartProducts
        }

        case 'ADD_TO_CART': {
          const { productToAdd } = action.payload
          const updatedCart = addProductToCart(state.cartProducts, productToAdd)
          const { totalPrice, quantityItems } = calculateTotal(updatedCart)
          return {
            ...state,
            cartProducts: updatedCart,
            totalPrice: totalPrice,
            quantityItems: quantityItems,
          }
        }

        case 'REMOVE_FROM_CART': {
          const { productIdToRemove } = action.payload
          const updatedCart = removeProductFromCart(state.cartProducts, productIdToRemove)
          const { totalPrice, quantityItems } = calculateTotal(updatedCart)
          return {
            ...state,
            cartProducts: updatedCart,
            totalPrice: totalPrice,
            quantityItems: quantityItems,
          }
        }

        default:
          return state
      }
    },
    {
      cartProducts: [],
      totalPrice: 0,
      quantityItems: 0,
    },
  )

  useEffect(() => {
    const storedStateAsJSON = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (storedStateAsJSON) {
      dispatch({
        type: 'SET_RECOVERED_VALUE',
        payload: {
          cartProducts: JSON.parse(storedStateAsJSON),
        },
      })
    }
  }, [])

  useEffect(() => {
    const stateJSON = JSON.stringify(purchaseState)

    localStorage.setItem(LOCAL_STORAGE_KEY, stateJSON)
  }, [purchaseState])

  const { cartProducts, totalPrice, quantityItems } = purchaseState

  function addToCart(product: ProductType) {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        productToAdd: product,
      },
    })
  }

  function removeFromCart(productId: string) {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: {
        productIdToRemove: productId,
      },
    })
  }

  async function buyProduct() {
    const pricesId = cartProducts.map((product: ProductType) => {
      return {
        price: product.defaultPriceId,
        quantity: product.quantity,
      }
    })

    try {
      const resp = await axios.post('/api/checkout', {
        pricesId,
      })
      const { checkoutUrl } = resp.data
      // router.push('/checkout') // To internal routes
      window.location.href = checkoutUrl // To external routes
    } catch (error) {
      alert(error)
    }
  }

  return (
    <PurchaseContext.Provider
      value={{ cartProducts, addToCart, removeFromCart, buyProduct, totalPrice, quantityItems }}
    >
      {children}
    </PurchaseContext.Provider>
  )
}

function addProductToCart(cart: ProductType[], productToAdd: ProductType) {
  const existingProductIndex = cart.findIndex(
    (product) => product.id === productToAdd.id
  )

  if (existingProductIndex !== -1) {
    const updatedCart = cart.map((product, index) => {
      if (index === existingProductIndex) {
        return {
          ...product,
          quantity: (product.quantity || 1) + 1,
        }
      }

      return product
    })

    return updatedCart
  } else {
    return [...cart, { ...productToAdd, quantity: 1 }]
  }
}

function removeProductFromCart(cart: ProductType[], productIdToRemove: string) {
  const existingProductIndex = cart.findIndex(
    (product) => product.id === productIdToRemove
  )

  if (existingProductIndex !== -1) {
    const updatedCart = cart.map((product, index) => {
      if (index === existingProductIndex) {
        const updatedQuantity = (product.quantity || 1) - 1

        if (updatedQuantity <= 0) {
          return null
        } else {
          return {
            ...product,
            quantity: updatedQuantity,
          }
        }
      }

      return product
    }).filter(Boolean) as ProductType[]

    return updatedCart
  } else {
    return cart
  }
}

function calculateTotal(cartProducts: ProductType[]) {
  let totalPrice = 0
  let quantityItems = 0

  cartProducts.forEach((product) => {
    const priceNumber = parseFloat(product.price.replace('R$ ', '').replace(',', '.'))
    const productTotalPrice = priceNumber * (product.quantity || 0)

    totalPrice += productTotalPrice
    quantityItems += product.quantity || 0
  })

  return {
    totalPrice,
    quantityItems,
  }
}
