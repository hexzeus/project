"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import { FaSearch, FaFilter } from 'react-icons/fa';

type Product = {
  id: string;
  name: string;
  image: string;
  price: string;
  category: string;
};

const categories = ["All", "T-Shirts", "Hats", "Accessories"];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    setFilteredProducts(filtered);
  }, [search, selectedCategory, products]);

  return (
    <div className="min-h-screen bg-black text-green-400">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-green-500 glitch-text tracking-wider font-matrix">
          IVES HUB MERCH
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="relative w-full md:w-1/2 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-3 pl-10 pr-4 border border-green-500 rounded-full bg-gray-900 text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
          </div>

          <div className="relative w-full md:w-auto">
            <select
              className="w-full md:w-auto appearance-none p-3 pl-10 pr-8 border border-green-500 rounded-full bg-gray-900 text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="spinner border-t-4 border-green-500 rounded-full w-12 h-12 animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-gray-900 rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-green-500/50">
                <div className="relative h-64">
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition duration-300 ease-in-out transform hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-green-400">{product.name}</h3>
                  <p className="text-green-300 mb-4">${product.price}</p>
                  <Link
                    href={`/product/${product.id}`}
                    className="inline-block bg-green-600 text-black px-4 py-2 rounded-full hover:bg-green-500 transition duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center text-green-400 mt-8">
            <p className="text-2xl mb-4">No products found</p>
            <p>Try adjusting your search or filter to find what you&apos;re looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
}