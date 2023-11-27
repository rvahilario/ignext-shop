import Image from 'next/image'

import { Handbag } from '@phosphor-icons/react'
import logoImg from '@/assets/logo.svg'
import { HeaderContainer } from '@/styles/components/Header'


export function Header() {
  return (
    <HeaderContainer>
      <Image src={logoImg} alt="Logo" />

      <button onClick={() => console.log('open navbar')}>
        <Handbag weight="bold" />
        <span>{5}</span>
      </button>
    </HeaderContainer>
  )
}
