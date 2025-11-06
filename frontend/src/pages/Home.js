import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ShoppingBag, Clock, Heart, Truck, ArrowRight } from 'lucide-react';
import { categories, promotions } from '../mockData';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Early Morning Delivery',
      description: 'Get fresh products delivered before sunrise',
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Free Delivery',
      description: 'On orders above ₹499',
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Give Back',
      description: 'Support local communities with every order',
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: 'Fresh Quality',
      description: 'Sourced directly from trusted suppliers',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <Badge className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1">
                Daily Essentials Delivered
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Fresh Groceries
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">
                  Delivered Daily
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Experience the convenience of early morning delivery. Fresh milk, vegetables, and daily essentials at your doorstep before you wake up.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  size="lg"
                  onClick={() => navigate('/shop')}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Start Shopping
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/zone')}
                  className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-6 text-lg"
                >
                  Explore Zone
                </Button>
              </div>
            </div>
            <div className="relative lg:h-[500px] hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl transform rotate-3 opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800"
                alt="Fresh Groceries"
                className="relative rounded-3xl shadow-2xl object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Promotions Banner */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <Badge className="bg-white text-orange-600 hover:bg-gray-100 font-bold">
                Limited Offer
              </Badge>
              <p className="text-lg font-medium">
                {promotions[0]?.title} - Use code <span className="font-bold">{promotions[0]?.code}</span>
              </p>
            </div>
            <Button
              variant="secondary"
              onClick={() => navigate('/shop')}
              className="bg-white text-orange-600 hover:bg-gray-100"
            >
              Shop Now
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600">Browse through our wide range of fresh products</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-green-500"
                onClick={() => navigate(`/shop?category=${category.id}`)}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <p className="text-sm font-medium text-gray-700">{category.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose FreshZone?</h2>
            <p className="text-lg text-gray-600">More than just a grocery delivery app</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience Fresh Delivery?
          </h2>
          <p className="text-xl text-green-50 mb-8">
            Join thousands of happy customers who trust FreshZone for their daily essentials
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/shop')}
            className="bg-white text-green-600 hover:bg-gray-100 px-10 py-6 text-lg shadow-xl"
          >
            Start Shopping Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
