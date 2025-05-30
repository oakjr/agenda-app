# 📆 Agenda App - Projeto Fullstack (.NET + Angular)

Este projeto é um sistema de gerenciamento de agenda pessoal e compartilhada, desenvolvido com **ASP.NET Core 8** no backend e **Angular 16+** no frontend. Utiliza autenticação JWT, banco em memória (mockado com EF Core), e roteamento protegido com login.

---

## 🧰 Tecnologias Utilizadas

### Backend (ASP.NET Core 8)
- Entity Framework Core (InMemory)
- Autenticação JWT
- Swagger

### Frontend (Angular 16 ou 17)
- Angular CLI
- Reactive Forms (`FormGroup`)
- HttpClient com JWT
- Tailwind CSS (estilo)

---

## 🏁 Como Executar

### 🔧 Pré-requisitos
- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download)
- [Node.js 18+](https://nodejs.org/en)
- Angular CLI 16/17: `npm install -g @angular/cli@16`

### 📦 Instalar e Executar o Backend (API)

```bash
cd backend

# Restaurar pacotes
dotnet restore

# Executar com dados mockados em memória
dotnet run
```

- Swagger: http://localhost:5000/swagger
- Usuários mockados:
  - `alice@test.com` / `123`
  - `bob@test.com` / `123`
  - `omar@test.com` / `123`

### 📦 Instalar e Executar o Frontend (Angular)

```bash
cd frontend
npm install
ng serve --open
```

- Abre automaticamente em: http://localhost:4200

> Login obrigatório para acessar a dashboard.

---

## 🔐 Autenticação

A autenticação é baseada em JWT.

- Após o login, o token é salvo no `localStorage`.
- Ele é usado automaticamente em requisições protegidas ao backend.

---

## 📋 Funcionalidades

### ✅ Login e Dashboard
- Login por email/senha mockados
- Redirecionamento automático após login

### ✅ Agenda por usuário
- Cada usuário vê seus próprios eventos ou eventos compartilhados com ele

### ✅ Eventos
- Criar evento com:
  - Nome, descrição, data, local, tipo (exclusivo/compartilhado)
  - Participantes (usuários mockados)
- Listar eventos com filtros:
  - Por texto
  - Por data específica
  - Por botão rápido (Hoje, Semana, Mês)
- Ativar/desativar evento (toggle de status)
- Remover evento
- (🔜 Em breve: Editar evento)

---

## 🧪 Testes manuais via Postman / curl

### Login
```http
POST http://localhost:5000/api/usuario/login
Content-Type: application/json

{
  "email": "alice@test.com",
  "senha": "123456"
}
```

### Listar eventos
```http
GET http://localhost:5000/api/eventos
Authorization: Bearer <token>
```

### Criar evento
```http
POST http://localhost:5000/api/eventos
Authorization: Bearer <token>

{
  "nome": "Reunião Geral",
  "descricao": "Discussão de metas",
  "data": "2025-06-01T10:00:00",
  "local": "Google Meet",
  "tipo": "Compartilhado",
  "participantesIds": [2]
}
```

### Alterar status
```http
PATCH http://localhost:5000/api/eventos/1/status?ativo=false
Authorization: Bearer <token>
```

---

## 🖼️ Arquitetura

- `AppDbContext`: banco de dados in-memory com entidades `Usuario`, `Evento`
- `TokenService`: geração de token JWT
- `UsuarioController`: login e registro
- `EventoController`: CRUD completo de eventos com filtros
- `AuthService`: serviço Angular para login e autenticação
- `DashboardComponent`: lista e filtra eventos
- `LoginComponent`: formulário reativo para login

---

## 📦 Estrutura de Diretórios (simplificada)

```
backend/
├── Controllers/
│   ├── UsuarioController.cs
│   └── EventoController.cs
├── Services/
│   └── TokenService.cs
├── Models/
│   ├── Usuario.cs
│   ├── Evento.cs
│   └── LoginRequest.cs
└── Program.cs

frontend/
├── src/app/
│   ├── login/
│   │   ├── login.component.ts
│   │   ├── login.component.html
│   ├── dashboard/
│   │   ├── dashboard.component.ts
│   │   ├── dashboard.component.html
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── evento.service.ts
│   └── app-routing.module.ts
```

---

## 🧠 Sugestões futuras
- Formulário para criar/editar eventos (Angular)
- AuthGuard para proteger rotas
- SQLite para persistência leve local
- Interface admin para ver eventos de todos os usuários

---

## 📜 Licença

Uso restrito apenas