# 🛍️ ShopHub — Full-Stack E-Commerce Platform
> 🔗 **GitHub Repository:** [github.com/thotideepika/ecommerce-app](https://github.com/thotideepika/ecommerce-app)  
> 🌐 **Live Demo:** [ecommerce-app.vercel.app](https://ecommerce-app.vercel.app) *(Coming soon)*

A production-grade **e-commerce web application** with product catalog, shopping cart, order management, and admin panel — built using **Spring Boot 3**, **React + TypeScript**, **PostgreSQL**, and **JWT authentication**.
[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_App-blue?logo=vercel)](https://ecommerce-app.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?logo=github)](https://github.com/thotideepika/ecommerce-app)

![Java](https://img.shields.io/badge/Java-21-orange?logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.5-green?logo=springboot)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-blue?logo=postgresql)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📖 Overview

ShopHub is a full-stack e-commerce platform where customers can browse products, filter by category, add items to a cart, place orders, and track their purchase history. Admins can manage products, categories, and order statuses through a dedicated admin dashboard.

Built from scratch to demonstrate end-to-end full-stack development with modern Java and React ecosystems — including **JWT authentication**, **role-based access control**, **RESTful API design**, and **category-based filtering**.

---

## ✨ Features

### Customer Features
- 🔐 **Secure Authentication** — JWT-based login & registration with BCrypt password hashing
- 🛍️ **Product Catalog** — Browse all products with images, prices, and stock info
- 🏷️ **Category Filtering** — Filter products by Electronics, Clothing, Books, Home
- 🔍 **Live Search** — Find products by name in real time
- 📦 **Product Details** — Full product view with category, description, stock
- 🛒 **Shopping Cart** — Add/update/remove items, see live totals
- 💳 **Checkout** — Shipping address + payment method (COD, Card, UPI mock)
- 📋 **Order History** — View all past orders with status tracking

### Admin Features
- 👨‍💼 **Admin Dashboard** — Role-protected panel (only ADMIN users)
- ➕ **Create Products** — Add new products with name, price, stock, category, image
- 🗑️ **Delete Products** — Remove products from catalog
- 📊 **Manage Orders** — Update order status (PENDING → CONFIRMED → SHIPPED → DELIVERED)
- 🏷️ **Categories** — Full category management

### Technical Features
- 🔒 **JWT stateless auth** with role-based access (`@PreAuthorize`)
- 📤 **File upload** endpoint for product images
- 🖼️ **Static resource serving** for uploaded images
- 🌐 **CORS configured** for frontend integration
- 💾 **Auto schema generation** via Hibernate (`ddl-auto: update`)
- 🌱 **Seed data** — 23 sample products across 4 categories

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Java 21** | Programming language (LTS) |
| **Spring Boot 3.2.5** | Application framework |
| **Spring Security** | Authentication & authorization |
| **Spring Data JPA** | Database abstraction |
| **Hibernate** | ORM — Java ↔ SQL mapping |
| **PostgreSQL 18** | Relational database |
| **JJWT 0.12.5** | JWT token generation & validation |
| **Lombok** | Boilerplate reduction |
| **Maven** | Build & dependency management |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **TypeScript 5.2** | Type-safe JavaScript |
| **Vite 5** | Fast build tool & dev server |
| **React Router 6** | Client-side routing |
| **Axios** | HTTP client with interceptors |
| **Context API** | Auth & Cart state management |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                   BROWSER (React)                    │
│              http://localhost:3000                   │
└────────────────┬─────────────────────────────────────┘
                 │
                 │ REST API (JSON)
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│              SPRING BOOT (Java 21)                   │
│              http://localhost:8080                   │
│                                                      │
│  Controllers → Services → Repositories → Entities    │
│  JWT Filter (Security) · Static Resource Handler     │
└────────────────────────┬─────────────────────────────┘
                         │ JDBC
                         ▼
                ┌──────────────────┐
                │  PostgreSQL 18   │
                │  localhost:5432  │
                └──────────────────┘
```

---

## 🗄️ Data Model

```
User (1) ──── places ────► (N) Order
                              │
                              │ contains
                              ▼
                         (N) OrderItem

User (1) ──── has ──────► (N) CartItem ◄─── (1) Product

Category (1) ──── has ──► (N) Product
```

| Entity | Key Fields |
|--------|-----------|
| **User** | id, username, email, password, phone, address, role |
| **Category** | id, name |
| **Product** | id, name, description, price, stock, imageUrl, category, isActive |
| **CartItem** | id, userId, productId, quantity, priceAtAdd |
| **Order** | id, userId, subtotal, shipping, total, shippingAddress, status, paymentMethod |
| **OrderItem** | id, order, productId, productName, quantity, price |

**Order statuses:** `PENDING → CONFIRMED → SHIPPED → DELIVERED` (or `CANCELLED`)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:

- **Java 21** — [Download](https://adoptium.net/temurin/releases/?version=21)
- **Maven 3.9+** — [Download](https://maven.apache.org/download.cgi)
- **Node.js 20+** — [Download](https://nodejs.org)
- **PostgreSQL 16+** — [Download](https://www.postgresql.org/download/)

Verify:
```bash
java -version    # Should show 21.x
mvn -version     # Should show 3.9.x
node -v          # Should show 20.x or higher
```

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/thotideepika/ecommerce.git
cd ecommerce
```

---

### Step 2: Set Up PostgreSQL

Open **SQL Shell (psql)** or pgAdmin and run:

```sql
CREATE DATABASE ecommerce;
GRANT ALL PRIVILEGES ON DATABASE ecommerce TO postgres;
\c ecommerce
GRANT ALL ON SCHEMA public TO postgres;
\q
```

---

### Step 3: Configure Backend

Check `backend/src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/ecommerce
    username: postgres
    password: postgres
```

⚠️ **Update** `username` and `password` if you used different values.

---

### Step 4: Start the Backend

Open a terminal:
```bash
cd backend
mvn clean spring-boot:run
```

Wait for:
```
Started EcommerceApplication in X.XXX seconds
Tomcat started on port(s): 8080
```

✅ **Backend running at http://localhost:8080**

---

### Step 5: Start the Frontend

Open a **new terminal**:
```bash
cd frontend
npm install
npm run dev
```

Wait for:
```
  VITE v5.4.21  ready in XXX ms
  ➜  Local:   http://localhost:3000/
```

✅ **Frontend running at http://localhost:3000**

---

### Step 6: Seed Products (Optional but Recommended)

Run this SQL to add 23 sample products:

```sql
INSERT INTO categories (name) VALUES ('Electronics'), ('Clothing'), ('Books'), ('Home');

INSERT INTO products (name, description, price, stock, category_id, is_active, image_url, created_at) VALUES
('Wireless Headphones', 'Premium noise-cancelling headphones', 2999.00, 50, 1, true, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', NOW()),
('Smart Watch', 'Fitness tracking smart watch', 4999.00, 30, 1, true, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', NOW()),
('iPhone 15', 'Apple flagship smartphone', 79999.00, 15, 1, true, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400', NOW()),
('MacBook Air M3', 'Lightweight laptop for creators', 114999.00, 10, 1, true, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', NOW()),
('Cotton T-Shirt', 'Comfortable everyday cotton t-shirt', 499.00, 100, 2, true, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', NOW()),
('Denim Jeans', 'Classic blue denim jeans', 1499.00, 40, 2, true, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', NOW()),
('Leather Jacket', 'Premium genuine leather jacket', 4999.00, 25, 2, true, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', NOW()),
('Running Shoes', 'Lightweight athletic shoes', 2999.00, 45, 2, true, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', NOW()),
('Clean Code Book', 'A handbook of agile software craftsmanship', 799.00, 25, 3, true, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400', NOW()),
('Atomic Habits', 'Bestseller on building good habits', 599.00, 50, 3, true, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', NOW()),
('Sapiens', 'A brief history of humankind', 699.00, 35, 3, true, 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400', NOW()),
('Desk Lamp', 'LED desk lamp with adjustable brightness', 1299.00, 40, 4, true, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400', NOW()),
('Coffee Mug', 'Ceramic coffee mug 350ml', 299.00, 60, 4, true, 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400', NOW()),
('Wall Clock', 'Modern minimalist wall clock', 799.00, 30, 4, true, 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=400', NOW()),
('Plant Pot', 'Ceramic plant pot with saucer', 399.00, 70, 4, true, 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400', NOW()),
('Yoga Mat', 'Non-slip exercise yoga mat', 899.00, 40, 4, true, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400', NOW());
```

---

### Step 7: Open the App

👉 **http://localhost:3000**

Register a new account or use one of the test users (see below).

---

## 🔑 Test Users

After registering via the signup page, you can also create an admin user directly in the database:

```sql
INSERT INTO users (username, email, password, role) 
VALUES ('admin', 'admin@shophub.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi', 'ADMIN');
```
*(Password hash above = `password123`)*

| Role | Username | Password | Access |
|------|----------|----------|--------|
| **Admin** | `admin` | `password123` | `/admin` dashboard |
| **Customer** | Register new | - | Browse & shop |

---

## 🎯 Quick Tour

### As a Customer
1. Open http://localhost:3000
2. Browse products — filter by **Electronics / Clothing / Books / Home**
3. Search products by name
4. Click any product → see details
5. Click **Add to Cart**
6. Go to **Cart** → update quantities
7. Click **Proceed to Checkout** → enter address → place order
8. View **Orders** page to see history

### As an Admin
1. Login as an admin user
2. Click **Admin** in the header
3. **Products tab:** Add new product, delete products
4. **Orders tab:** Update order status (PENDING → DELIVERED)

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|:----:|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login & get JWT | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |

### Products & Categories
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|:----:|
| GET | `/api/products` | List active products | ❌ |
| GET | `/api/products?q=shirt` | Search products | ❌ |
| GET | `/api/products?categoryId=1` | Filter by category | ❌ |
| GET | `/api/products/{id}` | Product detail | ❌ |
| GET | `/api/categories` | List categories | ❌ |

### Cart
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|:----:|
| GET | `/api/cart` | Get user's cart | ✅ |
| POST | `/api/cart/items` | Add item to cart | ✅ |
| PUT | `/api/cart/items/{id}` | Update quantity | ✅ |
| DELETE | `/api/cart/items/{id}` | Remove item | ✅ |

### Orders
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|:----:|
| POST | `/api/orders` | Place order | ✅ |
| GET | `/api/orders` | User's orders | ✅ |
| GET | `/api/orders/{id}` | Order detail | ✅ |

### Admin (Role: ADMIN only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/products` | Create product |
| PUT | `/api/admin/products/{id}` | Update product |
| DELETE | `/api/admin/products/{id}` | Delete product |
| POST | `/api/admin/products/upload` | Upload image |
| GET | `/api/admin/categories` | List categories |
| POST | `/api/admin/categories` | Create category |
| GET | `/api/admin/orders` | All orders |
| PUT | `/api/admin/orders/{id}/status` | Update order status |

---

## 📂 Project Structure

```
ecommerce/
├── backend/                              # Spring Boot application
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/main/
│       ├── java/com/ecommerce/
│       │   ├── EcommerceApplication.java
│       │   ├── config/                   # Security, CORS, file storage
│       │   ├── security/                 # JWT filter, utilities
│       │   ├── entity/                   # JPA entities
│       │   ├── repository/               # Spring Data repos
│       │   ├── dto/                      # Request/Response DTOs
│       │   ├── service/                  # Business logic
│       │   └── controller/               # REST endpoints
│       └── resources/
│           ├── application.yml
│           └── data.sql
│
├── frontend/                             # React application
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── index.html
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── index.css                     # Dark theme styling
│       ├── api/                          # Axios client
│       ├── context/                      # Auth + Cart contexts
│       ├── components/                   # Reusable components
│       └── pages/                        # Route pages
│           └── admin/
│
├── docker-compose.yml
├── .gitignore
├── README.md
└── LICENSE
```

---

## 🔐 Authentication Flow

1. User registers → password hashed with **BCrypt** (`$2a$10$...`)
2. Backend generates a **JWT** signed with a secret key
3. Frontend stores token in **localStorage**
4. Axios interceptor attaches `Authorization: Bearer <token>` to every request
5. `JwtAuthFilter` validates the token before each protected request
6. `@PreAuthorize("hasRole('ADMIN')")` restricts admin endpoints

---

## 🎨 Key UI Features

- **Dark theme** — modern dark gray background with gold accents
- **Responsive grid layout** — products auto-arrange by screen size
- **Live cart badge** — header shows item count
- **Category filter buttons** — click to filter, "All" to reset
- **Instant search** — filter products as you type
- **Role-aware header** — "Admin" link only shows for admins
- **Order status badges** — color-coded (yellow/green/red)
- **Admin dashboard tabs** — switch between Products and Orders

---

## 🐛 Troubleshooting

### `Port 8080 already in use`
```powershell
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

Or use the one-liner:
```powershell
Get-NetTCPConnection -LocalPort 8080 -State Listen | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

### `Port 3000 already in use`
Vite will auto-pick 3001, 3002, etc. Or kill zombies:
```powershell
Get-NetTCPConnection -LocalPort 3000,3001,3002 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

### `Access denied for user 'postgres'@'localhost'`
- Verify PostgreSQL is running: `Get-Service postgresql-x64-18`
- Reset the password: `ALTER USER postgres WITH PASSWORD 'postgres';`

### `Unknown database 'ecommerce'`
```sql
CREATE DATABASE ecommerce;
GRANT ALL PRIVILEGES ON DATABASE ecommerce TO postgres;
```

### CORS error in browser
Edit `backend/src/main/java/com/ecommerce/config/CorsConfig.java` and add your frontend URL.

### Blank page after login
- Check F12 → Console for errors
- Verify backend is running: http://localhost:8080/api/products

### `ClassNotFoundException: com.ecommerce.EcommerceApplication`
- The file must be at `backend/src/main/java/com/ecommerce/EcommerceApplication.java`
- First line must be `package com.ecommerce;`
- Verify `pom.xml` has `<mainClass>com.ecommerce.EcommerceApplication</mainClass>` inside `<configuration>` of the spring-boot-maven-plugin

---

## 🎯 Roadmap / Future Features

### Phase 2 — Enhanced Catalog
- [ ] Product reviews & ratings
- [ ] Wishlist
- [ ] Product filters (price range, rating)
- [ ] Pagination

### Phase 3 — Real Payments
- [ ] Stripe integration (international)
- [ ] Razorpay integration (India)
- [ ] Webhook handling
- [ ] Refunds

### Phase 4 — Notifications & UX
- [ ] Email order confirmations
- [ ] Order tracking
- [ ] SMS notifications
- [ ] Product image upload UI (drag & drop)

### Phase 5 — Scale
- [ ] Microservices split (user, product, order services)
- [ ] Elasticsearch for search
- [ ] Redis caching
- [ ] Docker Compose production setup

---

## 🧪 Testing

### Manual Test Flow

**Customer:**
1. Register → Browse → Filter by category → Add to cart → Checkout → View orders ✅

**Admin:**
1. Login as admin → Add product → Verify it appears on home ✅
2. Update order status → Verify customer sees new status ✅

### API Testing with cURL

**Register:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"test123"}'
```

**Login:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123"}'
```

**Get products:**
```bash
curl http://localhost:8080/api/products
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---
## 👤 Author

**Deepika**
- GitHub: [@thotideepika](https://github.com/thotideepika)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)
- Live Project: [ecommerce-app.vercel.app](https://ecommerce-app.vercel.app)

---

## 🙏 Acknowledgments

- Inspired by modern e-commerce platforms like Amazon & Flipkart
- Built with [Spring Boot](https://spring.io/projects/spring-boot) & [React](https://react.dev)
- Product images from [Unsplash](https://unsplash.com)

---

⭐ **If you found this project helpful, please give it a star!**