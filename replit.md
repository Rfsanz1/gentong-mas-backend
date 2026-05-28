# Gentong Mas ERP — Backend API

NestJS 11 + Prisma 5 backend for the Gentong Mas ERP system.

## Stack
- **Runtime**: Node.js 20, TypeScript ESM (`"type": "module"`)
- **Framework**: NestJS 11
- **ORM**: Prisma 5 + PostgreSQL
- **Auth**: JWT (access + refresh tokens) via `@nestjs/jwt` + Passport
- **Package Manager**: pnpm
- **Port**: 3000 (development), override with `PORT` env var

## Architecture

```
src/
├── app.module.ts            # Root module
├── main.ts                  # Bootstrap (port 3000)
├── core/                    # Cross-cutting infrastructure
│   ├── prisma/              # PrismaService singleton
│   ├── guards/              # JwtAuthGuard, RolesGuard, PermissionsGuard
│   ├── decorators/          # @CurrentUser, @Roles, @Permissions, @Public
│   └── interceptors/        # ResponseInterceptor (envelope wrapper)
├── common/                  # Shared utilities
│   ├── enums/               # App-wide enums
│   ├── interfaces/          # Shared TypeScript interfaces
│   └── interceptors/        # AuditInterceptor
├── integrations/
│   └── kledo/               # Kledo accounting sync (KledoService, KledoModule)
└── modules/                 # Feature modules
    ├── auth/
    │   ├── controllers/     # AuthController
    │   ├── services/        # AuthService
    │   └── strategies/      # JwtStrategy
    ├── inventory/           # Products, Stock, StockMovement, Valuation, Costing
    ├── user/                # User + Role + Permission management
    ├── finance/             # Journals, Accounts, Bank/Cash transactions
    ├── sales/               # Orders, Sales, Customers
    ├── purchasing/          # PurchaseOrder, GoodsReceipt, Suppliers
    ├── payroll/             # Payroll, Slips, Attendance, Leave
    ├── assets/              # Fixed Assets, Depreciation
    ├── pos/                 # Point-of-Sale (PosProduct has its own stok field)
    └── ...                  # Other ERP modules
```

## Key Design Decisions
- **Stock model**: Products do NOT hold stock qty directly. All stock is tracked
  per-warehouse via the `Stock` model (`productId × warehouseId`). Every stock
  change creates an immutable `StockMovement` entry.
- **PosProduct.stok**: POS-specific denormalized field — intentionally kept separate
  from warehouse stock.
- **ESM imports**: All internal imports must use `.js` extension (TypeScript ESM).
- **All imports must use new paths**: `core/prisma`, `core/guards`, `core/decorators`,
  `integrations/kledo` — never the old `database/`, `common/guards`, `modules/kledo` paths.

## Development Setup

```bash
# Install dependencies
pnpm install

# Set required secrets (DATABASE_URL, JWT_SECRET, JWT_REFRESH_SECRET)
# Use Replit Secrets tab

# Generate Prisma client
pnpm prisma generate

# Push schema to database (dev only)
pnpm prisma db push

# Run dev server (hot reload)
pnpm run start:dev

# Production build
pnpm run build && pnpm run start
```

## Required Environment Variables
| Variable             | Description                                  |
|----------------------|----------------------------------------------|
| `DATABASE_URL`       | PostgreSQL connection string (secret)        |
| `JWT_SECRET`         | JWT signing secret, min 32 chars (secret)    |
| `JWT_REFRESH_SECRET` | JWT refresh secret, min 32 chars (secret)    |
| `PORT`               | Server port (default: 3000)                  |
| `KLEDO_TOKEN`        | Kledo API bearer token (optional, secret)    |
| `KLEDO_BASE_URL`     | Kledo API base URL (optional)                |
| `FONNTE_TOKEN`       | WhatsApp gateway token (optional, secret)    |

## User Preferences
- Use pnpm (not npm/yarn)
- All imports use `.js` extension (ESM)
- NestJS `@Inject()` decorator on constructor parameters that use DI
- Indonesian language for domain-specific variable names (stok, faktur, gudang, etc.)
- Prisma Decimal fields for all monetary/quantity values
- `@db.Decimal(15, 2)` for money, `@db.Decimal(15, 4)` for qty/cost
