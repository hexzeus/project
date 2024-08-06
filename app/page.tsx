"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

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
    <div>
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="p-2 border border-gray-300 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 border border-gray-300 rounded"
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
      <h2 className="text-2xl font-bold mb-6">Products</h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card">
              <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded" />
              <h3 className="text-xl mt-4">{product.name}</h3>
              <p className="text-gray-600 mt-2">${product.price}</p>
              <Link href={`/product/${product.id}`} legacyBehavior>
                <a className="block mt-4 text-blue-600">
                  View Details
                </a>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
