"use client";

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import useWishlistState from '../../hooks/useWishlistState';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaShoppingCart, FaHeart, FaShare } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Product = {
    id: string;
    name: string;
    image: string;
    price: string;
    description: string;
    category?: string;
};

const ProductPage = () => {
    const { id } = useParams() as { id: string };
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [cartCount, setCartCount] = useState(0);
    const { wishlist, addToWishlist, removeFromWishlist } = useWishlistState();
    const [inWishlist, setInWishlist] = useState(false);

    const fetchProduct = useCallback(async () => {
        if (!id) return;
        try {
            const { data } = await axios.get(`/api/products/${id}`);
            setProduct(data);
            setInWishlist(wishlist.some(item => item.id === data.id));
        } catch (error) {
            console.error('Error fetching product:', error);
            toast.error('Failed to load product. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [id, wishlist]);

    useEffect(() => {
        fetchProduct();
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartCount(cart.length);
    }, [fetchProduct]);

    const addToCart = useCallback((product: Product) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        setCartCount(cart.length);
        toast.success('Added to cart!');
    }, []);

    const handleWishlist = useCallback(() => {
        if (!product) return;
        if (inWishlist) {
            removeFromWishlist(product);
            toast.info('Removed from wishlist');
        } else {
            addToWishlist(product);
            toast.success('Added to wishlist!');
        }
        setInWishlist(!inWishlist);
    }, [product, inWishlist, addToWishlist, removeFromWishlist]);

    const shareProduct = useCallback(() => {
        if (navigator.share) {
            navigator.share({
                title: product?.name,
                text: product?.description,
                url: window.location.href,
            }).then(() => {
                toast.success('Shared successfully!');
            }).catch(console.error);
        } else {
            toast.info('Sharing is not supported on this device');
        }
    }, [product]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-black">
                <div className="spinner border-t-4 border-green-500 rounded-full w-12 h-12 animate-spin"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-black text-green-500">
                <h2 className="text-2xl font-bold mb-4">Product not found</h2>
                <Link href="/" className="text-blue-400 hover:text-blue-300 transition duration-300">
                    Return to homepage
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black py-6 px-4 sm:px-6 lg:px-8">
            <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="max-w-7xl mx-auto">
                <button
                    className="flex items-center text-green-500 hover:text-green-400 mb-4 transition duration-300"
                    onClick={() => router.push('/')}
                >
                    <FaArrowLeft className="mr-2" />
                    Back
                </button>
                <div className="bg-gray-900 shadow-xl rounded-lg overflow-hidden border border-green-500">
                    <div className="md:flex">
                        <div className="md:flex-shrink-0">
                            <div className="relative h-64 w-full md:h-96 md:w-96">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                                />
                            </div>
                        </div>
                        <div className="p-6 md:p-8">
                            {product.category && (
                                <div className="uppercase tracking-wide text-sm text-blue-400 font-semibold">
                                    {product.category}
                                </div>
                            )}
                            <h2 className="mt-2 text-2xl md:text-3xl leading-8 font-extrabold tracking-tight text-green-500 sm:text-4xl">
                                {product.name}
                            </h2>
                            <p className="mt-4 text-xl text-green-400">${product.price}</p>
                            <p className="mt-4 text-gray-300 text-sm md:text-base">{product.description}</p>
                            <div className="mt-6 flex flex-wrap items-center gap-4">
                                <button
                                    className="flex-grow md:flex-grow-0 flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-green-500 hover:bg-green-400 transition duration-300"
                                    onClick={() => addToCart(product)}
                                >
                                    <FaShoppingCart className="mr-2" />
                                    Add to Cart
                                </button>
                                <button
                                    className={`flex-grow md:flex-grow-0 flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md ${inWishlist ? 'text-red-500 bg-gray-800 hover:bg-gray-700' : 'text-gray-300 bg-gray-800 hover:bg-gray-700'} transition duration-300`}
                                    onClick={handleWishlist}
                                >
                                    <FaHeart className={`mr-2 ${inWishlist ? 'text-red-500' : 'text-gray-400'}`} />
                                    {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                                </button>
                                <button
                                    className="flex-grow md:flex-grow-0 flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 transition duration-300"
                                    onClick={shareProduct}
                                >
                                    <FaShare className="mr-2" />
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex justify-between md:justify-end space-x-4">
                    <Link href="/cart">
                        <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-green-500 hover:bg-green-400 transition duration-300">
                            <FaShoppingCart className="mr-2" />
                            Cart: {cartCount}
                        </span>
                    </Link>
                    <Link href="/wishlist">
                        <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-blue-500 hover:bg-blue-400 transition duration-300">
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