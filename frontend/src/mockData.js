// Mock data for FreshZone

export const categories = [
  { id: 'dairy', name: 'Dairy', icon: '🥛' },
  { id: 'vegetables', name: 'Vegetables', icon: '🥕' },
  { id: 'fruits', name: 'Fruits', icon: '🍎' },
  { id: 'bakery', name: 'Bakery', icon: '🍞' },
  { id: 'snacks', name: 'Snacks', icon: '🍿' },
  { id: 'beverages', name: 'Beverages', icon: '🥤' },
  { id: 'personal-care', name: 'Personal Care', icon: '🧴' },
  { id: 'household', name: 'Household', icon: '🧹' },
];

export const products = [
  // Dairy
  { id: '1', name: 'Amul Taaza Toned Milk', category: 'dairy', price: 28, unit: '500ml', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400', stock: 50, description: 'Fresh toned milk' },
  { id: '2', name: 'Mother Dairy Milk', category: 'dairy', price: 30, unit: '500ml', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400', stock: 40, description: 'Full cream milk' },
  { id: '3', name: 'Amul Butter', category: 'dairy', price: 54, unit: '100g', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400', stock: 30, description: 'Salted butter' },
  { id: '4', name: 'Britannia Bread', category: 'bakery', price: 35, unit: '400g', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400', stock: 25, description: 'Whole wheat bread' },
  { id: '5', name: 'Amul Cheese Slices', category: 'dairy', price: 120, unit: '200g', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400', stock: 20, description: 'Processed cheese' },
  
  // Vegetables
  { id: '6', name: 'Fresh Tomatoes', category: 'vegetables', price: 25, unit: '500g', image: 'https://images.unsplash.com/photo-1546470427-227a0d155064?w=400', stock: 100, description: 'Farm fresh tomatoes' },
  { id: '7', name: 'Onions', category: 'vegetables', price: 20, unit: '1kg', image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400', stock: 150, description: 'Fresh red onions' },
  { id: '8', name: 'Potatoes', category: 'vegetables', price: 18, unit: '1kg', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400', stock: 200, description: 'Premium potatoes' },
  { id: '9', name: 'Green Capsicum', category: 'vegetables', price: 40, unit: '250g', image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400', stock: 50, description: 'Fresh capsicum' },
  { id: '10', name: 'Fresh Spinach', category: 'vegetables', price: 15, unit: '500g', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400', stock: 60, description: 'Organic spinach' },
  
  // Fruits
  { id: '11', name: 'Fresh Bananas', category: 'fruits', price: 45, unit: '1kg', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400', stock: 80, description: 'Ripe bananas' },
  { id: '12', name: 'Royal Gala Apples', category: 'fruits', price: 120, unit: '1kg', image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400', stock: 45, description: 'Imported apples' },
  { id: '13', name: 'Fresh Oranges', category: 'fruits', price: 80, unit: '1kg', image: 'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=400', stock: 70, description: 'Juicy oranges' },
  { id: '14', name: 'Green Grapes', category: 'fruits', price: 90, unit: '500g', image: 'https://images.unsplash.com/photo-1599819177423-7e3bccf37ca8?w=400', stock: 40, description: 'Seedless grapes' },
  
  // Snacks
  { id: '15', name: 'Lays Classic Chips', category: 'snacks', price: 20, unit: '52g', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400', stock: 100, description: 'Salted chips' },
  { id: '16', name: 'Kurkure Masala Munch', category: 'snacks', price: 20, unit: '65g', image: 'https://images.unsplash.com/photo-1613919113640-c65c1b6c9152?w=400', stock: 90, description: 'Spicy snacks' },
  { id: '17', name: 'Haldiram Bhujia', category: 'snacks', price: 35, unit: '200g', image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400', stock: 50, description: 'Traditional namkeen' },
  
  // Beverages
  { id: '18', name: 'Coca Cola', category: 'beverages', price: 40, unit: '750ml', image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400', stock: 60, description: 'Soft drink' },
  { id: '19', name: 'Real Fruit Juice', category: 'beverages', price: 120, unit: '1L', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400', stock: 40, description: 'Mixed fruit juice' },
  { id: '20', name: 'Nestle Nescafe', category: 'beverages', price: 250, unit: '200g', image: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=400', stock: 30, description: 'Instant coffee' },
];

export const promotions = [
  {
    id: 'promo1',
    title: '20% Off on First Order',
    description: 'Use code FRESH20 for 20% discount',
    code: 'FRESH20',
    discount: 20,
    minOrder: 299,
    validUntil: '2025-12-31',
    active: true,
  },
  {
    id: 'promo2',
    title: 'Free Delivery Above ₹499',
    description: 'Get free delivery on orders above ₹499',
    code: 'FREEDEL',
    discount: 0,
    minOrder: 499,
    validUntil: '2025-12-31',
    active: true,
  },
];

export const deliverySlots = [
  { id: 'slot1', time: '6:00 AM - 8:00 AM', available: true },
  { id: 'slot2', time: '8:00 AM - 10:00 AM', available: true },
  { id: 'slot3', time: '10:00 AM - 12:00 PM', available: false },
  { id: 'slot4', time: '12:00 PM - 2:00 PM', available: true },
  { id: 'slot5', time: '4:00 PM - 6:00 PM', available: true },
  { id: 'slot6', time: '6:00 PM - 8:00 PM', available: true },
];

export const charityProjects = [
  {
    id: 'charity1',
    title: 'Support Local Farmers',
    description: 'Help farmers with better resources',
    icon: '🌾',
  },
  {
    id: 'charity2',
    title: 'Feed the Homeless',
    description: 'Provide meals to those in need',
    icon: '🍽️',
  },
  {
    id: 'charity3',
    title: 'Community Workers Fund',
    description: 'Support delivery partners and workers',
    icon: '👷',
  },
];

export const mockUser = {
  id: 'user1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+91 98765 43210',
  addresses: [
    {
      id: 'addr1',
      label: 'Home',
      line1: '123 Green Valley Apartments',
      line2: 'Sector 15',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true,
    },
    {
      id: 'addr2',
      label: 'Office',
      line1: '456 Tech Park',
      line2: 'Andheri East',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400069',
      isDefault: false,
    },
  ],
};

export const mockOrders = [
  {
    id: 'order1',
    date: '2025-01-15T08:30:00Z',
    status: 'delivered',
    items: [
      { productId: '1', name: 'Amul Taaza Toned Milk', quantity: 2, price: 28 },
      { productId: '6', name: 'Fresh Tomatoes', quantity: 1, price: 25 },
    ],
    totalAmount: 81,
    address: mockUser.addresses[0],
    deliverySlot: '6:00 AM - 8:00 AM',
    timeline: [
      { status: 'placed', timestamp: '2025-01-15T08:30:00Z', message: 'Order placed successfully' },
      { status: 'confirmed', timestamp: '2025-01-15T08:35:00Z', message: 'Order confirmed' },
      { status: 'packed', timestamp: '2025-01-15T08:45:00Z', message: 'Order packed' },
      { status: 'out_for_delivery', timestamp: '2025-01-15T09:00:00Z', message: 'Out for delivery' },
      { status: 'delivered', timestamp: '2025-01-15T09:30:00Z', message: 'Delivered successfully' },
    ],
  },
  {
    id: 'order2',
    date: '2025-01-18T10:00:00Z',
    status: 'out_for_delivery',
    items: [
      { productId: '11', name: 'Fresh Bananas', quantity: 1, price: 45 },
      { productId: '12', name: 'Royal Gala Apples', quantity: 1, price: 120 },
    ],
    totalAmount: 165,
    address: mockUser.addresses[0],
    deliverySlot: '10:00 AM - 12:00 PM',
    timeline: [
      { status: 'placed', timestamp: '2025-01-18T10:00:00Z', message: 'Order placed successfully' },
      { status: 'confirmed', timestamp: '2025-01-18T10:05:00Z', message: 'Order confirmed' },
      { status: 'packed', timestamp: '2025-01-18T10:20:00Z', message: 'Order packed' },
      { status: 'out_for_delivery', timestamp: '2025-01-18T10:45:00Z', message: 'Out for delivery' },
    ],
  },
];
