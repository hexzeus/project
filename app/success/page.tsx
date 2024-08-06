"use client";

import { useEffect } from 'react';

const SuccessPage = () => {
    useEffect(() => {
        // Clear the cart after successful checkout
        localStorage.removeItem('cart');
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Thank you for your purchase!</h2>
            <p>Your order has been successfully processed.</p>
        </div>
    );
};

export default SuccessPage;
