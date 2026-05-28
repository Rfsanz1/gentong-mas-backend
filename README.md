# Gentong Mas Backend API

Bagian dari ekosistem ERP Gentong Mas.

## Tentang

NestJS REST API backend untuk seluruh ekosistem ERP Gentong Mas. Mengelola autentikasi, data produk, pesanan, karyawan, keuangan, dan semua entitas bisnis.

## Role yang Bisa Akses

Admin, System

## Tech Stack

- NestJS 10
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- REST API

## Requirement

- Node.js 20+
- pnpm
- Backend API berjalan di http://localhost:4000
- PostgreSQL (untuk backend)

## Cara Menjalankan

### 1. Clone repo ini
```bash
git clone https://github.com/Rfsanz1/gentong-mas-backend.git
cd gentong-mas-backend
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Setup environment
```bash
cp .env.example .env
# Edit .env sesuai kebutuhan
```

### 4. Jalankan
```bash
pnpm dev
```

### 5. Buka browser
```
http://localhost:4000
```

## Koneksi ke Repo Lain

| App         | Repo                                                                  | Port |
|-------------|-----------------------------------------------------------------------|------|
| Backend API | https://github.com/Rfsanz1/gentong-mas-backend | 4000 |
| Admin Panel | https://github.com/Rfsanz1/gentong-mas-erp     | 5000 |
| Sales App   | https://github.com/Rfsanz1/gentong-mas-sales   | 3002 |
| Gudang App  | https://github.com/Rfsanz1/gentong-mas-gudang  | 3003 |
| POS App     | https://github.com/Rfsanz1/gentong-mas-pos     | 3001 |
| Driver App  | https://github.com/Rfsanz1/gentong-mas-driver  | 3000 |

## Port

| App        | Port |
|------------|------|
| Backend    | 4000 |
| ERP Core   | 5000 |
| Sales App  | 3002 |
| Gudang App | 3003 |
| POS App    | 3001 |
| Driver App | 3000 |

---
*Bagian dari [Gentong Mas ERP](https://github.com/Rfsanz1) — sistem ERP modern untuk bisnis elektronik.*
