"use client"

import { useState } from "react"
import { ShoppingCart, Menu, X, Home, ShoppingBag, Trash2 } from "lucide-react"

// Mock cart items
interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    imageUrl: string
}

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)

    // Mock cart data
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: "1",
            name: "Premium Wireless Headphones",
            price: 249.99,
            quantity: 1,
            imageUrl: "/placeholder.svg?height=80&width=80",
        },
        {
            id: "3",
            name: "Smart Home Hub",
            price: 99.99,
            quantity: 2,
            imageUrl: "/placeholder.svg?height=80&width=80",
        },
    ])

    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
        if (isCartOpen) setIsCartOpen(false)
    }

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen)
        if (isMenuOpen) setIsMenuOpen(false)
    }

    const removeItem = (id: string) => {
        setCartItems(cartItems.filter((item) => item.id !== id))
    }

    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return
        setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }

    return (
        <nav className="bg-white shadow-md relative z-10">
            <div className="container mx-auto">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <div className="flex items-center">
                            <ShoppingBag className="h-8 w-8 text-emerald-600" />
                            <span className="ml-2 text-xl font-bold text-gray-800">StoreName</span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        <a
                            href="/"
                            className="flex items-center text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            <Home className="h-4 w-4 mr-1" />
                            Home
                        </a>
                        <a
                            href="/store"
                            className="flex items-center text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            <ShoppingBag className="h-4 w-4 mr-1" />
                            Store
                        </a>
                    </div>

                    {/* Cart Button (visible on all screen sizes) */}
                    <div className="flex items-center">
                        <button
                            className="relative p-2 text-gray-700 hover:text-emerald-600 focus:outline-none"
                            aria-label="Shopping cart"
                            onClick={toggleCart}
                        >
                            <ShoppingCart className="h-6 w-6" />
                            {cartItemCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-emerald-600 rounded-full">
                                    {cartItemCount}
                                </span>
                            )}
                        </button>

                        {/* Mobile menu button */}
                        <div className="md:hidden ml-4">
                            <button
                                onClick={toggleMenu}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-emerald-600 focus:outline-none"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {isMenuOpen ? (
                                    <X className="block h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <Menu className="block h-6 w-6" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
                        <a
                            href="/"
                            className="flex items-center text-gray-700 hover:text-emerald-600 block px-3 py-2 rounded-md text-base font-medium"
                        >
                            <Home className="h-5 w-5 mr-2" />
                            Home
                        </a>
                        <a
                            href="/store"
                            className="flex items-center text-gray-700 hover:text-emerald-600 block px-3 py-2 rounded-md text-base font-medium"
                        >
                            <ShoppingBag className="h-5 w-5 mr-2" />
                            Store
                        </a>
                    </div>
                </div>
            )}

            {/* Cart Dropdown */}
            {isCartOpen && (
                <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-md shadow-lg z-20 max-h-[80vh] overflow-auto">
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Your Cart</h3>
                            <button onClick={toggleCart} className="text-gray-400 hover:text-gray-500">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {cartItems.length === 0 ? (
                            <div className="py-6 text-center">
                                <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
                                <p className="mt-1 text-sm text-gray-500">Start shopping to add items to your cart.</p>
                            </div>
                        ) : (
                            <>
                                <div className="divide-y divide-gray-200">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="py-4 flex">
                                            <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                                                <img
                                                    src={item.imageUrl || "/placeholder.svg"}
                                                    alt={item.name}
                                                    className="w-full h-full object-center object-cover"
                                                />
                                            </div>
                                            <div className="ml-4 flex-1 flex flex-col">
                                                <div>
                                                    <div className="flex justify-between text-sm font-medium text-gray-900">
                                                        <h3 className="pr-2 line-clamp-1">{item.name}</h3>
                                                        <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                                                </div>
                                                <div className="flex-1 flex items-end justify-between text-sm">
                                                    <div className="flex items-center">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="text-gray-500 hover:text-gray-700 px-2"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="text-gray-500 mx-1">Qty {item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="text-gray-500 hover:text-gray-700 px-2"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(item.id)}
                                                        className="font-medium text-emerald-600 hover:text-emerald-500"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray-200 pt-4 mt-2">
                                    <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                                        <p>Subtotal</p>
                                        <p>${calculateTotal()}</p>
                                    </div>
                                    <button className="w-full bg-emerald-600 border border-transparent rounded-md py-3 px-4 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                                        Checkout
                                    </button>
                                    <div className="mt-4 text-center">
                                        <button
                                            type="button"
                                            className="font-medium text-emerald-600 hover:text-emerald-500"
                                            onClick={toggleCart}
                                        >
                                            Continue Shopping
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}