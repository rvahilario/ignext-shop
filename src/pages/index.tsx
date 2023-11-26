import { MouseEvent, useState } from "react"
import { GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import Stripe from "stripe"
import { stripe } from "@/lib/stripe"

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

import { ArrowSVG, HomeContainer, NavigationWrapper, ProductContainer } from "@/styles/pages/home";

type HomeProps = {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    mode: "free-snap",
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  return (
    <>
      <Head>
        <title>Home | Ignext Shop</title>
      </Head>

      <NavigationWrapper>
        <HomeContainer ref={sliderRef} className="keen-slider">
          {products.map(product => {
            return (
              <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
                <ProductContainer className="keen-slider__slide">
                  <Image src={product.imageUrl} width={520} height={480} alt="" />

                  <footer>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </footer>
                </ProductContainer>
              </Link>
            )
          })}
        </HomeContainer>

        {loaded && instanceRef.current && (
          <>
            <Arrow
              isLeft
              onClick={() => instanceRef.current?.prev()}
              isDisabled={currentSlide === 0}
            />

            <Arrow
              onClick={() => instanceRef.current?.next()}
              isDisabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </NavigationWrapper >
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })


  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount! / 100),
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours
  }
}

type ArrowProps = {
  isDisabled?: boolean
  isLeft?: boolean
  onClick?: () => void
}
// TODO: maybe move to a separate file
function Arrow({ isDisabled, isLeft, onClick }: ArrowProps) {
  const disabledClass = isDisabled ? " arrow--disabled" : ""

  const handleClick = (e: MouseEvent<SVGElement>) => {
    if (e) {
      e.stopPropagation()
      if (onClick) {
        onClick()
      }
    }
  }

  return (
    <ArrowSVG
      onClick={handleClick}
      className={`arrow ${isLeft ? "arrow--left" : "arrow--right"
        } ${disabledClass}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {isLeft && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}

      {!isLeft && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </ArrowSVG>
  )
}
