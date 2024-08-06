import { Inter } from 'next/font/google';
import Link from 'next/link';
import { FaHome, FaHeart, FaShoppingCart, FaGithub } from 'react-icons/fa';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'IVES_HUB STORE',
  description: 'Custom frontend for Printful - Your one-stop shop for custom prints and merchandise',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen bg-black text-green-500`}>
        <header className="border-b border-green-500">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-3xl font-bold tracking-wider hover:text-green-400 transition duration-300">
                IVES_HUB
              </Link>
              <nav className="flex space-x-8">
                {[
                  { href: '/', icon: FaHome, label: 'Home' },
                  { href: '/wishlist', icon: FaHeart, label: 'Wishlist' },
                  { href: '/cart', icon: FaShoppingCart, label: 'Cart' },
                ].map(({ href, icon: Icon, label }) => (
                  <Link key={href} href={href} className="group flex flex-col items-center hover:text-green-400 transition duration-300">
                    <Icon className="text-xl mb-1 group-hover:animate-pulse" />
                    <span className="text-xs uppercase tracking-wider">{label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="border-t border-green-500">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">IVES_HUB MERCH</h2>
                <p className="text-green-700">Your portal to custom digital merchandise</p>
              </div>
              <div className="flex space-x-6">
                {['About', 'Contact', 'Terms', 'Privacy'].map((item) => (
                  <a key={item} href="#" className="hover:text-green-400 transition duration-300 text-sm uppercase tracking-wider">
                    {item}
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-8 flex justify-center items-center space-x-4 text-green-700">
              <p>&copy; {new Date().getFullYear()} IVES_HUB</p>
              <span>|</span>
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition duration-300">
                <FaGithub className="text-xl" />
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}