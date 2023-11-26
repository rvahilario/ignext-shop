import React from 'react'
import Stripe from 'stripe'
import { stripe } from '@/src/lib/stripe'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { ProductContainer, ImageContainer, ProductDetails } from '@/src/styles/pages/product'

type ProductProps = {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  function handleBuyProduct() {
    console.log('defaultPriceId', product.defaultPriceId)
    // Create checkout session
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button onClick={handleBuyProduct}>Buy now</button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Search most accessed products
  // Improve changing fallback: "blocking" to true and creating a skeleton component to show while the page is loading

  return {
    paths: [{
      params: { id: 'prod_P2hhbYAGRukVw4' }
    }],
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params!.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1 // 1 hours
  }
}
