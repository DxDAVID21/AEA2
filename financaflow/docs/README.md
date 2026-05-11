# FinançaFlow - Documentación del Proyecto

## Tabla de Contenidos

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Arquitectura de la Aplicación](#arquitectura-de-la-aplicación)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Configuración y Ejecución con Docker](#configuración-y-ejecución-con-docker)
6. [Configuración de la IA (Ollama)](#configuración-de-la-ia-ollama)
7. [Base de Datos y Prisma](#base-de-datos-y-prisma)
8. [API Endpoints](#api-endpoints)
9. [Solución de Problemas](#solución-de-problemas)

---

## Descripción del Proyecto

**FinançaFlow** es una aplicación web progresiva (PWA) de gestión de finanzas personales con un asistente de IA integrado. La aplicación permite a los usuarios:

- 📊 **Gestionar presupuestos** mensuales con categorías de gastos
- 💰 **Controlar gastos** categorizados y visualizados
- 🎯 **Establecer objetivos de ahorro** con seguimiento de progreso
- 🤖 **Chat con IA** para obtener consejos financieros personalizados en catalán
- 💡 **Obtener insights** automáticos sobre patrones de gasto

---

## Tecnologías Utilizadas

### Frontend
| Tecnología | Versión | Uso |
|------------|---------|-----|
| **Nuxt 3** | ^3.14.0 | Framework full-stack |
| **Vue 3** | ^3.5.0 | Componentes UI |
| **Vue Router** | ^4.4.0 | Navegación |
| **@vite-pwa/nuxt** | ^0.10.0 | Progressive Web App |

### Backend
| Tecnología | Versión | Uso |
|------------|---------|-----|
| **Nitro** | (incluido en Nuxt) | Servidor API |
| **Prisma** | ^5.22.0 | ORM de base de datos |

### Base de Datos
| Tecnología | Uso |
|------------|-----|
| **PostgreSQL 16** | Base de datos relacional |

### IA/LLM
| Tecnología | Uso |
|------------|-----|
| **Ollama** | Servidor local de modelos LLM |
| **Llama 3.1** | Modelo de lenguaje (8B parámetros) |

### Contenedores
| Tecnología | Uso |
|------------|-----|
| **Docker** | Containerización |
| **Docker Compose** | Orquestación de servicios |

---

## Arquitectura de la Aplicación

```
┌─────────────────────────────────────────────────────────────┐
│                      Docker Compose                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐  │
│  │    App      │     │      DB     │     │   Ollama    │  │
│  │  (Nuxt 3)   │────▶│ (PostgreSQL)│     │   (LLM)     │  │
│  │  :3000      │     │  :5432      │     │  :11434     │  │
│  └─────────────┘     └─────────────┘     └─────────────┘  │
│         │                                        │          │
│         └────────────────┬─────────────────────┘          │
│                          │                                  │
│                    ┌─────▼─────┐                           │
│                    │  PWA UI   │                           │
│                    └───────────┘                           │
└─────────────────────────────────────────────────────────────┘
```

### Flujo de Datos

1. **Usuario** interactúa con la interfaz PWA
2. **Nuxt/Nitro** recibe las peticiones y procesa la lógica
3. **Prisma** comunica con **PostgreSQL** para operaciones CRUD
4. **Chat API** se comunica con **Ollama** para respuestas de IA
5. Las respuestas fluyen de vuelta al usuario

---

## Estructura del Proyecto

```
financaflow/
├── .nuxt/                  # Build generado por Nuxt
├── components/             # Componentes Vue
│   ├── budget/             # Componentes de presupuesto
│   ├── dashboard/          # Componentes del dashboard
│   ├── expense/            # Componentes de gastos
│   ├── goal/               # Componentes de objetivos
│   ├── ChatWidget.vue      # Widget de chat con IA
│   └── ...
├── composables/            # Composables de Vue
│   ├── useApi.ts           # Utilidades para llamadas API
│   ├── useNotifications.ts # Sistema de notificaciones
│   └── useTheme.ts         # Gestión de tema
├── layouts/                # Layouts de Nuxt
│   └── default.vue         # Layout principal
├── pages/                  # Páginas de la aplicación
│   ├── index.vue           # Dashboard principal
│   ├── expenses/           # Gestión de gastos
│   ├── goals/              # Objetivos de ahorro
│   └── chat/               # Chat con IA
├── public/                 # Archivos estáticos
│   ├── icon-192.png        # Iconos PWA
│   └── icon-512.png
├── server/                  # Servidor y API
│   ├── api/                # Endpoints de API
│   │   ├── budgets/        # API de presupuestos
│   │   ├── categories/     # API de categorías
│   │   ├── chat.post.ts    # Chat con IA
│   │   ├── expenses/       # API de gastos
│   │   ├── goals/          # API de objetivos
│   │   └── insights/       # API de insights
│   └── utils/
│       └── prisma.ts       # Cliente Prisma
├── prisma/                  # Configuración de Prisma
│   ├── schema.prisma        # Esquema de base de datos
│   └── ...
├── docs/                    # Documentación
├── Dockerfile               # Imagen Docker de la app
├── docker-compose.yml       # Orquestación de servicios
├── package.json             # Dependencias npm
├── nuxt.config.ts           # Configuración de Nuxt
└── tsconfig.json           # Configuración de TypeScript
```

---

## Configuración y Ejecución con Docker

### Requisitos Previos

- Docker Desktop instalado
- Docker Compose instalado
- Al menos 6GB de RAM disponibles (para Ollama + modelo)

### Inicialización Rápida

```bash
# 1. Navegar al directorio del proyecto
cd financaflow

# 2. Construir y ejecutar los contenedores
docker compose build --no-cache
docker compose up -d

# 3. Verificar que los servicios estén corriendo
docker compose ps
```

### Servicios Disponibles

| Servicio | Puerto | URL |
|----------|--------|-----|
| **App** | 3000 | http://localhost:3000 |
| **PostgreSQL** | 5432 | localhost:5432 |
| **Ollama** | 11434 | http://localhost:11434 |

---

## Configuración de la IA (Ollama)

### ⚠️ IMPORTANTE: Instalación del Modelo

Por defecto, Ollama se inicia **sin modelos instalados**. Para que el chat con IA funcione, debes descargar un modelo manualmente.

### Pasos para Instalar el Modelo

#### Opción 1: Entrar al Contenedor de Ollama

```bash
# Ver los contenedores activos
docker compose ps

# Entrar al contenedor de Ollama de forma interactiva
docker compose exec -it ollama /bin/sh

# Dentro del contenedor, descargar el modelo
ollama pull llama3.1:8b

# Salir del contenedor
exit
```

#### Opción 2: Ejecutar Directamente (sin entrar al shell)

```bash
docker compose exec ollama ollama pull llama3.1:8b
```

### Verificar Modelos Instalados

```bash
# Ver modelos disponibles en Ollama
docker compose exec ollama ollama list
```

Debería mostrar algo como:
```
NAME            ID          SIZE      MODIFIED
llama3.1:8b     abc123...   4.7GB     2 minutes ago
```

### Modelos Recomendados

| Modelo | Tamaño | Calidad Catalán | Uso Recomendado |
|--------|--------|-----------------|-----------------|
| `llama3.2:1b` | ~800MB | ❌ Básica | Desarrollo/PCs con poca RAM |
| `llama3.1:8b` | ~4.7GB | ✅ Buena | **Recomendado** |
| `llama3.2:7b` | ~4GB | ✅ Buena | Balance calidad/recursos |
| `mistral:7b` | ~4GB | ✅ Buena | Multilingüe |

### Cambiar el Modelo en el Código

Si quieres usar un modelo diferente al configurado por defecto, edita `server/api/chat.post.ts`:

```typescript
const response = await $fetch<{ message: { content: string } }>(`${config.public.ollamaUrl}/api/chat`, {
  method: 'POST',
  body: {
    model: 'tu-modelo-aqui',  // Cambiar aquí
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages
    ],
    stream: false
  },
  timeout: 60000
})
```

---

## Base de Datos y Prisma

### Esquema de Base de Datos

El proyecto usa **Prisma** como ORM con las siguientes tablas:

```prisma
model Budget {        // Presupuesto mensual
  id        Int       @id @default(autoincrement())
  month     Int
  year      Int
  categories Category[]
  @@unique([month, year])
}

model Category {      // Categoría de gasto
  id        Int      @id @default(autoincrement())
  budgetId  Int
  name      String
  limit     Float
  color     String
  icon      String
  expenses  Expense[]
  budget    Budget    @relation(fields: [budgetId], references: [id])
}

model Expense {       // Gasto individual
  id          Int      @id @default(autoincrement())
  categoryId  Int
  amount      Float
  description String
  date        DateTime
  category    Category @relation(...)
}

model Goal {         // Objetivo de ahorro
  id            Int       @id @default(autoincrement())
  name          String
  targetAmount  Float
  currentAmount Float     @default(0)
  targetDate    DateTime?
  milestones    Milestone[]
}

model Insight {      // Análisis automático
  id          Int      @id @default(autoincrement())
  type        String
  content     String
  generatedAt DateTime
  isRead      Boolean  @default(false)
}

model ChatMessage {  // Historial del chat
  id        Int       @id @default(autoincrement())
  role      String
  content   String
  createdAt DateTime  @default(now())
}
```

### Migraciones Automáticas

La aplicación está configurada para **crear automáticamente las tablas** cuando el contenedor se inicia. Esto ocurre en el script `scripts/entrypoint.sh`:

```bash
#!/bin/sh
set -e

echo "Applying database schema..."
npx prisma db push --accept-data-loss

echo "Starting FinançaFlow..."
exec "$@"
```

Este script:
1. Es ejecutado automáticamente al iniciar el contenedor
2. Sincroniza el esquema de Prisma con la base de datos
3. Crea las tablas si no existen
4. Inicia la aplicación

### Comandos de Prisma Útiles

```bash
# Aplicar cambios del esquema a la BD
docker compose exec app npx prisma db push

# Regenerar el cliente de Prisma
docker compose exec app npx prisma generate

# Abrir Prisma Studio (GUI)
docker compose exec app npx prisma studio
```

---

## API Endpoints

### Budgets

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/budgets/get?month=X&year=Y` | Obtener presupuesto del mes |
| `GET` | `/api/budgets/list` | Listar todos los presupuestos |
| `POST` | `/api/budgets` | Crear presupuesto |
| `PUT` | `/api/budgets/[id]` | Actualizar presupuesto |
| `DELETE` | `/api/budgets/[id]` | Eliminar presupuesto |

### Categories

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/categories` | Listar categorías |
| `POST` | `/api/categories` | Crear categoría |
| `PUT` | `/api/categories/[id]` | Actualizar categoría |
| `DELETE` | `/api/categories/[id]` | Eliminar categoría |

### Expenses

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/expenses` | Listar gastos |
| `POST` | `/api/expenses` | Crear gasto |
| `PUT` | `/api/expenses/[id]` | Actualizar gasto |
| `DELETE` | `/api/expenses/[id]` | Eliminar gasto |
| `POST` | `/api/expenses/bulk-delete` | Eliminar varios gastos |

### Goals

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/goals` | Listar objetivos |
| `POST` | `/api/goals` | Crear objetivo |
| `PUT` | `/api/goals/[id]` | Actualizar objetivo |
| `DELETE` | `/api/goals/[id]` | Eliminar objetivo |

### Chat (IA)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/api/chat` | Enviar mensaje al asistente IA |
| `GET` | `/api/chat/history` | Obtener historial de chat |
| `POST` | `/api/chat/save` | Guardar mensaje en historial |
| `GET` | `/api/chat/health` | Verificar estado de Ollama |

### Insights

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/insights` | Obtener insights generados |
| `POST` | `/api/insights/generate` | Generar nuevos insights |

---

## Solución de Problemas

### ❌ "relation does not exist"

**Problema:** Las tablas de la base de datos no existen.

**Solución:**
```bash
# Reiniciar los contenedores
docker compose down
docker compose up -d
```

El script de entrada (`entrypoint.sh`) debería crear las tablas automáticamente.

---

### ❌ "Failed to get response from AI assistant"

**Problema:** Ollama no tiene modelos instalados o el modelo especificado no existe.

**Solución:**

1. Verificar que Ollama esté corriendo:
   ```bash
   docker compose ps
   ```

2. Instalar el modelo:
   ```bash
   docker compose exec ollama ollama pull llama3.1:8b
   ```

3. Verificar modelos instalados:
   ```bash
   docker compose exec ollama ollama list
   ```

4. Verificar el modelo en el código (`server/api/chat.post.ts` línea 25)

---

### ❌ "Unique constraint failed on the fields: (`month`,`year`)"

**Problema:** Ya existe un presupuesto para ese mes y año.

**Solución:** El código ya maneja esto con `upsert`. Si sigues viendo errores, verifica que no haya datos duplicados en la base de datos.

---

### ❌ Error de conexión a la base de datos

**Problema:** No se puede conectar a PostgreSQL.

**Solución:**
1. Verificar que el contenedor de DB esté corriendo:
   ```bash
   docker compose ps
   ```

2. Verificar los logs:
   ```bash
   docker compose logs db
   ```

3. Verificar la variable DATABASE_URL en docker-compose.yml

---

### 🆘 Ver Todos los Logs

```bash
# Ver logs de todos los servicios
docker compose logs

# Ver logs de un servicio específico
docker compose logs app
docker compose logs db
docker compose logs ollama

# Ver logs en tiempo real
docker compose logs -f
```

---

## Variables de Entorno

| Variable | Valor por Defecto | Descripción |
|----------|-------------------|-------------|
| `DATABASE_URL` | `postgresql://financaflow:financaflow@db:5432/financaflow` | URL de PostgreSQL |
| `OLLAMA_URL` | `http://ollama:11434` | URL del servidor Ollama |
| `NODE_ENV` | `production` | Entorno de Node |
| `PORT` | `3000` | Puerto de la aplicación |

---

## Licencia

MIT License - FinançaFlow