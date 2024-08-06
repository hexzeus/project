import Link from 'next/link';
import useWishlistState from '../hooks/useWishlistState';
import useSnipcartCount from '../hooks/useSnipcartCount';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { wishlist } = useWishlistState();
    const cartCount = useSnipcartCount();

    return (
        <div>
            <header>
                <nav>
                    <Link href="/">Home</Link>
                    <Link href="/wishlist">Wishlist ({wishlist.length})</Link>
                    <Link href="/cart">Cart ({cartCount})</Link>
                </nav>
            </header>
            <main>{children}</main>
            <footer>
                <p>&copy; 2024 Your Store</p>
            </footer>
        </div>
    );
};

export default Layout;
