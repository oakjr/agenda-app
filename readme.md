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

1.  ### 📦 Instalar e Executar o Frontend (Angular)

```bash
cd frontend
npm install
ng serve --open
```

- Abre automaticamente em: http://localhost:4200

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
  "Key": "sua-chave-secreta-aqui"
}
```

---

## Licença

MIT

---

## Contato

Dúvidas ou sugestões? omar.kattwinkel@gmail.com ou whatsapp 19997614279