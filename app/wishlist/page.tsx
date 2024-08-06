"use client";

import { useState, useCallback } from 'react';
import useWishlistState from '../hooks/useWishlistState';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart, FaShoppingCart, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type WishlistItem = {
    id: string;
    name: string;
    image: string;
    price: string;
};

const WishlistPage = () => {
    const { wishlist, removeFromWishlist } = useWishlistState();
    const [activeItem, setActiveItem] = useState<string | null>(null);

    const addToCart = useCallback((item: WishlistItem) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItem = cart.find((cartItem: WishlistItem) => cartItem.id === item.id);

        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        removeFromWishlist(item);
        toast.success('Added to cart!');
    }, [removeFromWishlist]);

    const handleRemoveFromWishlist = useCallback((item: WishlistItem) => {
        removeFromWishlist(item);
        toast.info('Removed from wishlist');
    }, [removeFromWishlist]);

    return (
        <div className="min-h-screen bg-black py-6 px-4 sm:px-6 lg:px-8">
            <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="max-w-7xl mx-auto">
                <Link href="/" className="inline-flex items-center text-green-500 hover:text-green-400 mb-6 transition duration-300">
                    <FaArrowLeft className="mr-2" />
                    Back to Shop
                </Link>
                <h1 className="text-2xl md:text-3xl font-extrabold text-green-500 mb-6 text-center">Your Wishlist</h1>
                {wishlist.length === 0 ? (
                    <div className="text-center bg-gray-900 p-6 md:p-8 rounded-lg shadow-md border border-green-500">
                        <FaHeart className="mx-auto text-5xl md:text-6xl text-green-500 mb-4" />
                        <p className="text-lg md:text-xl text-green-400 mb-6">Your wishlist is empty.</p>
                        <Link href="/" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-black bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300">
                            <FaShoppingCart className="mr-2" />
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {wishlist.map((item) => (
                            <div
                                key={item.id}
                                className="bg-gray-900 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl border border-green-500"
                                onTouchStart={() => setActiveItem(item.id)}
                                onTouchEnd={() => setActiveItem(null)}
                                onMouseEnter={() => setActiveItem(item.id)}
                                onMouseLeave={() => setActiveItem(null)}
                            >
                                <div className="relative w-full h-48 md:h-64">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                    {activeItem === item.id && (
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
                                    <h3 className="text-base md:text-lg font-semibold text-green-400 mb-2 truncate">{item.name}</h3>
                                    <p className="text-green-500 font-bold mb-4">${item.price}</p>
                                    <div className="flex space-x-2">
                                        <button
                                            className="flex-1 bg-green-500 text-black px-3 py-2 rounded-md hover:bg-green-400 transition duration-300 flex items-center justify-center text-sm"
                                            onClick={() => addToCart(item)}
                                        >
                                            <FaShoppingCart className="mr-2" />
                                            Add to Cart
                                        </button>
                                        <button
                                            className="flex-1 bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition duration-300 flex items-center justify-center text-sm"
                                            onClick={() => handleRemoveFromWishlist(item)}
                                        >
                                            <FaTrash className="mr-2" />
                                            Remove
                                        </button>
                                    </div>
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