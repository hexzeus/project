"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Product = {
    id: string;
    name: string;
    image: string;
    price: string;
    description: string;
};

const CartPage = () => {
    const [cart, setCart] = useState<Product[]>([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(savedCart);
    }, []);

    const removeFromCart = (id: string) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cart.map((product, index) => (
                        <div key={index} className="flex justify-between items-center mb-4">
                            <div>
                                <h3 className="text-lg">{product.name}</h3>
                                <p className="text-gray-600">${product.price}</p>
                            </div>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={() => removeFromCart(product.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="flex justify-end mt-6">
                        <Link href="/checkout" className="bg-blue-600 text-white px-6 py-2 rounded">
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
