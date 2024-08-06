"use client";

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import { FaSearch, FaFilter, FaStar, FaTags } from 'react-icons/fa';

type Variant = {
  id: string;
  color: string;
  size: string;
  stock: number;
};

type Product = {
  id: string;
  name: string;
  image: string;
  price: string;
  category: string;
  variants?: Variant[];
  rating?: number;
  reviewCount?: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
};

const categories = ["All", "T-Shirts", "Hoodies", "Hats", "Accessories"];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/products');
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    switch (sortBy) {
      case 'priceLowToHigh':
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'priceHighToLow':
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'bestSelling':
        filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      case 'newArrivals':
        filtered.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
    }

    setFilteredProducts(filtered);
  }, [search, selectedCategory, products, sortBy]);

  return (
    <div className="min-h-screen bg-black text-green-400">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-green-500 glitch-container">
          <span className="glitch" data-text="IVES HUB MERCH">IVES HUB MERCH</span>
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-3 pl-10 pr-4 border border-green-500 rounded-full bg-gray-900 text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
          </div>

          <div className="flex space-x-4 w-full md:w-2/3 justify-end">
            <div className="relative w-full md:w-auto">
              <select
                className="w-full md:w-auto appearance-none p-3 pl-10 pr-8 border border-green-500 rounded-full bg-gray-900 text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
            </div>

            <div className="relative w-full md:w-auto">
              <select
                className="w-full md:w-auto appearance-none p-3 pl-10 pr-8 border border-green-500 rounded-full bg-gray-900 text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="bestSelling">Best Selling</option>
                <option value="newArrivals">New Arrivals</option>
              </select>
              <FaTags className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="spinner border-t-4 border-green-500 rounded-full w-12 h-12 animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-gray-900 rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-green-500/50">
                <div className="relative h-48 md:h-64">
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition duration-300 ease-in-out transform hover:scale-110"
                  />
                  {product.isNewArrival && (
                    <span className="absolute top-2 left-2 bg-green-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                      New
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                      Best Seller
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-green-400 truncate">{product.name}</h3>
                  <p className="text-green-300 mb-2">${product.price}</p>
                  <p className="text-green-500 mb-2 text-sm">{product.category}</p>
                  {(product.rating !== undefined && product.reviewCount !== undefined) && (
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-500 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < product.rating! ? "text-yellow-500" : "text-gray-500"} />
                        ))}
                      </div>
                      <span className="text-green-300 text-xs">({product.reviewCount})</span>
                    </div>
                  )}
                  <Link
                    href={`/product/${product.id}`}
                    className="inline-block w-full text-center bg-green-600 text-black px-4 py-2 rounded-full hover:bg-green-500 transition duration-300"
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