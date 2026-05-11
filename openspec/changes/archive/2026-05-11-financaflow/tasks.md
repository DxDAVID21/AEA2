## 1. Project Setup

- [x] 1.1 Initialize Nuxt 3 project with TypeScript
- [x] 1.2 Configure package.json with dependencies (Prisma, @vite-pwa/nuxt, etc.)
- [x] 1.3 Create docker-compose.yml with app, postgres, ollama services
- [x] 1.4 Configure Prisma schema with all models (Budget, Category, Expense, Goal, Milestone, Insight, ChatMessage)
- [x] 1.5 Create .env.example with DATABASE_URL, OLLAMA_URL
- [x] 1.6 Setup Docker entrypoint for Prisma migrate/generate

## 2. Database & API Layer

- [x] 2.1 Run Prisma migrate to create database tables
- [x] 2.2 Create server/api/budgets.ts CRUD endpoints
- [x] 2.3 Create server/api/categories.ts CRUD endpoints
- [x] 2.4 Create server/api/expenses.ts CRUD endpoints
- [x] 2.5 Create server/api/goals.ts CRUD endpoints
- [x] 2.6 Create server/api/insights.ts endpoint (cached AI insights)
- [x] 2.7 Create server/api/chat.ts endpoint (proxy to Ollama)
- [x] 2.8 Create server/api/export.ts endpoint (CSV generation)

## 3. UI Layout & Navigation

- [x] 3.1 Create app.vue with AppHeader and AppNav components
- [x] 3.2 Implement responsive navigation (top horizontal on desktop, bottom bar on mobile)
- [x] 3.3 Create theme toggle functionality with localStorage persistence
- [x] 3.4 Setup CSS variables for light/dark themes
- [x] 3.5 Create base layout components (Modal, Card, Button)

## 4. Dashboard Page

- [x] 4.1 Create pages/index.vue (dashboard home)
- [x] 4.2 Implement BudgetOverview component with progress circle
- [x] 4.3 Implement DaysRemaining indicator
- [x] 4.4 Implement RecentExpenses list (5 items)
- [x] 4.5 Implement GoalsQuickView component
- [x] 4.6 Implement InsightCard component with caching
- [x] 4.7 Add in-app notification system

## 5. Budget Management

- [x] 5.1 Create pages/budgets/index.vue with budget list/selector
- [x] 5.2 Create BudgetForm component (create/edit budget)
- [x] 5.3 Create CategoryList component with progress bars
- [x] 5.4 Implement add/edit/remove category functionality
- [x] 5.5 Implement budget clone feature
- [x] 5.6 Add budget month navigation

## 6. Expense Tracking

- [x] 6.1 Create pages/expenses/index.vue with expense list
- [x] 6.2 Create ExpenseForm component (add/edit expense)
- [x] 6.3 Implement filter by category
- [x] 6.4 Implement filter by date range
- [x] 6.5 Implement search by description
- [x] 6.6 Create QuickAddExpense modal
- [x] 6.7 Implement keyboard shortcut (Ctrl+N) for quick add
- [x] 6.8 Add bulk delete functionality

## 7. Savings Goals

- [x] 7.1 Create pages/goals/index.vue with goal cards
- [x] 7.2 Create GoalForm component (create/edit goal)
- [x] 7.3 Implement goal progress visualization
- [x] 7.4 Create AddSavingsModal component
- [x] 7.5 Implement milestone tracking (25%, 50%, 75%, 100%)
- [x] 7.6 Add estimated completion date calculation
- [x] 7.7 Implement goal delete with confirmation

## 8. AI Chatbot

- [x] 8.1 Create ChatWidget component (floating button + mini panel)
- [x] 8.2 Create pages/chat/index.vue (full chat page)
- [x] 8.3 Implement chat message handling
- [x] 8.4 Create system prompt with financial context
- [x] 8.5 Implement chat history persistence in database
- [x] 8.6 Add suggestion chips (3 quick questions)
- [x] 8.7 Implement loading states and error handling
- [x] 8.8 Add Ollama connection health check

## 9. Proactive Insights

- [x] 9.1 Implement background insight generation endpoint
- [x] 9.2 Create insight caching in database
- [x] 9.3 Add insight freshness check (6 hour threshold)
- [x] 9.4 Implement skeleton loading state for insight card
- [x] 9.5 Add animation for new insight arrival
- [x] 9.6 Handle "insufficient data" fallback message

## 10. PWA Configuration

- [x] 10.1 Configure @vite-pwa/nuxt with manifest
- [x] 10.2 Create service worker for read-only offline
- [x] 10.3 Add app icons and splash screens
- [x] 10.4 Implement "Install App" prompt
- [x] 10.5 Configure cache strategy for API responses

## 11. Data Export

- [x] 11.1 Implement CSV generation in /api/export
- [x] 11.2 Add export button to expenses page
- [x] 11.3 Implement date range filter in export
- [x] 11.4 Add category filter in export
- [x] 11.5 Handle empty data state

## 12. Polish & Testing

- [x] 12.1 Add loading skeletons throughout app
- [x] 12.2 Implement form validation with error messages
- [x] 12.3 Add empty states for all lists
- [ ] 12.4 Test offline mode behavior
- [ ] 12.5 Test PWA installation
- [ ] 12.6 Test Docker Compose startup
- [ ] 12.7 Test Ollama integration