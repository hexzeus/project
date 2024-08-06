"use client";

import { useState } from 'react';
import useWishlistState from '../hooks/useWishlistState';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart, FaShoppingCart, FaTrash } from 'react-icons/fa';

type WishlistItem = {
    id: string;
    name: string;
    image: string;
    price: string;
};

const WishlistPage = () => {
    const { wishlist, removeFromWishlist } = useWishlistState();
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const addToCart = (item: WishlistItem) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        removeFromWishlist(item);
    };

    return (
        <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-extrabold text-green-500 mb-8 text-center">Your Wishlist</h1>
                {wishlist.length === 0 ? (
                    <div className="text-center bg-gray-900 p-8 rounded-lg shadow-md border border-green-500">
                        <FaHeart className="mx-auto text-6xl text-green-500 mb-4" />
                        <p className="text-xl text-green-400 mb-6">Your wishlist is empty.</p>
                        <Link href="/" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-black bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300">
                            <FaShoppingCart className="mr-2" />
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlist.map((item) => (
                            <div
                                key={item.id}
                                className="bg-gray-900 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 border border-green-500"
                                onMouseEnter={() => setHoveredItem(item.id)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <div className="relative h-64">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                    {hoveredItem === item.id && (
                                        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                                            <button
                                                className="bg-green-500 text-black px-4 py-2 rounded-full font-semibold hover:bg-green-400 transition duration-300"
                                                onClick={() => addToCart(item)}
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-green-400 mb-2">{item.name}</h3>
                                    <p className="text-green-500 font-bold mb-4">${item.price}</p>
                                    <button
                                        className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 flex items-center justify-center"
                                        onClick={() => removeFromWishlist(item)}
                                    >
                                        <FaTrash className="mr-2" />
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;