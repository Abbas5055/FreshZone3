import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { useCart } from '../context/CartContext';
import { toast } from '../hooks/use-toast';
import { products, categories } from '../mockData';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart, cartItems, updateQuantity } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const selectedCategory = searchParams.get('category') || 'all';

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  const getCartQuantity = (productId) => {
    const item = cartItems.find(i => i.productId === productId);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (productId) => {
    addToCart(productId, 1);
    toast({
      title: 'Added to cart',
      description: 'Product added to your cart successfully',
    });
  };

  const handleUpdateQuantity = (productId, delta) => {
    const currentQty = getCartQuantity(productId);
    const newQty = currentQty + delta;
    if (newQty >= 0) {
      updateQuantity(productId, newQty);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop Fresh Products</h1>
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-3">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSearchParams({})}
            className={selectedCategory === 'all' ? 'bg-green-600 hover:bg-green-700' : ''}
          >
            All Products
          </Button>
          {categories.map(cat => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? 'default' : 'outline'}
              onClick={() => setSearchParams({ category: cat.id })}
              className={selectedCategory === cat.id ? 'bg-green-600 hover:bg-green-700' : ''}
            >
              {cat.icon} {cat.name}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => {
            const cartQty = getCartQuantity(product.id);
            return (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-green-500">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.stock < 10 && (
                      <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
                        Low Stock
                      </Badge>
                    )}
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-[3rem]">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500">{product.unit}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
                      <Badge variant="secondary" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                    {cartQty > 0 ? (
                      <div className="flex items-center justify-between bg-green-50 rounded-lg p-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleUpdateQuantity(product.id, -1)}
                          className="h-8 w-8 text-green-600 hover:bg-green-100"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-bold text-green-600 text-lg">{cartQty}</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleUpdateQuantity(product.id, 1)}
                          className="h-8 w-8 text-green-600 hover:bg-green-100"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleAddToCart(product.id)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        disabled={product.stock === 0}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
