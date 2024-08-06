"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaTimesCircle, FaHome, FaShoppingCart, FaQuestion } from 'react-icons/fa';

const CancelPage = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Clear any incomplete order data from localStorage
        localStorage.removeItem('tempOrder');

        // Trigger fade-in effect
        const timer = setTimeout(() => setIsVisible(true), 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div
                className={`max-w-md w-full space-y-8 bg-gray-900 p-6 sm:p-10 rounded-xl shadow-2xl border border-green-500 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            >
                <div className="text-center">
                    <div className={`transition-transform duration-500 ${isVisible ? 'rotate-0' : '-rotate-90'}`}>
                        <FaTimesCircle className="mx-auto h-16 w-16 text-red-500" />
                    </div>
                    <h2 className="mt-6 text-2xl sm:text-3xl font-extrabold text-green-500">
                        Order Canceled
                    </h2>
                    <p className="mt-2 text-sm text-green-400">
                        Your order was canceled. No charges were made to your account.
                    </p>
                </div>
                <div className="mt-8 space-y-4">
                    <Link href="/" className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300">
                        <FaHome className="mr-2" />
                        Return to Home
                    </Link>
                    <Link href="/cart" className="w-full flex items-center justify-center px-4 py-3 border border-green-500 rounded-md shadow-sm text-sm font-medium text-green-500 bg-transparent hover:bg-green-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300">
                        <FaShoppingCart className="mr-2" />
                        Return to Cart
                    </Link>
                    <Link href="/faq" className="w-full flex items-center justify-center px-4 py-3 border border-green-500 rounded-md shadow-sm text-sm font-medium text-green-500 bg-transparent hover:bg-green-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300">
                        <FaQuestion className="mr-2" />
                        FAQ
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CancelPage;