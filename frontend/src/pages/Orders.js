import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { mockOrders } from '../mockData';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Load orders from localStorage (mock + new orders)
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const allOrders = [...mockOrders, ...storedOrders];
    setOrders(allOrders);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'out_for_delivery':
        return <Truck className="w-5 h-5 text-blue-600" />;
      case 'packed':
        return <Package className="w-5 h-5 text-orange-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      delivered: 'bg-green-100 text-green-700 hover:bg-green-100',
      out_for_delivery: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
      packed: 'bg-orange-100 text-orange-700 hover:bg-orange-100',
      confirmed: 'bg-purple-100 text-purple-700 hover:bg-purple-100',
      placed: 'bg-gray-100 text-gray-700 hover:bg-gray-100',
    };

    const labels = {
      delivered: 'Delivered',
      out_for_delivery: 'Out for Delivery',
      packed: 'Packed',
      confirmed: 'Confirmed',
      placed: 'Placed',
    };

    return (
      <Badge className={variants[status] || variants.placed}>
        {labels[status] || status}
      </Badge>
    );
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <Package className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">No orders yet</h2>
          <p className="text-gray-600">Start shopping to place your first order!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Orders</h1>

        <div className="space-y-6">
          {orders.map(order => (
            <Card key={order.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(order.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  {getStatusBadge(order.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Delivery Info */}
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-900">Delivery Address</p>
                    <p className="text-gray-600 mt-1">
                      {order.address?.line1}, {order.address?.city}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Delivery Slot</p>
                    <p className="text-gray-600 mt-1">{order.deliverySlot}</p>
                  </div>
                </div>

                <Separator />

                {/* Timeline */}
                {order.timeline && (
                  <div className="space-y-3">
                    <p className="font-medium text-gray-900">Order Timeline</p>
                    <div className="space-y-3">
                      {order.timeline.map((event, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          {getStatusIcon(event.status)}
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{event.message}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(event.timestamp).toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Separator />

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Total Amount</span>
                  <span className="text-2xl font-bold text-green-600">
                    ₹{order.totalAmount}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
