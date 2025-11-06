import React, { useState } from 'react';
import { Lightbulb, MessageSquare, Heart, ThumbsUp, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Textarea } from '../components/ui/textarea';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { toast } from '../hooks/use-toast';

const Zone = () => {
  const [feedback, setFeedback] = useState('');
  const [featureIdea, setFeatureIdea] = useState('');

  const upcomingFeatures = [
    {
      id: 1,
      title: 'Recipe Suggestions',
      description: 'Get personalized recipe ideas based on your cart items',
      votes: 234,
      status: 'In Development',
    },
    {
      id: 2,
      title: 'Subscription Plans',
      description: 'Subscribe to daily essentials with automatic delivery',
      votes: 189,
      status: 'Planning',
    },
    {
      id: 3,
      title: 'Voice Ordering',
      description: 'Order groceries using voice commands',
      votes: 156,
      status: 'Beta Testing',
    },
    {
      id: 4,
      title: 'Referral Rewards',
      description: 'Earn rewards by referring friends to FreshZone',
      votes: 142,
      status: 'Planning',
    },
  ];

  const charityProjects = [
    {
      id: 1,
      title: 'Farmer Support Program',
      description: 'Providing resources and training to local farmers for sustainable farming',
      raised: 45000,
      goal: 100000,
      supporters: 523,
    },
    {
      id: 2,
      title: 'Zero Hunger Initiative',
      description: 'Distributing surplus food to homeless shelters and community kitchens',
      raised: 78000,
      goal: 150000,
      supporters: 891,
    },
    {
      id: 3,
      title: 'Delivery Partner Welfare',
      description: 'Health insurance and education support for delivery partners',
      raised: 62000,
      goal: 120000,
      supporters: 734,
    },
  ];

  const handleVote = (featureId) => {
    toast({
      title: 'Vote recorded!',
      description: 'Thank you for your input. We\'ll consider this feature.',
    });
  };

  const handleSubmitFeedback = () => {
    if (feedback.trim()) {
      toast({
        title: 'Feedback submitted!',
        description: 'Thank you for helping us improve FreshZone.',
      });
      setFeedback('');
    }
  };

  const handleSubmitIdea = () => {
    if (featureIdea.trim()) {
      toast({
        title: 'Feature idea submitted!',
        description: 'Our team will review your suggestion.',
      });
      setFeatureIdea('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-4">
            <Lightbulb className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Innovation Zone</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Shape the future of FreshZone! Preview upcoming features, share feedback, and support community initiatives.
          </p>
        </div>

        <Tabs defaultValue="features" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="charity">Community</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          {/* Upcoming Features */}
          <TabsContent value="features" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Upcoming Features</h2>
              <p className="text-gray-600">Vote for features you\'d like to see next</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {upcomingFeatures.map(feature => (
                <Card key={feature.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <Badge
                        className={
                          feature.status === 'In Development'
                            ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                            : feature.status === 'Beta Testing'
                            ? 'bg-green-100 text-green-700 hover:bg-green-100'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                        }
                      >
                        {feature.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{feature.votes} votes</span>
                      <Button
                        onClick={() => handleVote(feature.id)}
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                      >
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Vote
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Submit Feature Idea */}
            <Card className="bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-orange-600" />
                  Suggest a Feature
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Tell us about your feature idea..."
                  value={featureIdea}
                  onChange={(e) => setFeatureIdea(e.target.value)}
                  rows={4}
                />
                <Button
                  onClick={handleSubmitIdea}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Idea
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community Projects */}
          <TabsContent value="charity" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Community Projects</h2>
              <p className="text-gray-600">Support initiatives that make a difference</p>
            </div>

            <div className="space-y-6">
              {charityProjects.map(project => {
                const progress = (project.raised / project.goal) * 100;
                return (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-green-600" />
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600">{project.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-gray-900">
                            ₹{project.raised.toLocaleString()} raised
                          </span>
                          <span className="text-gray-500">
                            Goal: ₹{project.goal.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500">
                          {project.supporters} supporters
                        </p>
                      </div>

                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        <Heart className="w-4 h-4 mr-2" />
                        Support This Project
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Feedback Form */}
          <TabsContent value="feedback" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Share Your Feedback</h2>
              <p className="text-gray-600">Help us improve your FreshZone experience</p>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                  Your Feedback Matters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What can we improve?
                  </label>
                  <Textarea
                    placeholder="Share your thoughts, suggestions, or report issues..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={6}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name (Optional)
                    </label>
                    <Input placeholder="Enter your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email (Optional)
                    </label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                </div>

                <Button
                  onClick={handleSubmitFeedback}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Submit Feedback
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Zone;
