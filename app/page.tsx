"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';

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
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="p-2 border border-gray-700 rounded bg-gray-700 text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 border border-gray-700 rounded bg-gray-700 text-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-100">Our Products</h2>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card bg-gray-900 text-white transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <Image src={product.image} alt={product.name} width={500} height={500} className="w-full h-64 object-cover rounded" />
              <div className="p-4">
                <h3 className="text-xl mt-4 font-semibold">{product.name}</h3>
                <p className="text-gray-400 mt-2">${product.price}</p>
                <Link href={`/product/${product.id}`} className="block mt-4 text-blue-500 hover:underline">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}