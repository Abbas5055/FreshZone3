import React from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Profile</h1>

        <div className="space-y-6">
          {/* Personal Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-green-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Full Name</label>
                  <p className="font-medium text-gray-900">{user?.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  <p className="font-medium text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    Phone
                  </label>
                  <p className="font-medium text-gray-900">{user?.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Addresses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" />
                Saved Addresses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {user?.addresses.map(address => (
                <div
                  key={address.id}
                  className="p-4 border rounded-lg hover:border-green-500 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-semibold text-gray-900">{address.label}</span>
                    {address.isDefault && (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        Default
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">
                    {address.line1}<br />
                    {address.line2}<br />
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
