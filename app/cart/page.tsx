"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';

type CartItem = {
    id: string;
    name: string;
    image: string;
    price: string;
    description: string;
    quantity: number;
};

const CartPage = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const cartWithQuantities = savedCart.map((item: CartItem) => ({
            ...item,
            quantity: item.quantity || 1
        }));
        setCart(cartWithQuantities);
        calculateTotal(cartWithQuantities);
    }, []);

    const calculateTotal = (cartItems: CartItem[]) => {
        const sum = cartItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);
        setTotal(sum);
    };

    const removeFromCart = (id: string) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        calculateTotal(updatedCart);
    };

    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        const updatedCart = cart.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        calculateTotal(updatedCart);
    };

    return (
        <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Your Shopping Cart</h2>
            {cart.length === 0 ? (
                <div className="text-center bg-white p-8 rounded-lg shadow-lg">
                    <FaShoppingCart className="mx-auto text-6xl text-gray-400 mb-4" />
                    <p className="text-2xl mb-6 text-gray-600">Your cart is empty.</p>
                    <Link href="/" className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition duration-300 text-lg font-semibold">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {cart.map((item) => (
                            <div key={item.id} className="flex items-center mb-6 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                                <div className="w-24 h-24 mr-6 flex-shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
                                    <p className="text-blue-600 font-bold mb-2">${item.price}</p>
                                    <div className="flex items-center">
                                        <button
                                            className="bg-gray-200 text-gray-800 px-3 py-1 rounded-l-full hover:bg-gray-300 transition duration-300"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            -
                                        </button>
                                        <span className="mx-4 font-semibold text-gray-800">{item.quantity}</span>
                                        <button
                                            className="bg-gray-200 text-gray-800 px-3 py-1 rounded-r-full hover:bg-gray-300 transition duration-300"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button
                                    className="text-red-500 hover:text-red-700 transition duration-300 ml-4"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    <FaTrash size={24} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h3>
                            <div className="flex justify-between mb-4 text-gray-600">
                                <span>Subtotal</span>
                                <span className="font-semibold">${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-4 text-gray-600">
                                <span>Shipping</span>
                                <span className="font-semibold text-green-600">Free</span>
                            </div>
                            <div className="border-t border-gray-200 pt-4 mt-4">
                                <div className="flex justify-between font-bold text-lg text-gray-800">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                            <Link href="/checkout" className="block text-center bg-blue-600 text-white px-6 py-3 rounded-full mt-8 hover:bg-blue-700 transition duration-300 text-lg font-semibold">
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;