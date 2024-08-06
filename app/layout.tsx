import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Printful Store',
  description: 'Custom frontend for Printful',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="py-6 bg-gray-100 text-center">
          <h1>My Printful Store</h1>
          <nav className="mt-4">
            <Link href="/" className="mr-4">
              Home
            </Link>
            <Link href="/cart">
              Cart
            </Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="py-6 bg-gray-100 text-center">
          <p>&copy; 2024 My Printful Store</p>
        </footer>
      </body>
    </html>
  );
}
