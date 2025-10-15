# 🪄 Instagram Filter Check

**Instagram Filter Check** adalah proyek berbasis **React + TypeScript** yang berfungsi untuk menampilkan informasi publik akun Instagram melalui **API Sprintpedia**.  
Aplikasi ini menggabungkan **frontend React (Vite + Tailwind CSS)** dan **backend serverless (Vercel Functions)** untuk menghindari masalah CORS saat berinteraksi dengan Sprintpedia.

🌐 **Live Demo:** [https://instagram-filter-check.vercel.app](https://instagram-filter-check.vercel.app)

---

## ⚙️ Tech Stack

| Kategori | Teknologi |
|-----------|------------|
| **Frontend** | [React 19](https://react.dev/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Backend / API** | [Vercel Serverless Functions](https://vercel.com/docs/functions) dengan [`@vercel/node`](https://www.npmjs.com/package/@vercel/node) |
| **Deployment** | [Vercel](https://vercel.com/) |
| **Linting & Quality** | ESLint + TypeScript ESLint |

---

## 🧩 Arsitektur Singkat

```bash

📦 instagram-filter-check/
├── 📁 src/                  # React frontend
│   ├── 📁 components/       # Komponen UI
│   ├── 📁 pages/            # Halaman utama
│   ├── 📁 styles/           # Konfigurasi Tailwind
│   └── 📄 main.tsx          # Entry point React
│
├── 📁 api/
│   └── 📄 sprintpedia.ts    # Backend API (Serverless Function di Vercel)
│
├── 📄 package.json
├── ⚙️  vite.config.ts
└── 📄 tsconfig.json

```
---

## Alur Simulasi API Sprintpedia

1. User Input:

   - Pengguna memasukkan username Instagram di form (contoh: nasa).

2. Frontend → API Lokal

   - Frontend mengirim request ke:

     POST https://instagram-filter-check.vercel.app/api/sprintpedia

     dengan payload:

     { "username": "nasa" }

3. Serverless Function (Proxy)

   - File api/sprintpedia.ts menerima request dan meneruskannya ke:

     https://sprintpedia.id/api/instagram_tools

   - Request dikirim menggunakan fetch dengan header:

    {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest"
    }

4. Sprintpedia Response

   - Sprintpedia mengembalikan hasil berupa data profil publik (atau HTML error jika username tidak ditemukan).

5. Response ke Frontend

   - Proxy mengubah hasil ke format JSON dan mengirim kembali ke React App untuk ditampilkan.

---

## Cara Menjalankan Proyek

1. Jalankan di Mode Development
   npm run dev

2. Deployment (Vercel)
   https://instagram-filter-check.vercel.app
