# Sistema de Gerenciamento de Agenda

Este projeto é uma aplicação completa para o gerenciamento de agendas pessoais e compartilhadas. Os usuários podem criar eventos, compartilhá-los com outros usuários, editar, excluir e filtrar eventos por data ou texto. O sistema é dividido em back-end (ASP.NET Core) e front-end (Angular).

---

## 🧰 Pré-requisitos

### Backend (.NET)

* .NET 6 SDK ou superior
* SQL Server instalado localmente ou via Docker
* Projeto Web API criado com:

```bash
 dotnet new webapi -n AgendaAppBackend
 cd AgendaAppBackend
```

* Pacotes NuGet obrigatórios:

```bash
 dotnet add package Microsoft.EntityFrameworkCore.SqlServer
 dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
 dotnet add package Microsoft.IdentityModel.Tokens
 dotnet add package System.IdentityModel.Tokens.Jwt
```

### Frontend (Angular)

* Node.js 18+
* Angular CLI 15+ (instale com `npm install -g @angular/cli`)

---

## 🧩 Tecnologias Utilizadas

### Back-end

* ASP.NET Core
* Entity Framework Core
* JWT Authentication
* SQL Server

### Front-end

* Angular
* Tailwind CSS (para estilo)
* RxJS / HttpClient

---

## 📦 Instalação

### Backend (ASP.NET Core)

```bash
cd backend

# Restaurar pacotes e compilar
dotnet restore

dotnet build

# Rodar aplicação
dotnet run
```

> A API estará disponível por padrão em: `http://localhost:5000`

### Frontend (Angular)

```bash
cd frontend

# Instalar dependências
npm install

# Rodar aplicação Angular
ng serve --open
```

> A aplicação será aberta em: `http://localhost:4200`

---

## 🔐 Configurações de Ambiente

No arquivo `appsettings.json`:

```json
"Jwt": {
  "Key": "sua_chave_super_secreta"
},
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=AgendaDb;Trusted_Connection=True;"
}
```

---

## 📋 Funcionalidades

* Autenticação JWT com login
* Cada usuário tem sua própria agenda
* Criação de eventos com:

  * Nome, descrição, data, local, tipo (exclusivo/compartilhado), participantes
* Edição e exclusão de eventos
* Filtros na dashboard:

  * Por texto
  * Por data
  * Botões de acesso rápido: eventos do dia, semana, mês

---

## 🧪 Instruções de Teste Manual

### 1. Criar Usuário (registro)

Endpoint: `POST /api/usuario/registrar`

```json
{
  "nome": "João da Silva",
  "email": "joao@example.com",
  "senha": "123456"
}
```

### 2. Login

Endpoint: `POST /api/usuario/login`

```json
{
  "email": "joao@example.com",
  "senha": "123456"
}
```

Resposta:

```json
{
  "token": "<JWT>"
}
```

### 3. Criar Evento

Endpoint: `POST /api/eventos`
Header: `Authorization: Bearer <JWT>`

```json
{
  "nome": "Reunião de Projeto",
  "descricao": "Alinhamento de tarefas",
  "data": "2025-06-01T10:00:00",
  "local": "Google Meet",
  "tipo": "Compartilhado",
  "participantesIds": [2, 3]
}
```

### 4. Filtrar Eventos

* `GET /api/eventos?search=projeto`
* `GET /api/eventos?data=2025-06-01`
* `GET /api/eventos/hoje`
* `GET /api/eventos/semana`
* `GET /api/eventos/mes`

### 5. Editar Evento

Endpoint: `PUT /api/eventos/{id}`

### 6. Deletar Evento

Endpoint: `DELETE /api/eventos/{id}`

---

## 🖼️ Diagrama UML

O diagrama de classes UML representa os principais relacionamentos entre as entidades `Usuario`, `Evento`, `EventoDTO`, `LoginRequest`, e `TipoEvento`. Consulte a imagem incluída no projeto para detalhes.

---

## 📜 Licença

Este projeto é de uso acadêmico e educativo. Direitos reservados à equipe do curso CCO002 - Engenharia de Software II - UNIFEI.
