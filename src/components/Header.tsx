import { useState } from 'react'
import Image from 'next/image'
import logoImg from '@/assets/logo.svg'
import { HeaderContainer } from '@/styles/components/Header'
import { CartNavbar } from './CartNavbar'
import { Handbag } from '@phosphor-icons/react'

export function Header() {
  const [showCartNav, setShowCartNav] = useState(false)

  function handleOpenCloseCartNav() {
    setShowCartNav(!showCartNav)
  }

  return (
    <HeaderContainer>
      <Image src={logoImg} alt="Logo" />

      <button onClick={handleOpenCloseCartNav}>
        <Handbag weight="bold" />
        <span>{5}</span>
      </button>

      <CartNavbar isShow={showCartNav} handleClose={handleOpenCloseCartNav} />
    </HeaderContainer>
  )
}
