import { useState, useEffect } from 'react';

const useWishlistState = () => {
    const [wishlist, setWishlist] = useState<any[]>([]);

    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setWishlist(storedWishlist);
    }, []);

    const addToWishlist = (item: any) => {
        const updatedWishlist = [...wishlist, item];
        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };

    const removeFromWishlist = (item: any) => {
        const updatedWishlist = wishlist.filter(i => i.id !== item.id);
        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };

    return { wishlist, addToWishlist, removeFromWishlist };
};

export default useWishlistState;
