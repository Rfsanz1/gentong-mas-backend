---
name: tsx + NestJS Swagger - emitDecoratorMetadata workaround
description: tsx (esbuild) tidak support emitDecoratorMetadata, menyebabkan Swagger schema kosong
---

## Rule
Proyek ini menggunakan `tsx watch` sebagai dev server. `tsx` memakai esbuild yang TIDAK men-emit `emitDecoratorMetadata`, meskipun `tsconfig.json` sudah set `"emitDecoratorMetadata": true`.

Akibatnya, NestJS Swagger tidak bisa infer types dari `@Body() dto: SomeDto` parameter.

## Solusi (dua langkah wajib)

1. **Setiap `@ApiProperty()` / `@ApiPropertyOptional()`** harus punya `type:` eksplisit:
   - `type: String` untuk string/UUID
   - `type: Number` untuk number/int/decimal
   - `type: Boolean` untuk boolean
   - `type: () => [SomeDtoClass]` untuk array nested DTO
   - `enum: [...]` untuk enum (tidak perlu `type:`)

2. **Setiap method POST/PUT/PATCH** di controller harus punya `@ApiBody({ type: SomeDtoClass })` eksplisit.
   - Jangan pakai `@ApiBody` + `@ApiResponse({ type: Dto })` bersamaan — ini memicu circular dep error di Swagger.
   - `@ApiResponse` hanya boleh pakai inline `schema: { ... }` atau description saja.

**Why:** `tsx` tidak akan diganti karena ESM support dan hot reload. ts-node-dev dengan --esm flag tidak kompatibel dengan versi yang terinstall.

**How to apply:** Setiap kali membuat DTO baru atau controller baru, pastikan kedua langkah di atas diterapkan.
