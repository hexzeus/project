"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

type Product = {
    id: string;
    name: string;
    image: string;
    price: string;
    description: string;
};

const ProductPage = () => {
    const { id } = useParams() as { id: string };
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [cartCount, setCartCount] = useState(0);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        if (id) {
            console.log(`Fetching product with ID: ${id}`);
            const fetchProduct = async () => {
                try {
                    const { data } = await axios.get(`/api/products/${id}`);
                    setProduct(data);
                } catch (error) {
                    console.error('Error fetching product:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchProduct();
        }

        // Initialize cart count
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartCount(cart.length);
    }, [id]);

    const addToCart = (product: Product) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        setCartCount(cart.length);
        setAddedToCart(true);

        setTimeout(() => {
            setAddedToCart(false);
        }, 2000);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="card">
                <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded" />
                <p className="text-gray-600 mt-4">${product.price}</p>
                <p className="mt-4">{product.description}</p>
                <button
                    className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded transition-transform transform ${addedToCart ? 'scale-105' : ''}`}
                    onClick={() => addToCart(product)}
                >
                    {addedToCart ? 'Added to Cart' : 'Add to Cart'}
                </button>
            </div>
            <div className="mt-4 text-right">
                <span className="bg-blue-500 text-white px-4 py-2 rounded-full">
                    Cart: {cartCount}
                </span>
            </div>
        </div>
    );
};

export default ProductPage;
