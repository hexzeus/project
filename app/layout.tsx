import { Inter } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import { FaHome, FaHeart, FaShoppingCart, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'IVES_HUB STORE',
  description: 'Custom frontend for Printful - Your cyberpunk portal for digital merchandise',
};

const Logo = () => (
  <svg width="200" height="50" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 25L30 5L50 25L70 5L90 25L110 5L130 25L150 5L170 25L190 5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <text x="50%" y="70%" dominantBaseline="middle" textAnchor="middle" fill="#10B981" fontSize="24" fontWeight="bold" fontFamily="monospace">IVES_HUB</text>
  </svg>
);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen bg-black text-green-500`}>
        <header className="border-b border-green-500">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <Link href="/" className="hover:opacity-80 transition duration-300">
                <Logo />
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
                <Logo />
                <p className="text-green-700 mt-2">Your cyberpunk portal to digital merchandise</p>
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
              <div className="flex space-x-4">
                {[FaGithub, FaTwitter, FaInstagram].map((Icon, index) => (
                  <a key={index} href="#" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition duration-300">
                    <Icon className="text-xl" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}