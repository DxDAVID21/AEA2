## Why

Many people struggle to manage their monthly budgets and savings goals without complex spreadsheets or expensive apps. There's a need for a simple, personal finance tool that combines budget tracking, savings goals, and AI-powered insights—all accessible offline and without account creation. FinançaFlow addresses this by providing a serverless PWA with an intelligent chatbot that helps users understand their spending patterns and plan their finances proactively.

## What Changes

- **New PWA Application**: A complete personal finance management application built with Nuxt 3, deployable as a Progressive Web App
- **Budget Management**: Create monthly budgets with customizable categories and spending limits
- **Expense Tracking**: Record, edit, and delete expenses with categorization
- **Savings Goals**: Define savings goals with milestones and track progress over time
- **AI Chatbot**: Integrated chatbot with both reactive (user-initiated) and proactive (dashboard insights) capabilities powered by Ollama (Llama 3.1)
- **Visual Dashboard**: Clean, minimal dashboard showing budget status, savings progress, and AI-generated insights
- **Data Export**: Export expenses to CSV format
- **Dark Mode**: Theme switching support
- **Offline Support**: Read-only offline access to cached data
- **Web Notifications**: In-app notifications for budget alerts

## Capabilities

### New Capabilities

- `budget-management`: Monthly budget creation with customizable categories, spending limits, and progress tracking
- `expense-tracking`: CRUD operations for expenses with category assignment and date tracking
- `savings-goals`: Goal creation with target amounts, milestones, and progress visualization
- `ai-chatbot`: Conversational AI assistant using Ollama for budget advice, goal planning, and proactive insights
- `dashboard`: Visual overview of financial status with charts, progress indicators, and AI-generated suggestions
- `data-export`: CSV export functionality for expense records

### Modified Capabilities

None. This is a new greenfield project.

## Impact

- **New Dependencies**: Nuxt 3, PostgreSQL, Ollama (Llama 3.1 8B), Docker & Docker Compose
- **New Services**: API endpoints for budgets, categories, expenses, goals, chat, and insights
- **New UI Components**: Dashboard, Budget manager, Expense list, Goals tracker, Chat widget, Settings page
- **Infrastructure**: Docker Compose with Nuxt app, PostgreSQL database, and Ollama service