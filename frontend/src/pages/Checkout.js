import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Heart, DollarSign, CreditCard } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Separator } from '../components/ui/separator';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { deliverySlots, charityProjects } from '../mockData';
import { toast } from '../hooks/use-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [selectedAddress, setSelectedAddress] = useState(user?.addresses[0]?.id || '');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [donation, setDonation] = useState(0);
  const [tip, setTip] = useState(0);
  const [selectedCharity, setSelectedCharity] = useState('');

  const subtotal = getCartTotal();
  const deliveryFee = subtotal >= 499 ? 0 : 40;
  const total = subtotal + deliveryFee + donation + tip;

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      toast({ title: 'Please select a delivery address', variant: 'destructive' });
      return;
    }
    if (!selectedSlot) {
      toast({ title: 'Please select a delivery slot', variant: 'destructive' });
      return;
    }

    // Mock Razorpay payment
    const mockOrder = {
      id: 'order_' + Date.now(),
      amount: total,
      items: cartItems,
      address: user.addresses.find(a => a.id === selectedAddress),
      slot: deliverySlots.find(s => s.id === selectedSlot)?.time,
      donation,
      tip,
      charity: selectedCharity,
    };

    // Store order in localStorage (mock)
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(mockOrder);
    localStorage.setItem('orders', JSON.stringify(orders));

    clearCart();
    toast({ title: 'Order placed successfully!', description: 'Your order is being processed' });
    navigate(`/order-success/${mockOrder.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-600" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                  {user?.addresses.map(addr => (
                    <div key={addr.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:border-green-500 transition-colors">
                      <RadioGroupItem value={addr.id} id={addr.id} />
                      <Label htmlFor={addr.id} className="flex-1 cursor-pointer">
                        <div className="font-semibold text-gray-900">{addr.label}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {addr.line1}, {addr.line2}<br />
                          {addr.city}, {addr.state} - {addr.pincode}
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Delivery Slot */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  Select Delivery Slot
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedSlot} onValueChange={setSelectedSlot}>
                  <div className="grid md:grid-cols-2 gap-3">
                    {deliverySlots.map(slot => (
                      <div
                        key={slot.id}
                        className={`flex items-center space-x-3 p-4 border rounded-lg transition-colors ${
                          slot.available ? 'hover:border-green-500 cursor-pointer' : 'opacity-50 cursor-not-allowed'
                        }`}
                      >
                        <RadioGroupItem value={slot.id} id={slot.id} disabled={!slot.available} />
                        <Label htmlFor={slot.id} className="flex-1 cursor-pointer">
                          <div className="font-medium text-gray-900">{slot.time}</div>
                          {!slot.available && (
                            <div className="text-xs text-red-600">Not Available</div>
                          )}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Charity Donation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-green-600" />
                  Support Community (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  {charityProjects.map(project => (
                    <div
                      key={project.id}
                      onClick={() => setSelectedCharity(project.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedCharity === project.id ? 'border-green-500 bg-green-50' : 'hover:border-green-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">{project.icon}</div>
                      <div className="font-semibold text-sm text-gray-900">{project.title}</div>
                      <div className="text-xs text-gray-600 mt-1">{project.description}</div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label>Donation Amount</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={donation || ''}
                      onChange={(e) => setDonation(parseFloat(e.target.value) || 0)}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex-1">
                    <Label>Delivery Partner Tip</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={tip || ''}
                      onChange={(e) => setTip(parseFloat(e.target.value) || 0)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {cartItems.map(item => (
                      <div key={item.productId} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.product.name} × {item.quantity}
                        </span>
                        <span className="font-medium">₹{item.product.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                  </div>
                  {donation > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Donation</span>
                      <span>₹{donation.toFixed(2)}</span>
                    </div>
                  )}
                  {tip > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Tip</span>
                      <span>₹{tip.toFixed(2)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handlePlaceOrder}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
                >
                  <CreditCard className="mr-2 w-5 h-5" />
                  Place Order & Pay
                </Button>

                <div className="text-xs text-center text-gray-500">
                  By placing order, you agree to our terms and conditions
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
