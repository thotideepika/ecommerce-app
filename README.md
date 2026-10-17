markdown
# 🛍️ ShopHub — Full-Stack E-Commerce Platform

A production-grade **e-commerce web application** built with **Spring Boot 3**, **React 18 + TypeScript**, **PostgreSQL**, and **JWT authentication**. 

> 🔗 **GitHub Repository:** [github.com/thotideepika/ecommerce-app](https://github.com/thotideepika/ecommerce-app)  
> 🌐 **Live Demo:** [ecommerce-app-ochre-nine.vercel.app](https://ecommerce-app-ochre-nine.vercel.app)  
> 💻 **Local URL:** [http://localhost:3002](http://localhost:3002)

---

## ✨ Features
- 🔐 JWT-based Login & Registration
- 🛍️ Browse products by 10 categories
- 🛒 Shopping cart and checkout flow
- 📋 Order history tracking
- 👨‍💼 Admin dashboard for product & order management

---

## 🚀 How to Run Locally (See the Output)

### Prerequisites
- Java 21+ & Maven
- Node.js 20+
- PostgreSQL 16+ (Make sure it's running)

### 1. Start the Backend (Terminal 1)
```bash
cd backend
mvn spring-boot:run
Wait for Started EcommerceApplication in X.XXX seconds.

2. Start the Frontend (Terminal 2)
Open a new terminal window.

bash
cd frontend
npm install
npm run dev
The app will open at http://localhost:3002.

3. Open in Browser
Go to 👉 http://localhost:3002 and you will see the products!

🔑 Environment Variables
For deployment, ensure these are set:

Vercel (Frontend): VITE_API_URL = https://your-backend.up.railway.app

Railway (Backend): CORS_ORIGIN = https://ecommerce-app-ochre-nine.vercel.app

