 🛍️ ShopHub — Full-Stack E-Commerce Platform

A production-grade **e-commerce web application** built with **Spring Boot 3**, **React 18 + TypeScript**, **PostgreSQL**, and **JWT authentication**. Features a complete product catalog, shopping cart, order management, and a dedicated admin dashboard.
> 🔗 **GitHub Repository:** [github.com/thotideepika/ecommerce-app](https://github.com/thotideepika/ecommerce-app)  
> 🌐 **Live Demo:** [ecommerce-app-ochre-nine.vercel.app](https://ecommerce-app-ochre-nine.vercel.app)
https://img.shields.io/badge/Java-21-orange?logo=openjdk(https://adoptium.net)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.5-green?logo=springboot)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?logo=typescript)](https://www.typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-blue?logo=postgresql)](https://www.postgresql.org)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 📖 Overview

ShopHub is a full-stack e-commerce application where customers can browse products by category, add items to a cart, place orders, and track their purchase history. Admins can manage products, categories, and update order statuses through a role-protected dashboard.

Built from scratch to demonstrate end-to-end full-stack development with modern Java and React ecosystems — including **JWT authentication**, **role-based access control**, **RESTful API design**, and **category-based product filtering**.

---

## ✨ Features

### Customer Features
- 🔐 **Secure Authentication** — JWT-based login & registration with BCrypt password hashing.
- 🛍️ **Product Catalog** — Browse products across 10 categories (Mobiles, Laptops, Cars, Bikes, Electronics, Fashion, Books, Home, Sports, Beauty).
- 🏷️ **Category Filtering** — Filter products by category with a single click.
- 🔍 **Live Search** — Find products by name in real time.
- 📦 **Product Details** — Full product view with images, description, price, and stock.
- 🛒 **Shopping Cart** — Add, update quantities, and remove items with live totals.
- 💳 **Checkout** — Shipping address + payment method selection.
- 📋 **Order History** — View all past orders with status tracking.

### Admin Features
- 👨‍💼 **Admin Dashboard** — Role-protected panel (only ADMIN users can access).
- ➕ **Product Management** — Create, update, and delete products.
- 📊 **Order Management** — Update order statuses (PENDING → CONFIRMED → SHIPPED → DELIVERED → CANCELLED).

---

## 🛠️ Tech Stack

### Backend
- **Java 21**
- **Spring Boot 3.2.5**
- **Spring Security** (JWT & Role-based auth)
- **Spring Data JPA & Hibernate**
- **PostgreSQL 18**
- **JJWT** (JSON Web Tokens)
- **Maven**

### Frontend
- **React 18**
- **TypeScript**
- **Vite**
- **React Router v6**
- **Axios**
- **Context API** (Auth & Cart state)

---

## 🚀 How to Run Locally

### Prerequisites
Make sure you have these installed:
- Java 21+
- Maven 3.9+
- Node.js 20+
- PostgreSQL 16+ (Make sure the service is running)

### 1. Set Up PostgreSQL
Open **psql** or **pgAdmin** and run:
```sql
CREATE DATABASE ecommerce;
GRANT ALL PRIVILEGES ON DATABASE ecommerce TO postgres;
\c ecommerce
GRANT ALL ON SCHEMA public TO postgres;
\q
2. Start the Backend (Terminal 1) ⚠️
You must have two separate terminals open simultaneously.

bash
cd backend
mvn clean spring-boot:run
Wait for: Started EcommerceApplication in X.XXX seconds
Leave this terminal open.

3. Start the Frontend (Terminal 2)
Open a new terminal window in VS Code.

bash
cd frontend
npm install
npm run dev
Wait for: VITE ready on http://localhost:3001
Leave this terminal open too.

4. Open the App
Go to 👉 http://localhost:3001 in your browser.

🔑 Environment Variables
Backend (application.yml)
yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/ecommerce
    username: postgres
    password: postgres
jwt:
  secret: your_super_secret_jwt_key_min_32_chars
  expiration: 86400000
Frontend (Production Deployment on Vercel)
text
VITE_API_URL=https://your-backend-url.up.railway.app
(And on Railway, set CORS_ORIGIN to your Vercel frontend URL).

🆘 Troubleshooting
Error: ECONNREFUSED or "No Products Found" in the browser
This means your frontend is running, but your backend is not running. You must open a second terminal and run cd backend; mvn spring-boot:run. Both servers must run at the same time.

Error: Port 8080 already in use
An old Java process is stuck. Run this in your terminal to kill it, then try starting the backend again:

powershell
taskkill /F /IM java.exe
Error: Registration fails (500 Error)
Make sure you are using a brand new username (e.g., user1234). If you try to register the same username twice, the database will reject it.