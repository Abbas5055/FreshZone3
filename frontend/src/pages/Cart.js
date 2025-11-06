import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = getCartTotal();
  const deliveryFee = subtotal >= 499 ? 0 : 40;
  const total = subtotal - discount + deliveryFee;

  const applyPromoCode = () => {
    if (promoCode === 'FRESH20' && subtotal >= 299) {
      setDiscount(subtotal * 0.2);
    } else if (promoCode === 'FREEDEL' && subtotal >= 499) {
      // Already free delivery
      setDiscount(0);
    } else {
      alert('Invalid promo code or minimum order not met');
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Your cart is empty</h2>
          <p className="text-gray-600">Add some fresh products to get started!</p>
          <Button
            onClick={() => navigate('/shop')}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <Card key={item.productId} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900">{item.product.name}</h3>
                      <p className="text-sm text-gray-500">{item.product.unit}</p>
                      <p className="text-xl font-bold text-green-600 mt-2">
                        ₹{item.product.price} × {item.quantity} = ₹{item.product.price * item.quantity}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-4">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeFromCart(item.productId)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                      <div className="flex items-center gap-2 bg-gray-100 rounded-lg">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="h-8 w-8"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="h-8 w-8"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button
              variant="outline"
              onClick={clearCart}
              className="w-full border-red-200 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Cart
            </Button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Promo Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <Button onClick={applyPromoCode} variant="outline">
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">Try: FRESH20 or FREEDEL</p>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                <Button
                  variant="outline"
                  onClick={() => navigate('/shop')}
                  className="w-full"
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
