"use client";

import { Inter } from 'next/font/google';
import Link from 'next/link';
import { FaHome, FaHeart, FaShoppingCart, FaGithub, FaTwitter, FaInstagram, FaBars } from 'react-icons/fa';
import './globals.css';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

const Logo = () => (
  <div className="text-3xl font-bold text-green-500 tracking-wider">
    <span className="text-4xl">IVES</span>
    <span className="text-green-400">_</span>
    <span className="text-4xl">HUB</span>
  </div>
);

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { href: '/', icon: FaHome, label: 'Home' },
    { href: '/wishlist', icon: FaHeart, label: 'Wishlist' },
    { href: '/cart', icon: FaShoppingCart, label: 'Cart' },
  ];

  return (
    <>
      <button className="md:hidden text-green-500" onClick={toggleMenu}>
        <FaBars className="text-2xl" />
      </button>
      <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-full left-0 right-0 bg-black md:bg-transparent border-b border-green-500 md:border-none md:space-x-8 p-4 md:p-0`}>
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href} className="group flex items-center md:flex-col py-2 md:py-0 hover:text-green-400 transition duration-300">
            <Icon className="text-xl md:mb-1 mr-2 md:mr-0 group-hover:animate-pulse" />
            <span className="text-sm md:text-xs uppercase tracking-wider">{label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen bg-black text-green-500`}>
        <header className="border-b border-green-500 sticky top-0 bg-black z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="hover:opacity-80 transition duration-300">
                <Logo />
              </Link>
              <Navigation />
            </div>
          </div>
        </header>
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-green-500 bg-gray-900">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0 text-center md:text-left">
                <Logo />
                <p className="text-green-700 mt-2 text-sm">Your cyberpunk portal to digital merchandise</p>
              </div>
              <div className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-6">
                {['About', 'Contact', 'Terms', 'Privacy'].map((item) => (
                  <a key={item} href="#" className="hover:text-green-400 transition duration-300 text-sm uppercase tracking-wider my-1">
                    {item}
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-8 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 text-green-700 text-sm">
              <p>&copy; {new Date().getFullYear()} IVES_HUB</p>
              <span className="hidden md:inline">|</span>
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