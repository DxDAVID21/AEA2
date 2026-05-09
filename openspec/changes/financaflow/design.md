## Context

FinançaFlow is a new greenfield project aiming to provide a simple, offline-capable personal finance PWA with AI-powered insights. The application will be built with Nuxt 3, using a serverless architecture pattern with Nitro for API routes, PostgreSQL for data persistence, and Ollama (Llama 3.1 8B) for AI capabilities.

### Current State
- Empty repository (fresh start)
- OpenSpec workflow configured with spec-driven schema
- Docker and Docker Compose available

### Constraints
- **No authentication**: Single-user, local data storage
- **Self-hosted AI**: Ollama with Llama 3.1 8B running in Docker
- **Serverless patterns**: Nuxt server routes as API endpoints
- **Offline-first**: PWA with read-only offline capability

### Stakeholders
- Single user (personal use case)

## Goals / Non-Goals

**Goals:**
- Simple, intuitive UI for budget and savings management
- Effective AI chatbot integration (reactive + proactive)
- Reliable data persistence with PostgreSQL
- Offline-capable PWA for mobile use
- Clean visual design with dark mode support
- CSV export for data portability

**Non-Goals:**
- User authentication/accounts
- Multi-user support
- Real-time synchronization
- Full offline write support
- Cloud deployment
- Complex reporting/analytics
- Investment tracking

## Decisions

### Decision 1: Nuxt 3 over Next.js or plain Vue

**Chosen:** Nuxt 3

**Rationale:**
- Built-in PWA support via `@vite-pwa/nuxt`
- File-based routing reduces boilerplate
- Server routes (Nitro) handle API without separate backend
- TypeScript-first with good DX
- Easier Docker containerization

**Alternatives considered:**
- Next.js: More complex, better for large apps but overkill here
- Plain Vue + Vite: More flexibility but loses Nuxt conventions

---

### Decision 2: PostgreSQL over SQLite

**Chosen:** PostgreSQL

**Rationale:**
- Better for Docker Compose setup (single container, persistent)
- SQL standard compliance for complex queries
- Future-proof if features expand
- Prisma has excellent PostgreSQL support

**Alternatives considered:**
- SQLite: Simpler but less robust for Docker, limited concurrent access

---

### Decision 3: Ollama (Llama 3.1 8B) for AI

**Chosen:** Ollama with Llama 3.1 8B, containerized in Docker

**Rationale:**
- Runs locally, no API costs or rate limits
- Llama 3.1 8B is powerful enough for insight generation
- Ollama provides simple REST API
- Containerized for easy setup

**Implementation approach:**
- API endpoint (`/api/chat`) proxies to Ollama
- Proactive insights generated in background, cached in DB
- User never waits for AI response on page load

---

### Decision 4: Prisma as ORM

**Chosen:** Prisma

**Rationale:**
- Type-safe queries with TypeScript
- Great migration support
- Clean schema definition
- Works well with PostgreSQL

**Alternatives considered:**
- Drizzle: More modern but steeper learning curve
- Raw SQL: Too error-prone

---

### Decision 5: PWA Strategy — Read-Only Offline

**Chosen:** Read-only offline with service worker caching

**Rationale:**
- Write operations require server (no offline writes)
- Read operations cached for offline viewing
- Simpler implementation, reliable behavior
- Data integrity maintained

**Alternatives considered:**
- Full offline with sync: Complex conflict resolution, not needed for single-user

---

### Decision 6: API Design — REST with Server Routes

**Chosen:** RESTful API via Nuxt server routes

```
/api/budgets        GET, POST, PUT, DELETE
/api/categories     GET, POST, PUT, DELETE
/api/expenses       GET, POST, PUT, DELETE
/api/goals          GET, POST, PUT, DELETE
/api/chat           POST (proxy to Ollama)
/api/insights       GET (cached AI insights)
/api/export         GET (CSV export)
```

**Rationale:**
- Simple, familiar pattern
- Works well with Nuxt server routes
- No GraphQL overhead needed for this scope

---

### Decision 7: Chatbot Architecture

**Chosen:** Dual presence (floating widget + dedicated page) + proactive dashboard insights

```
┌─────────────────────────────────────────────────────────┐
│                    CHATBOT ARCHITECTURE                 │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐        ┌──────────────┐              │
│  │  Dashboard   │───────▶│ AI Insights  │              │
│  │  (Home)      │        │ (Background) │              │
│  └──────────────┘        └──────────────┘              │
│          │                       │                      │
│          │                       │ Cache               │
│          ▼                       ▼                      │
│  ┌──────────────────────────────────────────┐          │
│  │              Insight Cards                │          │
│  │  "Reduce Oci by 20€ to stay on track"   │          │
│  └──────────────────────────────────────────┘          │
│                                                          │
│  ┌──────────────┐        ┌──────────────┐              │
│  │  Chat Page   │◀──────▶│   Ollama     │              │
│  │  (Full UI)   │  API   │  (Llama 3.1) │              │
│  └──────────────┘        └──────────────┘              │
│          │                                               │
│          │                                               │
│  ┌──────────────┐                                       │
│  │  Chat Widget │ (floating button, any page)          │
│  │  (Mini UI)   │                                       │
│  └──────────────┘                                       │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Proactive insights flow:**
1. Page loads → UI renders immediately (no waiting)
2. If cached insight exists (fresh < 1 hour), display it
3. Background: trigger insight generation via Ollama
4. When complete, update insight card with animation

---

## Data Model

```
┌─────────────────────────────────────────────────────────┐
│                      DATA MODEL                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────┐       ┌─────────────┐                  │
│  │  Budget     │       │  Category   │                  │
│  ├─────────────┤       ├─────────────┤                  │
│  │ id          │       │ id          │                  │
│  │ month       │◀──────│ budgetId    │                  │
│  │ year        │       │ name        │                  │
│  │ createdAt   │       │ limit       │                  │
│  └─────────────┘       │ color       │                  │
│         │              │ icon        │                  │
│         │              └─────────────┘                  │
│         │                    │                          │
│         │                    │ 1:N                       │
│         ▼                    ▼                          │
│  ┌─────────────────────────────────────┐                │
│  │            Expense                  │                │
│  ├─────────────────────────────────────┤                │
│  │ id                                  │                │
│  │ categoryId  (FK)                    │                │
│  │ amount                               │                │
│  │ description                          │                │
│  │ date                                 │                │
│  │ createdAt                            │                │
│  └─────────────────────────────────────┘                │
│                                                          │
│  ┌─────────────┐       ┌─────────────┐                  │
│  │   Goal     │       │  Milestone   │                  │
│  ├─────────────┤       ├─────────────┤                │
│  │ id          │──1:N──│ goalId       │                │
│  │ name        │       │ amount       │                │
│  │ targetAmount│       │ description  │                │
│  │ currentAmount       │ achievedAt   │                │
│  │ targetDate  │       └─────────────┘                │
│  │ icon        │                                       │
│  │ color       │       ┌─────────────┐                │
│  │ createdAt   │       │  Insight    │                │
│  └─────────────┘       ├─────────────┤                │
│                        │ id          │                │
│                        │ type        │                │
│                        │ content     │                │
│                        │ generatedAt  │                │
│                        │ isRead      │                │
│                        └─────────────┘                │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## UI Structure

```
┌─────────────────────────────────────────────────────────┐
│                      PWA LAYOUT                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │ AppHeader: Logo | Settings | Theme Toggle       │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │                                                 │   │
│  │              <router-view>                      │   │
│  │                                                 │   │
│  │   ┌─────────────────────────────────────────┐  │   │
│  │   │  / (Dashboard)                          │  │   │
│  │   │  - Budget overview                      │  │   │
│  │   │  - AI Insight card                     │  │   │
│  │   │  - Goals progress                       │  │   │
│  │   │  - Recent expenses                      │  │   │
│  │   └─────────────────────────────────────────┘  │   │
│  │                                                 │   │
│  │   ┌─────────────────────────────────────────┐  │   │
│  │   │  /budgets                               │  │   │
│  │   │  - Budget list by month                │  │   │
│  │   │  - Create/edit budget                  │  │   │
│  │   └─────────────────────────────────────────┘  │   │
│  │                                                 │   │
│  │   ┌─────────────────────────────────────────┐  │   │
│  │   │  /expenses                              │  │   │
│  │   │  - Expense list with filters           │  │   │
│  │   │  - Add/Edit expense modal              │  │   │
│  │   └─────────────────────────────────────────┘  │   │
│  │                                                 │   │
│  │   ┌─────────────────────────────────────────┐  │   │
│  │   │  /goals                                 │  │   │
│  │   │  - Goal cards with progress            │  │   │
│  │   │  - Create/edit goal modal              │  │   │
│  │   └─────────────────────────────────────────┘  │   │
│  │                                                 │   │
│  │   ┌─────────────────────────────────────────┐  │   │
│  │   │  /chat                                  │  │   │
│  │   │  - Full chat interface                  │  │   │
│  │   │  - Message history                      │  │   │
│  │   └─────────────────────────────────────────┘  │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │ AppNav: Dashboard | Budgets | Expenses | Goals │   │
│  │         | Chat                                   │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │ ChatWidget: 💬 (floating, persistent)          │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Docker Architecture

```yaml
services:
  app:
    # Nuxt 3 application
    ports: [3000:3000]
    depends_on: [db]
    environment:
      DATABASE_URL: postgresql://user:pass@db:5432/financaflow

  db:
    # PostgreSQL database
    image: postgres:16
    volumes: [pgdata:/var/lib/postgresql/data]
    environment:
      POSTGRES_DB: financaflow
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass

  ollama:
    # Ollama with Llama 3.1
    image: ollama/ollama
    ports: [11434:11434]
    volumes: [ollamadata:/root/.ollama]
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia.com/gpu
              count: 1
              capabilities: [gpu]

volumes:
  pgdata:
  ollamadata:
```

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|------|--------|------------|
| Ollama slow on CPU-only | User experience degraded | Show cached insights, lazy-load new ones |
| GPU memory insufficient | Ollama crashes | Use 8B model (quantized), fallback message |
| Data loss on device | User loses all data | Implement CSV export, consider localStorage backup |
| Service worker caching stale data | Offline shows old info | Show "offline" indicator, clear cache on data change |
| Database migration issues | App fails to start | Use Prisma migrate in docker-entrypoint |
| PWA installation friction | Users don't install | Add prominent "Install app" prompt |

## Migration Plan

This is a greenfield project — no migration needed.

**Deployment steps:**
1. `docker compose up -d` starts all services
2. Prisma generates client and runs migrations
3. Nuxt app builds and serves on port 3000
4. Ollama model pulled on first request to `/api/chat`

## Open Questions

1. **Theme persistence**: Should dark mode preference sync across devices? (No auth = localStorage only)
2. **Insight freshness**: How often should proactive insights regenerate? (Current: every 6 hours)
3. **Chat history**: Store chat messages in DB or keep in localStorage? (Proposal: DB for persistence)
4. **CSV export scope**: Export all data or filter by date range? (Proposal: all data for simplicity)