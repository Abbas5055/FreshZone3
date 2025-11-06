import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ShoppingCart, Users, TrendingUp, Plus, Edit, Trash2, LogOut, IndianRupee } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Textarea } from '../../components/ui/textarea';
import { toast } from '../../hooks/use-toast';
import { products as initialProducts, categories } from '../../mockData';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    unit: '',
    image: '',
    stock: '',
    description: '',
  });

  useEffect(() => {
    // Check admin auth
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }

    // Load products from localStorage or use initial
    const storedProducts = localStorage.getItem('adminProducts');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(initialProducts);
      localStorage.setItem('adminProducts', JSON.stringify(initialProducts));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const saveProducts = (updatedProducts) => {
    setProducts(updatedProducts);
    localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
  };

  const handleAddProduct = () => {
    if (!formData.name || !formData.category || !formData.price) {
      toast({ title: 'Please fill all required fields', variant: 'destructive' });
      return;
    }

    const newProduct = {
      id: 'prod_' + Date.now(),
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      unit: formData.unit || '1 unit',
      image: formData.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400',
      stock: parseInt(formData.stock) || 50,
      description: formData.description || '',
    };

    const updatedProducts = [...products, newProduct];
    saveProducts(updatedProducts);
    setIsAddDialogOpen(false);
    resetForm();
    toast({ title: 'Product added successfully!' });
  };

  const handleUpdateProduct = () => {
    if (!editingProduct) return;

    const updatedProducts = products.map(p =>
      p.id === editingProduct.id
        ? {
            ...p,
            name: formData.name,
            category: formData.category,
            price: parseFloat(formData.price),
            unit: formData.unit,
            image: formData.image,
            stock: parseInt(formData.stock),
            description: formData.description,
          }
        : p
    );

    saveProducts(updatedProducts);
    setEditingProduct(null);
    resetForm();
    toast({ title: 'Product updated successfully!' });
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(p => p.id !== productId);
      saveProducts(updatedProducts);
      toast({ title: 'Product deleted successfully!' });
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      unit: product.unit,
      image: product.image,
      stock: product.stock.toString(),
      description: product.description,
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      unit: '',
      image: '',
      stock: '',
      description: '',
    });
  };

  const stats = [
    { title: 'Total Products', value: products.length, icon: Package, color: 'bg-blue-500' },
    { title: 'Total Orders', value: '124', icon: ShoppingCart, color: 'bg-green-500' },
    { title: 'Total Users', value: '856', icon: Users, color: 'bg-purple-500' },
    { title: 'Revenue', value: '₹45,230', icon: TrendingUp, color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-orange-500" />
              <div>
                <h1 className="text-2xl font-bold">FreshZone Admin</h1>
                <p className="text-sm text-gray-400">Product Management Dashboard</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <Card key={idx}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Products Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Product Management</CardTitle>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700" onClick={resetForm}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>Fill in the product details below</DialogDescription>
                  </DialogHeader>
                  <ProductForm
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleAddProduct}
                    submitLabel="Add Product"
                  />
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price (₹)</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <img src={product.image} alt={product.name} className="w-12 h-12 rounded object-cover" />
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-500">{product.unit}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-gray-600">{product.category}</td>
                      <td className="px-4 py-4">
                        <span className="flex items-center font-semibold text-green-600">
                          <IndianRupee className="w-4 h-4" />
                          {product.price}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          product.stock > 20 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {product.stock} units
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditClick(product)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Edit Product</DialogTitle>
                                <DialogDescription>Update product details</DialogDescription>
                              </DialogHeader>
                              <ProductForm
                                formData={formData}
                                setFormData={setFormData}
                                onSubmit={handleUpdateProduct}
                                submitLabel="Update Product"
                              />
                            </DialogContent>
                          </Dialog>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ProductForm = ({ formData, setFormData, onSubmit, submitLabel }) => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Product Name *</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Fresh Tomatoes"
        />
      </div>

      <div>
        <Label>Category *</Label>
        <Select value={formData.category} onValueChange={(val) => setFormData({ ...formData, category: val })}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Price (₹) *</Label>
          <Input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="50"
          />
        </div>
        <div>
          <Label>Unit</Label>
          <Input
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            placeholder="e.g., 500g, 1L"
          />
        </div>
      </div>

      <div>
        <Label>Stock Quantity</Label>
        <Input
          type="number"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          placeholder="50"
        />
      </div>

      <div>
        <Label>Image URL</Label>
        <Input
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="https://images.unsplash.com/..."
        />
      </div>

      <div>
        <Label>Description</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Product description"
          rows={3}
        />
      </div>

      <Button onClick={onSubmit} className="w-full bg-green-600 hover:bg-green-700">
        {submitLabel}
      </Button>
    </div>
  );
};

export default AdminDashboard;
