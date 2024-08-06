"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import useWishlistState from '../../hooks/useWishlistState';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaShoppingCart, FaHeart } from 'react-icons/fa';

type Product = {
    id: string;
    name: string;
    image: string;
    price: string;
    description: string;
    category?: string; // Make category optional
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
            const fetchProduct = async () => {
                try {
                    const { data } = await axios.get(`/api/products/${id}`);
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
            <div className="flex justify-center items-center h-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Product not found</h2>
                <Link href="/" className="text-blue-600 hover:underline">
                    Return to homepage
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <button
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition duration-300"
                    onClick={() => router.push('/')}
                >
                    <FaArrowLeft className="mr-2" />
                    Back to Products
                </button>
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="md:flex">
                        <div className="md:flex-shrink-0">
                            <div className="relative h-96 w-full md:w-96">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                                />
                            </div>
                        </div>
                        <div className="p-8">
                            {product.category && (
                                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                                    {product.category}
                                </div>
                            )}
                            <h2 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                {product.name}
                            </h2>
                            <p className="mt-4 text-xl text-gray-500">${product.price}</p>
                            <p className="mt-4 text-gray-500">{product.description}</p>
                            <div className="mt-6 flex items-center space-x-4">
                                <button
                                    className={`flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition duration-300 ${addedToCart ? 'scale-105' : ''}`}
                                    onClick={() => addToCart(product)}
                                >
                                    <FaShoppingCart className="mr-2" />
                                    {addedToCart ? 'Added to Cart' : 'Add to Cart'}
                                </button>
                                <button
                                    className={`flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md ${inWishlist ? 'text-red-600 bg-red-100 hover:bg-red-200' : 'text-gray-700 bg-gray-100 hover:bg-gray-200'} md:py-4 md:text-lg md:px-10 transition duration-300`}
                                    onClick={handleWishlist}
                                >
                                    <FaHeart className={`mr-2 ${inWishlist ? 'text-red-600' : 'text-gray-400'}`} />
                                    {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex justify-end space-x-4">
                    <Link href="/cart">
                        <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                            <FaShoppingCart className="mr-2" />
                            Cart: {cartCount}
                        </span>
                    </Link>
                    <Link href="/wishlist">
                        <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700">
                            <FaHeart className="mr-2" />
                            Wishlist: {wishlist.length}
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;