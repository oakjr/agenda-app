# Agenda App

Aplicação web para gerenciamento de eventos e agendas, com autenticação JWT, backend em ASP.NET Core e frontend em React + Tailwind CSS.

---

## Funcionalidades

- Cadastro e autenticação de usuários (JWT)
- Criação, edição, remoção e listagem de eventos
- Visualização de eventos por dia, semana e mês
- Participação em eventos
- Interface responsiva e tema escuro

---

## Tecnologias Utilizadas

### Backend
- ASP.NET Core 7+
- Entity Framework Core (InMemory)
- Autenticação JWT
- CORS habilitado para qualquer origem

### Frontend
- React
- Tailwind CSS
- Axios

---

## Como rodar o projeto

### Pré-requisitos

- [.NET 7 SDK ou superior](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

---

## Instalação de Dependências e Ferramentas do Backend

Antes de rodar o backend, certifique-se de instalar os seguintes pacotes e ferramentas:

### 1. Pacotes NuGet necessários

Execute os comandos abaixo dentro da pasta `backend` para instalar os pacotes essenciais:

```sh
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.InMemory
dotnet add package Swashbuckle.AspNetCore
```

### 2. Ferramentas Globais (opcional, mas recomendado)

Para facilitar o desenvolvimento, instale as ferramentas abaixo:

- **EF Core CLI** (para comandos de banco, caso precise futuramente):
    ```sh
    dotnet tool install --global dotnet-ef
    ```

- **.NET CLI** (caso ainda não tenha):
    - [Download .NET SDK](https://dotnet.microsoft.com/download)

---

### Backend

1. Acesse a pasta do backend:
    ```sh
    cd backend
    ```

2. Restaure os pacotes:
    ```sh
    dotnet restore
    ```

3. Rode a aplicação:
    ```sh
    dotnet run
    ```

4. A API estará disponível em:  
   `http://localhost:5261`

5. Acesse a documentação interativa (Swagger) em:  
   `http://localhost:5261/swagger`

#### Endpoints principais

- `POST /api/auth/login` — Login de usuário (retorna JWT)
- `GET /api/eventos` — Lista eventos do usuário autenticado
- `POST /api/eventos` — Cria novo evento
- `PUT /api/eventos/{id}` — Edita evento
- `DELETE /api/eventos/{id}` — Remove evento

---

### Frontend

## Instalação de Dependências e Ferramentas do Frontend

Antes de rodar o frontend, certifique-se de instalar as ferramentas necessárias:

### 1. Instalar o Angular CLI (caso ainda não tenha)

```sh
npm install -g @angular/cli
```

### 2. Instalar as dependências do projeto

Acesse a pasta `frontend` e execute:

```sh
cd frontend
npm install
```

### 3. Rodar o projeto

```sh
ng serve --open
```

O navegador abrirá automaticamente em: [http://localhost:4200](http://localhost:4200)

---

### Observações

- Certifique-se de que o backend esteja rodando para que o frontend possa consumir a API.
- Caso utilize variáveis de ambiente (por exemplo, para URL da API), configure o arquivo `environment.ts` conforme necessário.

---

## Mock de Dados

- O backend utiliza um banco em memória (InMemory) e já popula alguns usuários e eventos para testes.
- Usuários de exemplo:
    - **alice@test.com** / senha: `123`
    - **bob@test.com** / senha: `123`
    - **omar@test.com** / senha: `123`

---

## Variáveis de Ambiente

No backend, configure a chave JWT no `appsettings.json`:

```json
"Jwt": {
  "Key": "sua_chave_super_secreta_para_que_ninguém_saiba"
}
```

---

## Licença

EULA

---

## Contato

Dúvidas ou sugestões? omar.kattwinkel@gmail.com ou whatsapp 19997614279