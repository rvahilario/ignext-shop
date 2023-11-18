import { useRouter } from 'next/router'
import React from 'react'

type Props = {}

export default function Product({}: Props) {
  const {query} = useRouter()

  return (
    <div>Product</div>
  )
}