# Ruang Resep API

Backend REST API untuk **Ruang Resep**, website berbagi dan mencari resep masakan. Proyek ini adalah lanjutan dari Tugas Besar Perancangan dan Pemrograman Web (frontend Next.js), dan dibuat untuk **Tugas Bab 10: Implementasi REST API + PostgreSQL + ORM (Prisma)**.

Data resep dan komentar disimpan permanen di PostgreSQL melalui Prisma ORM, sehingga tetap ada setelah server di-restart.

## Teknologi

- NestJS 12 (ESM)
- PostgreSQL 18
- Prisma ORM 7 (`@prisma/adapter-pg`)

## Model Data

- **Recipe**: `id`, `name`, `category`, `author`, `image`, `rating`, `views`, `description`, `duration`, `servings`, `difficulty`, `ingredients[]`, `steps[]`, `createdAt`, `updatedAt`
- **Comment**: `id`, `user`, `text`, `createdAt`, `recipeId` (relasi ke Recipe, hapus resep ikut menghapus komentarnya)

## Cara Menjalankan

1. Pastikan PostgreSQL berjalan, lalu buat database:
   ```sql
   CREATE DATABASE ruang_resep_db;
   ```
2. Salin `.env.example` menjadi `.env`, lalu isi password PostgreSQL pada `DATABASE_URL`.
3. Install dependensi, jalankan migrasi, dan generate Prisma Client:
   ```bash
   npm install
   npx prisma migrate dev
   npx prisma generate
   ```
4. Jalankan server:
   ```bash
   npm run start:dev
   ```
   Server berjalan di `http://localhost:3000`.

## Endpoint

| Method | URL | Keterangan |
| --- | --- | --- |
| POST | `/recipes` | Tambah resep |
| GET | `/recipes` | Daftar resep. Filter opsional: `?category=Makanan&search=nasi` |
| GET | `/recipes/stats` | Statistik: total resep, rata-rata rating, jumlah per kategori |
| GET | `/recipes/:id` | Detail resep beserta komentarnya |
| PATCH | `/recipes/:id` | Ubah resep |
| DELETE | `/recipes/:id` | Hapus resep |

Contoh body `POST /recipes`:

```json
{
  "name": "Nasi Goreng",
  "category": "Makanan",
  "author": "Budi",
  "description": "Nasi goreng rumahan dengan bumbu sederhana.",
  "duration": 25,
  "servings": 2,
  "difficulty": "Mudah",
  "ingredients": ["2 piring nasi putih dingin", "2 butir telur"],
  "steps": ["Tumis bawang putih.", "Masukkan telur dan nasi."]
}
```

## Screenshot

Semua screenshot ada di folder [`docs/screenshots`](docs/screenshots).

| Tahap | Berkas |
| --- | --- |
| 1. Database dibuat | `01-create-database.png` |
| 2. Migrasi berhasil | `02-migrate.png` |
| 3. Tabel di pgAdmin | `03-tables-pgadmin.png` |
| 4. Server berjalan | `04-server-running.png` |
| 5. Create (POST) | `05-create.png` |
| 6. Read (GET) | `06-read.png` |
| 7. Update (PATCH) | `07-update.png` |
| 8. Data tetap ada setelah restart | `08-persist-after-restart.png` |
| 9. Delete | `09-delete.png` |
| 10. Endpoint statistik / filter | `10-stats-filter.png` |
| 11. Tampilan desktop | `11-desktop.png` |
| 12. Tampilan mobile | `12-mobile.png` |

Contoh penyisipan di README: `![Create](docs/screenshots/05-create.png)`
