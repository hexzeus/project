"use client";

import Link from 'next/link';
import { FaTimesCircle, FaHome } from 'react-icons/fa';

const CancelPage = () => {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-gray-900 p-10 rounded-xl shadow-2xl border border-green-500">
                <div className="text-center">
                    <FaTimesCircle className="mx-auto h-16 w-16 text-red-500" />
                    <h2 className="mt-6 text-3xl font-extrabold text-green-500">
                        Order Canceled
                    </h2>
                    <p className="mt-2 text-sm text-green-400">
                        Your order was canceled. You can go back and try again.
                    </p>
                </div>
                <div className="mt-8">
                    <Link href="/" className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300">
                        <FaHome className="mr-2" />
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CancelPage;