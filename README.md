# 📊 Product Inventory Management Dashboard

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)

Aplikasi web untuk mengelola inventaris produk dengan fitur CRUD lengkap, built dengan Next.js 14, Tailwind CSS, dan MySQL.

## 🌐 Base URL

#### Development (Local)

```http
http://localhost:3000/
```

#### Production (Vercel)

```http
https://crud-inventory-product.vercel.app/
```

## ✨ Features

### ✅ CRUD Operations

- Create: Tambah produk baru dengan modal form
- Read: Lihat daftar produk dengan pagination
- Update: Edit produk yang ada
- Delete: Hapus produk dengan konfirmasi

### ✅ Validation

- Product Name: Required, max 255 characters
- Amount: Required, > 0, decimal format
- Quantity: Required, >= 0, integer

## 🌐 API Endpoints

| Method | Endpoint             | Description        |
| ------ | -------------------- | ------------------ |
| GET    | `/api/products`      | Get all products   |
| POST   | `/api/products`      | Create new product |
| GET    | `/api/products/[id]` | Get single product |
| PUT    | `/api/products/[id]` | Update product     |
| DELETE | `/api/products/[id]` | Delete product     |
