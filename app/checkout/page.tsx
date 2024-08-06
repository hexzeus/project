"use client";

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const CheckoutPage = () => {
    const [cart, setCart] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [customer, setCustomer] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
    });

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(savedCart);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomer((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckout = async () => {
        setLoading(true);
        setError(null);

        try {
            const stripe = await stripePromise;

            const { data } = await axios.post('/api/checkout', {
                items: cart,
                customer,
            });

            const result = await stripe?.redirectToCheckout({
                sessionId: data.id,
            });

            if (result?.error) {
                setError(result.error.message || 'An error occurred.');
            }
        } catch (err) {
            setError('An error occurred during the checkout process.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Customer Information</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={customer.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={customer.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={customer.address}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">City</label>
                            <input
                                type="text"
                                name="city"
                                value={customer.city}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">State</label>
                            <input
                                type="text"
                                name="state"
                                value={customer.state}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">ZIP Code</label>
                            <input
                                type="text"
                                name="zip"
                                value={customer.zip}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded"
                            />
                        </div>
                    </div>
                    {cart.map((item, index) => (
                        <div key={index} className="flex justify-between items-center mb-4">
                            <div>
                                <h3 className="text-lg">{item.name}</h3>
                                <p className="text-gray-600">${item.price}</p>
                            </div>
                        </div>
                    ))}
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="flex justify-end mt-6">
                        <button
                            className="bg-blue-600 text-white px-6 py-2 rounded"
                            onClick={handleCheckout}
                            disabled={loading}
                        >
                            {loading ? <div className="spinner"></div> : 'Proceed to Checkout'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
