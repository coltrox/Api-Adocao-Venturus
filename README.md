# 🐾 API de Adoção de Pets - Versão Final

API RESTful completa para o gerenciamento de uma plataforma de adoção de animais. O sistema inclui cadastro detalhado de tutores, um questionário obrigatório para adoção, gerenciamento de animais, uma fila de pedidos de adoção, sistema de doações e rotas administrativas protegidas.

Desenvolvida em Node.js com Express, utilizando Sequelize como ORM para um banco de dados relacional (SQLite) e autenticação baseada em JWT.

## ✅ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express.js**: Framework para construção da API.
- **Sequelize**: ORM para Node.js, compatível com Postgres, MySQL, MariaDB, SQLite e MSSQL.
- **SQLite**: Banco de dados relacional utilizado no projeto.
- **JWT (JSON Web Token)**: Para autenticação e proteção de rotas.
- **bcrypt**: Para criptografia segura de senhas.
- **Multer**: Middleware para upload de imagens (armazenadas como Buffer).
- **dotenv**: Para gerenciamento de variáveis de ambiente.

## 📌 Configuração do Ambiente

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/coltrox/Api-Adocao-Venturus.git
    cd Api-Adocao-Venturus
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Crie o arquivo `.env`** na raiz do projeto com as seguintes variáveis:
    ```env
    PORT=3000
    DB_STORAGE=./database.sqlite
    JWT_SECRET=sua_chave_secreta_super_segura
    ```

4.  **(Opcional) Crie um usuário administrador inicial:**
    O projeto pode ser configurado com um *seed* para criar usuários administradores.
    ```bash
    # (Exemplo de comando, ajuste conforme seu package.json)
    npm run seed
    ```

5.  **Inicie o servidor em modo de desenvolvimento:**
    ```bash
    npm run dev
    ```
    Ou inicie em modo de produção:
    ```bash
    npm run start
    ```

## 🔑 Autenticação

Para acessar as rotas protegidas, primeiro obtenha um token de autenticação.

1.  Faça uma requisição `POST /api/login` com email e senha.
2.  A API retornará um `token` JWT.
3.  Envie este token no cabeçalho `Authorization` de todas as requisições protegidas.
    ```
    Authorization: Bearer <seu_token_jwt>
    ```

---

## 📖 Documentação da API

Prefixo base para todos os endpoints: `/api`

### Autenticação

#### `POST /login`
Realiza o login do usuário (tutor ou admin).

-   **Body:**
    ```json
    {
      "email": "tutor@email.com",
      "senha": "123456"
    }
    ```
-   **Resposta de Sucesso (200 OK):**
    ```json
    {
      "usuario": {
        "id": "uuid-do-usuario",
        "nome_completo": "Nome do Tutor",
        "email": "tutor@email.com",
        "admin": false
      },
      "token": "seu_token_jwt"
    }
    ```

### Usuários / Tutores

#### `POST /usuario`
Cadastra um novo tutor.

-   **Body:**
    ```json
    {
      "nome_completo": "João da Silva",
      "email": "joao.silva@email.com",
      "senha": "senha_forte_123",
      "cidade": "Campinas",
      "estado": "SP",
      "idade": 30,
      "telefone": "19999998888",
      "instagram": "@joao.silva",
      "facebook": "/joao.silva"
    }
    ```
-   **Resposta de Sucesso (201 Created):** Retorna os dados do tutor cadastrado (sem a senha).

#### `PATCH /tutores/:id`
Atualiza os dados de um tutor. (Rota protegida)

-   **Body:**
    ```json
    {
      "cidade": "São Paulo",
      "telefone": "11988887777"
    }
    ```
-   **Resposta de Sucesso (200 OK):** Retorna os dados atualizados do tutor.

#### `GET /tutores/:id`
Busca os detalhes de um tutor, incluindo seu questionário respondido. (Rota protegida)

-   **Resposta de Sucesso (200 OK):**
    ```json
    {
      "id": "uuid-do-tutor",
      "nome_completo": "João da Silva",
      "questionario": {
        "id": "uuid-do-questionario",
        "empregado": true
      }
    }
    ```

### Questionário de Adoção

#### `POST /questionario`
Envia as respostas do questionário obrigatório. O tutor deve estar logado. (Rota protegida)

-   **Body:** Um objeto JSON contendo todas as respostas do formulário.
    ```json
    {
      "empregado": true,
      "quantos_animais_possui": 0,
      "motivos_para_adotar": "Quero dar um lar para um animal necessitado."
    }
    ```
-   **Resposta de Sucesso (201 Created):**
    ```json
    {
      "mensagem": "Questionário enviado com sucesso!",
      "questionario": { }
    }
    ```

### Animais (Rotas Públicas)

#### `GET /animais`
Lista todos os animais disponíveis para adoção. Suporta filtros via query string.
Exemplo: `/api/animais?especie=gato&porte=pequeno`

-   **Resposta de Sucesso (200 OK):**
    ```json
    {
      "data": [
        {
          "id": "uuid-do-animal",
          "nome": "Frajola",
          "especie": "gato",
          "porte": "pequeno",
          "adotado": false
        }
      ],
      "total": 1
    }
    ```

### Adoções

#### `POST /adocoes`
Cria um novo pedido de adoção. O tutor deve estar logado e ter respondido o questionário. (Rota protegida)

-   **Body:**
    ```json
    {
      "animalId": "uuid-do-animal"
    }
    ```
-   **Resposta de Sucesso (201 Created):**
    ```json
    {
      "id": "uuid-do-pedido",
      "tutor_id": "uuid-do-tutor",
      "animal_id": "uuid-do-animal",
      "status": "em_analise",
      "posicao_fila": 1,
      "criado_em": "2025-08-27T14:30:00.000Z"
    }
    ```
-   **Respostas de Erro:**
    - `400 Bad Request`: Se o tutor não preencheu o questionário.
    - `409 Conflict`: Se o tutor já possui um pedido para este animal.

### Doações

#### `POST /doacoes`
Registra uma nova doação para a ONG.

-   **Body:**
    ```json
    {
      "nome": "Maria Souza",
      "email": "maria.s@email.com",
      "valor": 50.00,
      "mensagem": "Parabéns pelo trabalho!"
    }
    ```
-   **Resposta de Sucesso (201 Created):**
    ```json
    {
      "doacao_id": "uuid-da-doacao",
      "nome": "Maria Souza",
      "valor": 50.00
    }
    ```

---

## 🛠️ Administração (Rotas Protegidas para Admins)

#### `POST /admin/animais`
Cadastra um novo animal no sistema.

-   **Content-Type**: `multipart/form-data`
-   **Body (form-data):**
    - `nome`: "Rex"
    - `especie`: "Cachorro"
    - `porte`: "Médio"
    - `castrado`: `true`
    - `vacinado`: `true`
    - `descricao`: "Um cão muito dócil e amigável."
    - `foto`: [arquivo de imagem]
-   **Resposta de Sucesso (201 Created):** Retorna os dados do animal cadastrado.

#### `GET /animais/:id`
Busca os detalhes de um animal específico, incluindo a lista de pedidos de adoção para ele.

-   **Resposta de Sucesso (200 OK):**
    ```json
    {
      "id": "uuid-do-animal",
      "nome": "Rex",
      "adotado": false,
      "pedidos": [
        "uuid-pedido-1",
        "uuid-pedido-2"
      ]
    }
    ```

#### `PATCH /admin/animais/:id`
Atualiza os dados de um animal (incluindo o status `adotado`).

-   **Body:**
    ```json
    {
      "descricao": "Descrição atualizada.",
      "adotado": true
    }
    ```
-   **Resposta de Sucesso (200 OK):** Retorna os dados atualizados do animal.

#### `DELETE /admin/animais/:id`
Remove um animal do sistema.

-   **Resposta de Sucesso (204 No Content):** Nenhuma resposta no corpo.

#### `PATCH /adocoes/:id`
Aprova ou recusa um pedido de adoção.

-   **Body:**
    ```json
    {
      "status": "aprovada"
    }
    ```

-   **Resposta de Sucesso (200 OK):** Retorna o pedido de adoção com o status atualizado. Se aprovado, o animal será marcado como `adotado`.
