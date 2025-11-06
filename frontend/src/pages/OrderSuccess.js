import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, Package, Home, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center py-12 px-4">
      <Card className="max-w-md w-full shadow-2xl border-2">
        <CardContent className="pt-12 pb-8 text-center space-y-6">
          {/* Success Icon */}
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          {/* Success Message */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Order Placed Successfully!</h1>
            <p className="text-gray-600">Thank you for shopping with FreshZone</p>
          </div>

          {/* Order ID */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Order ID</p>
            <p className="text-lg font-mono font-bold text-gray-900">{orderId}</p>
          </div>

          {/* Order Details */}
          <div className="text-left bg-green-50 rounded-lg p-4 space-y-2">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Order Confirmed</p>
                <p className="text-sm text-gray-600">We\'re preparing your items</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Expected Delivery</p>
                <p className="text-sm text-gray-600">Your selected time slot</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={() => navigate('/orders')}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
            >
              <Package className="w-5 h-5 mr-2" />
              Track Order
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="w-full py-6 text-lg"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </div>

          {/* Additional Info */}
          <p className="text-xs text-gray-500 pt-4">
            A confirmation email has been sent to your registered email address
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSuccess;
