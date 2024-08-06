"use client";

import useWishlistState from '../hooks/useWishlistState';
import Image from 'next/image';

const WishlistPage = () => {
    const { wishlist, removeFromWishlist } = useWishlistState();

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
            {wishlist.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {wishlist.map((item, index) => (
                        <div key={index} className="card">
                            <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                            <Image src={item.image} alt={item.name} width={500} height={500} className="w-full h-64 object-cover rounded mb-2" />
                            <p className="text-gray-600 mb-2">${item.price}</p>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={() => removeFromWishlist(item)}
                            >
                                Remove from Wishlist
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;