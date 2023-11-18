import { HomeContainer, ProductContainer } from "@/styles/pages/home";
import Image from "next/image";

import shirt1 from '@/assets/shirts/1.png'
import shirt2 from '@/assets/shirts/2.png'

export default function Home() {
  return (
    <HomeContainer>
      <ProductContainer>
        <Image src={shirt1} width={520} height={480} alt="" />

        <footer>
          <strong>Shirt X</strong>
          <span>R$ 79,90</span>
        </footer>
      </ProductContainer>

      <ProductContainer>
        <Image src={shirt2} width={520} height={480} alt="" />

        <footer>
          <strong>Shirt X</strong>
          <span>R$ 79,90</span>
        </footer>
      </ProductContainer>
    </HomeContainer>
  )
}
