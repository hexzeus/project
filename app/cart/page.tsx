"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaTrash } from 'react-icons/fa';

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
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h2>
            {cart.length === 0 ? (
                <div className="text-center">
                    <p className="text-xl mb-4">Your cart is empty.</p>
                    <Link href="/" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        {cart.map((item) => (
                            <div key={item.id} className="flex items-center mb-6 bg-white p-4 rounded-lg shadow">
                                <div className="w-24 h-24 mr-4">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-cover rounded"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold">{item.name}</h3>
                                    <p className="text-gray-600">${item.price}</p>
                                    <div className="flex items-center mt-2">
                                        <button
                                            className="bg-gray-200 px-2 py-1 rounded"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            -
                                        </button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <button
                                            className="bg-gray-200 px-2 py-1 rounded"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button
                                    className="text-red-500 hover:text-red-700 transition duration-300"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    <FaTrash size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="md:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="border-t pt-2 mt-2">
                                <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                            <Link href="/checkout" className="block text-center bg-blue-600 text-white px-6 py-2 rounded mt-6 hover:bg-blue-700 transition duration-300">
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