"use client";

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { FaCheckCircle, FaHome, FaShoppingBag, FaEnvelope, FaShare } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SuccessPage = () => {
    const [orderNumber, setOrderNumber] = useState<string>('');
    const [customerEmail, setCustomerEmail] = useState<string>('');

    useEffect(() => {
        localStorage.removeItem('cart');
        const randomOrderNumber = Math.floor(100000 + Math.random() * 900000).toString();
        setOrderNumber(randomOrderNumber);
        const email = localStorage.getItem('customerEmail') || '';
        setCustomerEmail(email);

        const launchConfetti = () => {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#10B981', '#34D399', '#6EE7B7'],
                disableForReducedMotion: true
            });
        };

        launchConfetti();
        const confettiInterval = setInterval(launchConfetti, 3000);

        return () => {
            localStorage.removeItem('customerEmail');
            clearInterval(confettiInterval);
        };
    }, []);

    const handleShare = useCallback(() => {
        if (navigator.share) {
            navigator.share({
                title: 'My Purchase from IVES_HUB STORE',
                text: `I just made a purchase! Order #${orderNumber}`,
                url: window.location.href,
            }).then(() => {
                toast.success('Shared successfully!');
            }).catch((error) => {
                console.error('Error sharing:', error);
                toast.error('Error sharing. Please try again.');
            });
        } else {
            toast.info('Sharing is not supported on this device');
        }
    }, [orderNumber]);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="max-w-md w-full space-y-8 bg-gray-900 p-6 sm:p-10 rounded-xl shadow-2xl border border-green-500">
                <div className="text-center">
                    <FaCheckCircle className="mx-auto h-16 w-16 text-green-500 animate-bounce" />
                    <h2 className="mt-6 text-2xl sm:text-3xl font-extrabold text-green-400">
                        Thank you for your purchase!
                    </h2>
                    <p className="mt-2 text-sm text-green-300">
                        Your order has been successfully processed.
                    </p>
                </div>
                <div className="mt-8 space-y-6">
                    <div className="rounded-md bg-gray-800 p-4">
                        <p className="text-sm font-medium text-green-400">
                            Order Number:
                        </p>
                        <p className="mt-2 text-lg font-bold text-green-500">
                            #{orderNumber}
                        </p>
                    </div>
                    {customerEmail && (
                        <div className="rounded-md bg-gray-800 p-4">
                            <p className="text-sm font-medium text-green-400 flex items-center">
                                <FaEnvelope className="mr-2" /> Confirmation sent to:
                            </p>
                            <p className="mt-2 text-sm font-medium text-green-500 break-all">
                                {customerEmail}
                            </p>
                        </div>
                    )}
                    <p className="text-center text-sm text-green-300">
                        We&apos;ve sent a confirmation email with order details and tracking information.
                    </p>
                    <div className="flex flex-col space-y-4">
                        <Link href="/" className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300">
                            <FaHome className="mr-2" />
                            Return to Home
                        </Link>
                        <Link href="/orders" className="w-full flex items-center justify-center px-4 py-3 border border-green-500 rounded-md shadow-sm text-sm font-medium text-green-500 bg-transparent hover:bg-green-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300">
                            <FaShoppingBag className="mr-2" />
                            View My Orders
                        </Link>
                        <button onClick={handleShare} className="w-full flex items-center justify-center px-4 py-3 border border-green-500 rounded-md shadow-sm text-sm font-medium text-green-500 bg-transparent hover:bg-green-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300">
                            <FaShare className="mr-2" />
                            Share Purchase
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;