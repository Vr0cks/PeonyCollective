'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Product } from '@/src/types'

interface CartItem extends Product {}

interface CartContextType {
  cartItems: CartItem[]
  isCartOpen: boolean
  setIsCartOpen: (isOpen: boolean) => void
  addToCart: (product: CartItem) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  cartTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // LocalStorage'dan sepeti yükle
  useEffect(() => {
    setIsMounted(true)
    const savedCart = localStorage.getItem('peony_cart')
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Failed to parse cart:', error)
      }
    }
  }, [])

  // Sepet her değiştiğinde LocalStorage'a kaydet
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('peony_cart', JSON.stringify(cartItems))
    }
  }, [cartItems, isMounted])

  const addToCart = (product: CartItem) => {
    setCartItems(prev => {
      // Zaten sepette varsa ekleme
      if (prev.find(item => item.id === product.id)) return prev
      return [...prev, product]
    })
    setIsCartOpen(true) // Eklenince sepeti aç
  }

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartTotal = cartItems.reduce((total, item) => total + (item.price || 0), 0)

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      clearCart,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    console.warn('useCart must be used within a CartProvider - Returning fallback context')
    return {
      cartItems: [],
      isCartOpen: false,
      setIsCartOpen: () => {},
      addToCart: () => {},
      removeFromCart: () => {},
      clearCart: () => {},
      cartTotal: 0
    }
  }
  return context
}
