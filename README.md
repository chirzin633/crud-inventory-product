# 📊 Product Inventory Management Dashboard

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)

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

## 📱 Instruksi Penggunaan Aplikasi (Production)

### 🌐 Akses Aplikasi

`Live URL: https://crud-inventory-product.vercel.app`

### 🎯 FITUR YANG TERSEDIA

#### 1. Dashboard Utama

- Header: Product Management dengan ikon inventory
- Judul: Inventory Dashboard dengan deskripsi
- Tabel: Menampilkan daftar produk dengan kolom:

        - Product Name (Nama Produk)

        - Amount (Harga dalam USD)

        - Quantity (Jumlah stok)

        - Actions (Tombol Edit & Delete)

#### 2. CRUD Operations (Create, Read, Update, Delete)

##### 📍 TAMBAH PRODUK BARU

- Klik tombol "Add New Product" (biru) di kanan atas
- Isi form yang muncul:

```
Product Name:   [Nama produk, contoh: "iPhone 15"]
Amount (Rp):   [Harga, contoh: 100000]
Quantity:       [Jumlah stok, contoh: 50]
```

- Klik "Save Product" untuk menyimpan

##### 📍 CARI PRODUK

- Pada dashboard cari form input pencarian
- Ketik nama product yang ingin dicari
- Data akan otomatis muncul sesuai apa yang diketik

##### 📍 EDIT PRODUK

- Di tabel, cari produk yang ingin diedit
- Klik ikon pensil (✏️) di kolom Actions
- Ubah data di form yang muncul
- Klik "Update Product" untuk menyimpan perubahan

##### 📍 HAPUS PRODUK

- Di tabel, cari produk yang ingin dihapus
- Klik ikon tong sampah (🗑️) di kolom Actions
- Konfirmasi "Are you sure you want to delete this product?"
- Klik OK untuk menghapus permanen
