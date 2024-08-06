import { useState, useEffect } from 'react';

const useSnipcartCount = () => {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const updateCartCount = () => {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            setCartCount(cart.length);
        };

        updateCartCount();
        window.addEventListener('storage', updateCartCount);

        return () => {
            window.removeEventListener('storage', updateCartCount);
        };
    }, []);

    return cartCount;
};

export default useSnipcartCount;
