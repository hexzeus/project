import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'IVES_HUB STORE',
  description: 'Custom frontend for Printful',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="py-6 bg-gray-900 text-center text-white">
          <h1 className="text-3xl font-bold">IVES_HUB STORE</h1>
          <nav className="mt-4">
            <Link href="/" className="mr-4 hover:underline">
              Home
            </Link>
            <Link href="/wishlist" className="mr-4 hover:underline">
              Wishlist
            </Link>
            <Link href="/cart" className="hover:underline">
              Cart
            </Link>
          </nav>
        </header>
        <main className="bg-gray-800 text-white min-h-screen">{children}</main>
        <footer className="py-6 bg-gray-900 text-center text-white">
          <p>&copy; 2024 IVES_HUB STORE</p>
        </footer>
      </body>
    </html>
  );
}
