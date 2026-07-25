# SmartTransit Master Implementation Plan & System Diagrams

This document houses the complete system architecture, data models, and workflow diagrams for all features implemented inside the SmartTransit Cloud SaaS platform.

---

## 1. System Architecture Diagram

This maps the network requests boundary, caching nodes, and database isolation constraints.

```mermaid
graph TD
  User[Browser Client] -->|HTTPS Port 80| Proxy[Nginx Proxy]
  Proxy -->|Serves Static Files| React[React Build Assets]
  Proxy -->|Routes API /api/*| Gunicorn[Gunicorn WSGI Engine]
  Gunicorn -->|Python Threads| Flask[Flask Backend API]
  
  Flask -->|Auth/Pass SQL| DB[(PostgreSQL Database)]
  Flask -->|Session Caches / Rate Limits| Cache[(Redis Cache Node)]
  Flask -->|LLM Queries| Gemini[Google Gemini Engine]
  Flask -->|Log Analytics Async| Mongo[(MongoDB Atlas DB)]
```

---

## 2. Relational Database ER Diagram

The database structure handles referential constraints and cascading archives on deletions.

```mermaid
erDiagram
  USER {
    int id PK
    string name
    string email
    string password_hash
    string role
    datetime created_at
  }
  PASS {
    int id PK
    int user_id FK
    string route
    string pass_type
    string status
    float amount
    datetime expires_at
  }
  TRANSACTION {
    int id PK
    int user_id FK
    int pass_id FK
    string txn_code
    float amount
    string status
    string method
    datetime created_at
  }
  USER ||--o{ PASS : applies
  USER ||--o{ TRANSACTION : pays
  PASS ||--o{ TRANSACTION : references
```

---

## 3. JWT Authentication Flow

Controls page redirections based on token verification.

```mermaid
sequenceDiagram
  autonumber
  Client->>Auth API: POST /api/auth/login (email/password)
  Auth API-->>Client: Returns JWT Access Token
  Note over Client: Token stored in LocalStorage
  Client->>Protected Route: Access /dashboard (with Authorization Header)
  Note over Protected Route: Interceptor checks signature and expiry
  alt Valid Session
    Protected Route-->>Client: Renders View
  else Token Invalid / Expired
    Protected Route-->>Client: Redirect to /login
  end
```

---

## 4. Secure QR Boarding Verification Flow

The conductor validation camera viewfinder flow operates as follows:

```mermaid
sequenceDiagram
  autonumber
  Passenger->>Wallet: Tap "Start Journey"
  Note over Wallet: Generate time-limited cryptotoken
  Wallet->>Passenger: Displays Dynamic QR Code
  Note over Passenger: QR regenerates every 30s
  Conductor->>Validator: Scan QR using viewfinder camera
  Validator->>Server: POST /api/conductor/verify-token
  Note over Server: Decrypt and check timestamp/signature
  alt Verified
    Server-->>Validator: Approval (Green UI)
    Server->>Mongo: Log Boarding Event
  else Failed / Re-scanned
    Server-->>Validator: Denial (Red UI)
  end
```

---

## 5. Payments Checkout Processing Flow

Handles transaction stages and discount coupons (`STUDENT50`).

```mermaid
graph TD
  Start[Wizard Case 5] --> SelectMethod[Choose UPI/Card/Wallet]
  SelectMethod --> ApplyCoupon[Input STUDENT50 Coupon]
  ApplyCoupon --> DeductWallet[Subtract Wallet Credits]
  DeductWallet --> Pay[Click Submit Payment]
  
  Pay --> ProcessingOverlay[Processing Overlay active]
  ProcessingOverlay --> Stage1[Creating Order]
  Stage1 --> Stage2[Contacting Bank Gateway]
  Stage2 --> Stage3[Authorizing Tokens]
  Stage3 --> Stage4[Payment Verified]
  
  Stage4 --> Complete[Success Screen confettis]
  Complete --> RenderInvoice[Display Invoice Preview Sheet]
  Complete --> GeneratePass[Activate Digital Travel Card]
```

---

## 6. AI assistant Query Routing Flow

Attaches page URL and role parameters to helpdesk answers.

```mermaid
graph LR
  Input[Query + Mic Input] --> GathersContext[Gathers active page url + user role]
  GathersContext --> Payload[POST /api/ai/chat]
  Payload --> RoutePrompt[Decide template: Travel / Payments / Support / Admin]
  
  RoutePrompt --> CheckGemini[Check Gemini API availability]
  CheckGemini -- Key Active --> QueryGemini[Query Gemini Pro Model]
  CheckGemini -- Offline/No Key --> Fallback[Run Local Keyword Fallback Parser]
  
  QueryGemini --> Output[Markdown Message Bubble + Speech synthesis]
  Fallback --> Output
```

---

## 7. Smart Journey GIS tracking Flow

Compiles route Suggestions and coordinates updates.

```mermaid
graph TD
  InputRoute[Enter Source & Destination] --> QueryAI[Plan Journey]
  QueryAI --> AISuggestions[Recommend: Fastest / Shortest / Cheapest paths]
  AISuggestions --> SelectRoute[Rider selects path]
  
  SelectRoute --> FocusMap[Focus Map view limits]
  FocusMap --> DrawPath[Highlight route line track]
  FocusMap --> PulseStops[Display nearby pulsing stops markers]
  FocusMap --> MoveBuses[Animate SVG Bus markers crawling along path]
  
  MoveBuses --> ProgressTimeline[Log progress timeline: Boarded -> In Transit -> Completed]
```

---

## 8. Docker Compose Network Topography

Isolates containers inside a shared virtual bridge net.

```mermaid
graph TD
  HostPort80[Host Port 80] -->|Maps Traffic| FrontendNginx[Frontend Container Nginx]
  HostPort3307[Host Port 5432] -->|Maps Postgres| PostgresDB[db postgres:15-alpine]
  HostPort6379[Host Port 6379] -->|Maps Redis| RedisCache[redis redis:7-alpine]
  
  subgraph Docker Network Bridge
    FrontendNginx -->|Proxy /api/*| BackendGunicorn[backend python:3.10-alpine]
    BackendGunicorn -->|SQL connection pool| PostgresDB
    BackendGunicorn -->|Session caches| RedisCache
  end
```

---

## 9. MongoDB Atlas Analytics Logging Flow

Drives live charts from pass creations.

```mermaid
graph LR
  RiderApplies[Passenger applies pass] --> CommitSQL[Commit details to PostgreSQL DB]
  CommitSQL --> MongoService[Instantiate MongoDBService]
  MongoService --> CheckURI[Check MONGO_URI availability]
  
  CheckURI -- URI Present --> InsertMongo[Write Transaction & Boarding documents to Atlas]
  InsertMongo --> AtlasCharts[Live Atlas Charts update in real-time]
  CheckURI -- No URI --> LogConsole[Fallback to Console log output]
```
