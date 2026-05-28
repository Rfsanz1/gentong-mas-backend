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
├── main.ts                  # Bootstrap — global filter, pipes, interceptors
├── app.module.ts            # Root module — all feature modules + global providers
│
├── core/                    # Cross-cutting infrastructure (single source of truth)
│   ├── prisma/              # PrismaService singleton
│   ├── guards/              # JwtAuthGuard, RouteRoleGuard, CanAccessGuard, PermissionsGuard
│   ├── decorators/          # @CurrentUser, @Roles, @Permissions, @CanAccess, @Public
│   ├── interceptors/        # ResponseInterceptor (envelope), AuditInterceptor
│   ├── filters/             # GlobalExceptionFilter
│   └── config/              # configuration() factory (JWT, DB, Kledo, Fonnte, rate-limit)
│
├── common/                  # Shared domain utilities
│   ├── enums/               # CostingMethod, TaxType, AccountType, JournalStatus, etc.
│   ├── interfaces/          # PaginatedResult, JwtUser, ApiResponse
│   ├── types/               # StockMovementType, ReferenceType, SortOrder, etc.
│   ├── helpers/             # paginate(), paginateResult()
│   ├── constants/           # ERP_ROLES, ROLE_GROUPS
│   └── utils/               # canAccess()
│
├── modules/                 # Feature modules (domain-driven)
│   ├── auth/                # JWT login, refresh, register, profile
│   ├── user/                # User CRUD + password management
│   ├── role/                # Role & Permission management
│   │
│   ├── inventory/           # Products, Warehouses, Stock, Opname
│   │   └── stock/           # CostingService (FIFO/avg), ValuationService, LandedCostService
│   │
│   ├── sales/               # Sales Orders, Invoices
│   ├── purchasing/          # Purchase Orders, Goods Receipt
│   ├── customers/           # Customer master data
│   │
│   ├── finance/             # Double-entry accounting
│   │   ├── accounts/        # AccountService, BudgetService, CreditLimitService
│   │   ├── journals/        # JournalService, LedgerService, AutoJournalService
│   │   ├── reports/         # FinancialReportService (balance sheet, P&L, cash flow)
│   │   └── aging/           # ARAgingService, APAgingService
│   │
│   ├── tax/                 # Tax engine + e-Faktur
│   ├── payroll/             # Payroll periods + salary slips
│   ├── hr/                  # Employee master data
│   ├── leave/               # Leave requests
│   ├── recruitment/         # Hiring pipeline
│   ├── asset/               # Fixed assets + depreciation
│   ├── pos/                 # Point of Sale
│   ├── manufacturing/       # Bill of Materials, Production Orders
│   ├── quality/             # Quality Control
│   ├── maintenance/         # Asset maintenance
│   ├── fleet/               # Vehicle management
│   ├── crm/                 # Leads & opportunities
│   ├── project/             # Project tracking
│   ├── helpdesk/            # Support tickets
│   ├── branch/              # Company & branch master data
│   ├── driver-areas/        # Delivery area management
│   ├── settings/            # System settings
│   ├── dashboard/           # Aggregated stats per role
│   ├── audit/               # Audit log viewer
│   └── notification/        # WebSocket notifications
│
├── integrations/            # Third-party connectors
│   ├── kledo/               # Kledo accounting sync
│   ├── whatsapp/            # (reserved — Fonnte)
│   ├── marketplace/         # (reserved)
│   ├── payment-gateway/     # (reserved)
│   └── shipping/            # (reserved)
│
└── jobs/                    # Background processing (reserved)
    ├── queues/
    ├── workers/
    └── schedulers/
```

## Key Design Decisions
- **Stock model**: Products do NOT hold stock qty directly. All stock is tracked
  per-warehouse via the `Stock` model (`productId × warehouseId`). Every stock
  change creates an immutable `StockMovement` entry.
- **PosProduct.stok**: POS-specific denormalized field — intentionally kept separate
  from warehouse stock.
- **ESM imports**: All internal imports must use `.js` extension (TypeScript ESM).
- **Import paths**: Always use `core/` and `common/` — never `common/guards` or `common/decorators`
  (those duplicates have been removed).
- **Global providers in AppModule**: JwtAuthGuard (APP_GUARD), RouteRoleGuard (APP_GUARD),
  AuditInterceptor (APP_INTERCEPTOR).

## Development Setup

```bash
pnpm install
pnpm prisma generate
pnpm prisma db push
pnpm run start:dev
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

## API Endpoints
- `GET /api/health` — health check (public)
- `POST /api/auth/login` — login, returns access + refresh token
- `POST /api/auth/register` — register user
- `POST /api/auth/refresh` — refresh access token
- `GET /api/auth/profile` — current user profile
- `GET /docs` — Swagger UI (all endpoints documented)

## User Preferences
- Use pnpm (not npm/yarn)
- All imports use `.js` extension (ESM)
- NestJS `@Inject()` decorator on constructor parameters that use DI
- Indonesian language for domain-specific variable names (stok, faktur, gudang, etc.)
- Prisma Decimal fields for all monetary/quantity values
- `@db.Decimal(15, 2)` for money, `@db.Decimal(15, 4)` for qty/cost
- Respond in Bahasa Indonesia
