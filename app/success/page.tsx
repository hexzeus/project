"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaCheckCircle, FaHome, FaShoppingBag, FaEnvelope } from 'react-icons/fa';
import confetti from 'canvas-confetti';

const SuccessPage = () => {
    const [orderNumber, setOrderNumber] = useState<string>('');
    const [customerEmail, setCustomerEmail] = useState<string>('');

    useEffect(() => {
        // Clear the cart after successful checkout
        localStorage.removeItem('cart');

        // Generate a random order number
        const randomOrderNumber = Math.floor(100000 + Math.random() * 900000).toString();
        setOrderNumber(randomOrderNumber);

        // Retrieve customer email from localStorage (assuming it was saved during checkout)
        const email = localStorage.getItem('customerEmail') || '';
        setCustomerEmail(email);

        // Trigger confetti animation
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#4F46E5', '#10B981', '#F59E0B'] // Indigo, Green, and Amber
        });

        // Cleanup function to remove the email from localStorage
        return () => {
            localStorage.removeItem('customerEmail');
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
                <div className="text-center">
                    <FaCheckCircle className="mx-auto h-16 w-16 text-green-500 animate-bounce" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Thank you for your purchase!
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Your order has been successfully processed.
                    </p>
                </div>
                <div className="mt-8 space-y-6">
                    <div className="rounded-md bg-indigo-50 p-4">
                        <p className="text-sm font-medium text-gray-700">
                            Order Number:
                        </p>
                        <p className="mt-2 text-lg font-bold text-indigo-600">
                            #{orderNumber}
                        </p>
                    </div>
                    {customerEmail && (
                        <div className="rounded-md bg-green-50 p-4">
                            <p className="text-sm font-medium text-gray-700 flex items-center">
                                <FaEnvelope className="mr-2" /> Confirmation sent to:
                            </p>
                            <p className="mt-2 text-sm font-medium text-green-600">
                                {customerEmail}
                            </p>
                        </div>
                    )}
                    <p className="text-center text-sm text-gray-500">
                        We&apos;ve sent a confirmation email with order details and tracking information.
                    </p>
                    <div className="flex flex-col space-y-4">
                        <Link href="/" className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300">
                            <FaHome className="mr-2" />
                            Return to Home
                        </Link>
                        <Link href="/orders" className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300">
                            <FaShoppingBag className="mr-2" />
                            View My Orders
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;