# FreshZone Backend Integration Contracts

## Overview
This document outlines the API contracts, data models, and integration plan for connecting the FreshZone React frontend with the FastAPI backend.

## Current Frontend Mock Data (to be replaced)
- **mockData.js**: Contains all mock data for products, categories, users, orders, promotions, etc.
- All data is currently stored in localStorage (cart, orders, user session)
- Need to replace with actual API calls to backend

---

## API Contracts

### Authentication APIs

#### 1. POST /api/auth/login
**Purpose**: Mock login (to be replaced with Emergent Auth)
```json
Request:
{
  "email": "user@example.com",
  "password": "password"
}

Response:
{
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "user@example.com",
    "phone": "+91 98765 43210"
  },
  "session_token": "token_string"
}
```

#### 2. POST /api/auth/logout
**Purpose**: Clear user session
```json
Response:
{
  "message": "Logged out successfully"
}
```

#### 3. GET /api/auth/me
**Purpose**: Get current user profile
```json
Response:
{
  "id": "uuid",
  "name": "John Doe",
  "email": "user@example.com",
  "phone": "+91 98765 43210",
  "addresses": [...]
}
```

---

### Product APIs

#### 1. GET /api/products
**Purpose**: Get all products with optional filters
```
Query Params:
- category: string (optional)
- search: string (optional)
- limit: int (default: 50)
- skip: int (default: 0)

Response:
{
  "products": [
    {
      "id": "uuid",
      "name": "Amul Taaza Toned Milk",
      "category": "dairy",
      "price": 28,
      "unit": "500ml",
      "image": "url",
      "stock": 50,
      "description": "Fresh toned milk"
    }
  ],
  "total": 100
}
```

#### 2. GET /api/products/{product_id}
**Purpose**: Get single product details
```json
Response:
{
  "id": "uuid",
  "name": "Product Name",
  "category": "category",
  "price": 100,
  "unit": "1kg",
  "image": "url",
  "stock": 50,
  "description": "Description"
}
```

#### 3. GET /api/categories
**Purpose**: Get all product categories
```json
Response:
{
  "categories": [
    {
      "id": "dairy",
      "name": "Dairy",
      "icon": "🥛"
    }
  ]
}
```

---

### Cart APIs

#### 1. GET /api/cart
**Purpose**: Get user's cart
```json
Response:
{
  "user_id": "uuid",
  "items": [
    {
      "product_id": "uuid",
      "quantity": 2,
      "product": {...}
    }
  ],
  "updated_at": "timestamp"
}
```

#### 2. POST /api/cart/add
**Purpose**: Add item to cart
```json
Request:
{
  "product_id": "uuid",
  "quantity": 1
}

Response:
{
  "message": "Item added to cart",
  "cart": {...}
}
```

#### 3. PUT /api/cart/update
**Purpose**: Update cart item quantity
```json
Request:
{
  "product_id": "uuid",
  "quantity": 3
}

Response:
{
  "message": "Cart updated",
  "cart": {...}
}
```

#### 4. DELETE /api/cart/remove/{product_id}
**Purpose**: Remove item from cart
```json
Response:
{
  "message": "Item removed from cart"
}
```

#### 5. DELETE /api/cart/clear
**Purpose**: Clear entire cart
```json
Response:
{
  "message": "Cart cleared"
}
```

---

### Order APIs

#### 1. POST /api/orders
**Purpose**: Create new order
```json
Request:
{
  "address_id": "uuid",
  "delivery_slot_id": "slot1",
  "donation": 10,
  "tip": 5,
  "charity_id": "charity1",
  "promo_code": "FRESH20"
}

Response:
{
  "order_id": "uuid",
  "razorpay_order_id": "order_xyz",
  "amount": 500,
  "currency": "INR"
}
```

#### 2. GET /api/orders
**Purpose**: Get user's order history
```json
Response:
{
  "orders": [
    {
      "id": "uuid",
      "date": "timestamp",
      "status": "delivered",
      "items": [...],
      "total_amount": 500,
      "address": {...},
      "delivery_slot": "6:00 AM - 8:00 AM",
      "timeline": [...]
    }
  ]
}
```

#### 3. GET /api/orders/{order_id}
**Purpose**: Get single order details
```json
Response:
{
  "id": "uuid",
  "date": "timestamp",
  "status": "out_for_delivery",
  "items": [...],
  "total_amount": 500,
  "timeline": [...]
}
```

#### 4. POST /api/orders/{order_id}/verify-payment
**Purpose**: Verify Razorpay payment
```json
Request:
{
  "razorpay_payment_id": "pay_xyz",
  "razorpay_signature": "signature"
}

Response:
{
  "success": true,
  "order": {...}
}
```

---

### Address APIs

#### 1. GET /api/addresses
**Purpose**: Get user's saved addresses
```json
Response:
{
  "addresses": [
    {
      "id": "uuid",
      "label": "Home",
      "line1": "123 Street",
      "line2": "Area",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400001",
      "is_default": true
    }
  ]
}
```

#### 2. POST /api/addresses
**Purpose**: Add new address
```json
Request:
{
  "label": "Office",
  "line1": "456 Tech Park",
  "line2": "Andheri",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400069",
  "is_default": false
}

Response:
{
  "id": "uuid",
  "message": "Address added successfully"
}
```

---

### Promotion APIs

#### 1. GET /api/promotions
**Purpose**: Get active promotions
```json
Response:
{
  "promotions": [
    {
      "id": "uuid",
      "title": "20% Off on First Order",
      "code": "FRESH20",
      "discount": 20,
      "min_order": 299,
      "valid_until": "2025-12-31",
      "active": true
    }
  ]
}
```

#### 2. POST /api/promotions/validate
**Purpose**: Validate promo code
```json
Request:
{
  "code": "FRESH20",
  "cart_total": 500
}

Response:
{
  "valid": true,
  "discount_amount": 100,
  "message": "Promo code applied successfully"
}
```

---

### Payment APIs

#### 1. POST /api/payments/razorpay/create-order
**Purpose**: Create Razorpay order
```json
Request:
{
  "amount": 500
}

Response:
{
  "order_id": "order_xyz",
  "amount": 50000,
  "currency": "INR",
  "key_id": "rzp_test_xxx"
}
```

#### 2. POST /api/payments/razorpay/webhook
**Purpose**: Razorpay payment webhook
```json
Request: {Razorpay webhook payload}

Response:
{
  "status": "success"
}
```

---

### Zone/Community APIs

#### 1. GET /api/zone/features
**Purpose**: Get upcoming features
```json
Response:
{
  "features": [
    {
      "id": "uuid",
      "title": "Recipe Suggestions",
      "description": "...",
      "votes": 234,
      "status": "In Development"
    }
  ]
}
```

#### 2. POST /api/zone/features/{feature_id}/vote
**Purpose**: Vote for a feature
```json
Response:
{
  "message": "Vote recorded",
  "votes": 235
}
```

#### 3. POST /api/zone/feedback
**Purpose**: Submit feedback
```json
Request:
{
  "feedback": "Great app!",
  "name": "John Doe",
  "email": "john@example.com"
}

Response:
{
  "message": "Feedback submitted successfully"
}
```

---

## MongoDB Schema Design

### Collections

#### 1. users
```javascript
{
  _id: ObjectId,
  id: String (UUID),
  name: String,
  email: String (unique),
  phone: String,
  created_at: DateTime,
  updated_at: DateTime
}
```

#### 2. addresses
```javascript
{
  _id: ObjectId,
  id: String (UUID),
  user_id: String (FK to users),
  label: String,
  line1: String,
  line2: String,
  city: String,
  state: String,
  pincode: String,
  is_default: Boolean,
  created_at: DateTime
}
```

#### 3. products
```javascript
{
  _id: ObjectId,
  id: String (UUID),
  name: String,
  category: String,
  price: Float,
  unit: String,
  image: String (URL),
  stock: Integer,
  description: String,
  active: Boolean,
  created_at: DateTime,
  updated_at: DateTime
}
```

#### 4. categories
```javascript
{
  _id: ObjectId,
  id: String (UUID),
  name: String,
  icon: String,
  sort_order: Integer
}
```

#### 5. carts
```javascript
{
  _id: ObjectId,
  user_id: String (FK to users),
  items: [
    {
      product_id: String,
      quantity: Integer
    }
  ],
  updated_at: DateTime
}
```

#### 6. orders
```javascript
{
  _id: ObjectId,
  id: String (UUID),
  user_id: String (FK to users),
  items: [
    {
      product_id: String,
      name: String,
      quantity: Integer,
      price: Float
    }
  ],
  total_amount: Float,
  address: Object,
  delivery_slot: String,
  status: String (placed, confirmed, packed, out_for_delivery, delivered),
  payment: {
    razorpay_order_id: String,
    razorpay_payment_id: String,
    status: String,
    method: String
  },
  donation: Float,
  tip: Float,
  charity_id: String,
  timeline: [
    {
      status: String,
      timestamp: DateTime,
      message: String
    }
  ],
  created_at: DateTime,
  updated_at: DateTime
}
```

#### 7. promotions
```javascript
{
  _id: ObjectId,
  id: String (UUID),
  title: String,
  description: String,
  code: String (unique),
  discount: Float (percentage),
  min_order: Float,
  valid_until: DateTime,
  active: Boolean,
  created_at: DateTime
}
```

#### 8. features (Zone)
```javascript
{
  _id: ObjectId,
  id: String (UUID),
  title: String,
  description: String,
  votes: Integer,
  status: String,
  created_at: DateTime
}
```

#### 9. feedback
```javascript
{
  _id: ObjectId,
  id: String (UUID),
  user_id: String (optional),
  feedback: String,
  name: String,
  email: String,
  created_at: DateTime
}
```

---

## Frontend Integration Changes

### Files to Update:

1. **src/context/AuthContext.js**
   - Replace localStorage mock with API calls
   - Add session token management
   - Implement actual login/logout API calls

2. **src/context/CartContext.js**
   - Replace localStorage with API calls
   - Sync cart with backend on every change
   - Handle cart persistence across sessions

3. **src/pages/Shop.js**
   - Replace `products` from mockData with API call to `/api/products`
   - Replace `categories` with API call to `/api/categories`
   - Update add-to-cart to call API

4. **src/pages/Cart.js**
   - Fetch cart from API
   - Update quantities via API
   - Apply promo codes via API

5. **src/pages/Checkout.js**
   - Fetch addresses from API
   - Create order via API
   - Integrate Razorpay payment gateway

6. **src/pages/Orders.js**
   - Replace localStorage orders with API call to `/api/orders`
   - Show real-time order status

7. **src/pages/Zone.js**
   - Fetch features from API
   - Submit votes via API
   - Submit feedback via API

8. **src/pages/Profile.js**
   - Fetch user profile from API
   - Display addresses from API

---

## Implementation Priority

### Phase 1: Core Shopping Flow
1. Products API (GET /api/products, /api/categories)
2. Cart API (GET, POST, PUT, DELETE /api/cart)
3. Basic auth setup (mock login for now)

### Phase 2: Checkout & Orders
1. Address API
2. Order creation API
3. Razorpay test mode integration
4. Order tracking API

### Phase 3: Enhanced Features
1. Promotions API
2. Zone/Community features API
3. Feedback API

### Phase 4: Authentication
1. Integrate Emergent Authentication
2. Session management
3. Protected routes with real auth

---

## Razorpay Integration Notes

### Test Mode Configuration
- Use Razorpay test keys initially
- Frontend: Load Razorpay checkout script
- Backend: Create order, verify payment signature
- Webhook endpoint for payment status updates

### Payment Flow:
1. User clicks "Place Order"
2. Backend creates Razorpay order → returns order_id
3. Frontend opens Razorpay checkout modal
4. User completes payment
5. Frontend receives payment_id, signature
6. Backend verifies signature
7. Update order status to "confirmed"

---

## Environment Variables Required

### Backend (.env)
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=freshzone
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=secret_xxx
JWT_SECRET=your_jwt_secret
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=http://localhost:8001
REACT_APP_RAZORPAY_KEY_ID=rzp_test_xxx
```

---

## Testing Checklist

### Frontend Tests:
- [ ] Browse products by category
- [ ] Search products
- [ ] Add/remove items from cart
- [ ] Apply promo codes
- [ ] Login/logout flow
- [ ] Checkout flow with address selection
- [ ] Payment integration (test mode)
- [ ] View order history
- [ ] Track order status
- [ ] Submit feedback in Zone

### Backend Tests:
- [ ] All API endpoints return correct data
- [ ] Authentication works correctly
- [ ] Cart operations are atomic
- [ ] Order creation is idempotent
- [ ] Razorpay signature verification works
- [ ] Database indexes are efficient
- [ ] Error handling is comprehensive

---

## Notes
- All mock data in mockData.js will be seeded into MongoDB
- Authentication currently uses mock login; will be replaced with Emergent Auth later
- Razorpay is in test mode; can switch to live with env variable change
- All timestamps use UTC timezone
- Product images use Unsplash URLs
