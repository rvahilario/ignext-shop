import { MouseEvent, useState } from "react"
import Image from "next/image"
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

import { ArrowSVG, HomeContainer, NavigationWrapper, ProductContainer } from "@/styles/pages/home";

import shirt1 from '@/assets/shirts/1.png'
import shirt2 from '@/assets/shirts/2.png'
import shirt3 from '@/assets/shirts/3.png'

export default function Home() {
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
      <NavigationWrapper>
        <HomeContainer ref={sliderRef} className="keen-slider">
          <ProductContainer className="keen-slider__slide">
            <Image src={shirt1} width={520} height={480} alt="" />

            <footer>
              <strong>Shirt X</strong>
              <span>R$ 79,90</span>
            </footer>
          </ProductContainer>

          <ProductContainer className="keen-slider__slide">
            <Image src={shirt2} width={520} height={480} alt="" />

            <footer>
              <strong>Shirt X</strong>
              <span>R$ 79,90</span>
            </footer>
          </ProductContainer>

          <ProductContainer className="keen-slider__slide">
            <Image src={shirt3} width={520} height={480} alt="" />

            <footer>
              <strong>Shirt X</strong>
              <span>R$ 79,90</span>
            </footer>
          </ProductContainer>

          <ProductContainer className="keen-slider__slide">
            <Image src={shirt3} width={520} height={480} alt="" />

            <footer>
              <strong>Shirt X</strong>
              <span>R$ 79,90</span>
            </footer>
          </ProductContainer>
        </HomeContainer>

        {loaded && instanceRef.current && (
          <>
            <Arrow
              isLeft
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              isDisabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
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


type ArrowProps = {
  isDisabled?: boolean
  isLeft?: boolean
  onClick?: (e: MouseEvent<SVGElement>) => void;
}


function Arrow({ isDisabled, isLeft, onClick }: ArrowProps) {
  const disabledClass = isDisabled ? " arrow--disabled" : ""

  return (
    <ArrowSVG
      onClick={onClick}
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
