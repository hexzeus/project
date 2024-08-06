"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import useWishlistState from '../../hooks/useWishlistState';
import Link from 'next/link';
import Image from 'next/image';

type Product = {
    id: string;
    name: string;
    image: string;
    price: string;
    description: string;
};

const ProductPage = () => {
    const { id } = useParams() as { id: string };
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [cartCount, setCartCount] = useState(0);
    const [addedToCart, setAddedToCart] = useState(false);
    const { wishlist, addToWishlist, removeFromWishlist } = useWishlistState();
    const [inWishlist, setInWishlist] = useState(false);

    useEffect(() => {
        if (id) {
            console.log(`Fetching product with ID: ${id}`);
            const fetchProduct = async () => {
                try {
                    const { data } = await axios.get(`/api/products/${id}`);
                    console.log('Product data:', data);
                    setProduct(data);
                    setInWishlist(wishlist.some(item => item.id === data.id));
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
    }, [id, wishlist]);

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

    const handleWishlist = () => {
        if (inWishlist) {
            removeFromWishlist(product!);
        } else {
            addToWishlist(product!);
        }
        setInWishlist(!inWishlist);
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
            <button
                className="bg-gray-700 text-white px-4 py-2 rounded mb-4"
                onClick={() => router.push('/')}
            >
                Back to Products
            </button>
            <div className="card bg-gray-900 text-white">
                <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
                <div className="flex justify-center items-center mb-4">
                    <Image src={product.image} alt={product.name} width={500} height={500} className="max-w-full max-h-full object-contain rounded" />
                </div>
                <p className="text-gray-400 mt-4">${product.price}</p>
                <p className="mt-4">{product.description}</p>
                <div className="flex space-x-4">
                    <button
                        className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded transition-transform transform ${addedToCart ? 'scale-105' : ''}`}
                        onClick={() => addToCart(product)}
                    >
                        {addedToCart ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                    <button
                        className={`mt-4 bg-red-500 text-white px-4 py-2 rounded transition-transform transform ${inWishlist ? 'scale-105' : ''}`}
                        onClick={handleWishlist}
                    >
                        {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </button>
                </div>
            </div>
            <div className="mt-4 text-right">
                <Link href="/cart">
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full cursor-pointer">
                        Cart: {cartCount}
                    </span>
                </Link>
                <Link href="/wishlist">
                    <span className="bg-red-500 text-white px-4 py-2 rounded-full ml-2 cursor-pointer">
                        Wishlist: {wishlist.length}
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default ProductPage;