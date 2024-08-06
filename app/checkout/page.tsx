"use client";

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { FaLock, FaShoppingCart } from 'react-icons/fa';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

type CartItem = {
    id: string;
    name: string;
    price: string;
    quantity: number;
};

const CheckoutPage = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
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

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2);
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
        <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Checkout</h2>
            {cart.length === 0 ? (
                <div className="text-center bg-white p-8 rounded-lg shadow-lg">
                    <FaShoppingCart className="mx-auto text-6xl text-gray-400 mb-4" />
                    <p className="text-2xl mb-6 text-gray-600">Your cart is empty.</p>
                    <a href="/" className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition duration-300 text-lg font-semibold">
                        Continue Shopping
                    </a>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Customer Information</h3>
                        <div className="space-y-4">
                            {Object.entries(customer).map(([key, value]) => (
                                <div key={key}>
                                    <label className="block text-gray-700 mb-2 capitalize">{key}</label>
                                    <input
                                        type={key === 'email' ? 'email' : 'text'}
                                        name={key}
                                        value={value}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                        required
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Order Summary</h3>
                            {cart.map((item, index) => (
                                <div key={index} className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0 last:mb-0">
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                                    </div>
                                    <p className="text-lg font-semibold text-gray-800">${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                            <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
                                <span className="text-2xl font-bold text-gray-800">Total</span>
                                <span className="text-2xl font-bold text-blue-600">${calculateTotal()}</span>
                            </div>
                        </div>
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        <button
                            className="w-full bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300 text-lg font-semibold flex items-center justify-center"
                            onClick={handleCheckout}
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="spinner mr-2"></div>
                            ) : (
                                <FaLock className="mr-2" />
                            )}
                            {loading ? 'Processing...' : 'Secure Checkout'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;