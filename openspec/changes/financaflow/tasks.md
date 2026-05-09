## 1. Project Setup

- [ ] 1.1 Initialize Nuxt 3 project with TypeScript
- [ ] 1.2 Configure package.json with dependencies (Prisma, @vite-pwa/nuxt, etc.)
- [ ] 1.3 Create docker-compose.yml with app, postgres, ollama services
- [ ] 1.4 Configure Prisma schema with all models (Budget, Category, Expense, Goal, Milestone, Insight, ChatMessage)
- [ ] 1.5 Create .env.example with DATABASE_URL, OLLAMA_URL
- [ ] 1.6 Setup Docker entrypoint for Prisma migrate/generate

## 2. Database & API Layer

- [ ] 2.1 Run Prisma migrate to create database tables
- [ ] 2.2 Create server/api/budgets.ts CRUD endpoints
- [ ] 2.3 Create server/api/categories.ts CRUD endpoints
- [ ] 2.4 Create server/api/expenses.ts CRUD endpoints
- [ ] 2.5 Create server/api/goals.ts CRUD endpoints
- [ ] 2.6 Create server/api/insights.ts endpoint (cached AI insights)
- [ ] 2.7 Create server/api/chat.ts endpoint (proxy to Ollama)
- [ ] 2.8 Create server/api/export.ts endpoint (CSV generation)

## 3. UI Layout & Navigation

- [ ] 3.1 Create app.vue with AppHeader and AppNav components
- [ ] 3.2 Implement responsive navigation (top horizontal on desktop, bottom bar on mobile)
- [ ] 3.3 Create theme toggle functionality with localStorage persistence
- [ ] 3.4 Setup CSS variables for light/dark themes
- [ ] 3.5 Create base layout components (Modal, Card, Button)

## 4. Dashboard Page

- [ ] 4.1 Create pages/index.vue (dashboard home)
- [ ] 4.2 Implement BudgetOverview component with progress circle
- [ ] 4.3 Implement DaysRemaining indicator
- [ ] 4.4 Implement RecentExpenses list (5 items)
- [ ] 4.5 Implement GoalsQuickView component
- [ ] 4.6 Implement InsightCard component with caching
- [ ] 4.7 Add in-app notification system

## 5. Budget Management

- [ ] 5.1 Create pages/budgets/index.vue with budget list/selector
- [ ] 5.2 Create BudgetForm component (create/edit budget)
- [ ] 5.3 Create CategoryList component with progress bars
- [ ] 5.4 Implement add/edit/remove category functionality
- [ ] 5.5 Implement budget clone feature
- [ ] 5.6 Add budget month navigation

## 6. Expense Tracking

- [ ] 6.1 Create pages/expenses/index.vue with expense list
- [ ] 6.2 Create ExpenseForm component (add/edit expense)
- [ ] 6.3 Implement filter by category
- [ ] 6.4 Implement filter by date range
- [ ] 6.5 Implement search by description
- [ ] 6.6 Create QuickAddExpense modal
- [ ] 6.7 Implement keyboard shortcut (Ctrl+N) for quick add
- [ ] 6.8 Add bulk delete functionality

## 7. Savings Goals

- [ ] 7.1 Create pages/goals/index.vue with goal cards
- [ ] 7.2 Create GoalForm component (create/edit goal)
- [ ] 7.3 Implement goal progress visualization
- [ ] 7.4 Create AddSavingsModal component
- [ ] 7.5 Implement milestone tracking (25%, 50%, 75%, 100%)
- [ ] 7.6 Add estimated completion date calculation
- [ ] 7.7 Implement goal delete with confirmation

## 8. AI Chatbot

- [ ] 8.1 Create ChatWidget component (floating button + mini panel)
- [ ] 8.2 Create pages/chat/index.vue (full chat page)
- [ ] 8.3 Implement chat message handling
- [ ] 8.4 Create system prompt with financial context
- [ ] 8.5 Implement chat history persistence in database
- [ ] 8.6 Add suggestion chips (3 quick questions)
- [ ] 8.7 Implement loading states and error handling
- [ ] 8.8 Add Ollama connection health check

## 9. Proactive Insights

- [ ] 9.1 Implement background insight generation endpoint
- [ ] 9.2 Create insight caching in database
- [ ] 9.3 Add insight freshness check (6 hour threshold)
- [ ] 9.4 Implement skeleton loading state for insight card
- [ ] 9.5 Add animation for new insight arrival
- [ ] 9.6 Handle "insufficient data" fallback message

## 10. PWA Configuration

- [ ] 10.1 Configure @vite-pwa/nuxt with manifest
- [ ] 10.2 Create service worker for read-only offline
- [ ] 10.3 Add app icons and splash screens
- [ ] 10.4 Implement "Install App" prompt
- [ ] 10.5 Configure cache strategy for API responses

## 11. Data Export

- [ ] 11.1 Implement CSV generation in /api/export
- [ ] 11.2 Add export button to expenses page
- [ ] 11.3 Implement date range filter in export
- [ ] 11.4 Add category filter in export
- [ ] 11.5 Handle empty data state

## 12. Polish & Testing

- [ ] 12.1 Add loading skeletons throughout app
- [ ] 12.2 Implement form validation with error messages
- [ ] 12.3 Add empty states for all lists
- [ ] 12.4 Test offline mode behavior
- [ ] 12.5 Test PWA installation
- [ ] 12.6 Test Docker Compose startup
- [ ] 12.7 Test Ollama integration