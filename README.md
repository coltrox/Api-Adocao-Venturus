# 🐾 API de Adoção de Pets - Versão Final

API RESTful completa para o gerenciamento de uma plataforma de adoção de animais.  
O sistema inclui cadastro detalhado de tutores, um questionário obrigatório para adoção, gerenciamento de animais, uma fila de pedidos de adoção, sistema de doações e rotas administrativas protegidas.

Desenvolvida em **Node.js** com **Express**, utilizando **Sequelize** como ORM para um banco de dados relacional (SQLite) e autenticação baseada em JWT.

---

## ✅ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express.js**: Framework para construção da API.
- **Sequelize**: ORM para Node.js, compatível com Postgres, MySQL, MariaDB, SQLite e MSSQL.
- **SQLite**: Banco de dados relacional utilizado no projeto.
- **JWT (JSON Web Token)**: Para autenticação e proteção de rotas.
- **bcrypt**: Para criptografia segura de senhas.
- **Multer**: Middleware para upload de imagens (armazenadas como Buffer).
- **dotenv**: Para gerenciamento de variáveis de ambiente.

---

## 📌 Configuração do Ambiente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/coltrox/Api-Adocao-Venturus.git
   cd Api-Adocao-Venturus
```
```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Crie o arquivo `.env`** na raiz do projeto com as seguintes variáveis:

   ```env
   PORT=3000
   DB_STORAGE=./database.sqlite
   JWT_SECRET=sua_chave_secreta_super_segura
   ```

4. **(Opcional) Crie um usuário administrador inicial:**

   ```bash
   npm run seed
   ```

5. **Inicie o servidor:**

   * Modo de desenvolvimento:

     ```bash
     npm run dev
     ```
   * Produção:

     ```bash
     npm run start
     ```

---

## 🔑 Autenticação

Para acessar rotas protegidas é necessário um **token JWT**.

1. Faça `POST /api/login` com email e senha.
2. A API retornará um `token`.
3. Use o token no cabeçalho `Authorization`:

   ```
   Authorization: Bearer <seu_token_jwt>
   ```

---

## 📖 Documentação da API

Prefixo base para todos os endpoints: `/api`

### Autenticação

#### `POST /login`

Login de tutor ou admin.

* **Body:**

  ```json
  {
    "email": "tutor@email.com",
    "senha": "123456"
  }
  ```

* **Resposta:**

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

---

### Usuários / Tutores

#### `POST /usuario`

Cadastra tutor.

```json
{
  "nome_completo": "João da Silva",
  "email": "joao@email.com",
  "senha": "senha_forte_123",
  "cidade": "Campinas",
  "estado": "SP",
  "idade": 30,
  "telefone": "19999998888"
}
```

#### `PATCH /tutores/:id`

Atualiza dados de tutor. (Protegida)

#### `GET /tutores/:id`

Detalhes de um tutor e seu questionário. (Protegida)

---

### Questionário de Adoção

#### `POST /questionario`

Envia respostas (obrigatório antes de adotar). (Protegida)

```json
{
  "empregado": true,
  "quantos_animais_possui": 0,
  "motivos_para_adotar": "Quero dar um lar."
}
```

---

### Animais (Rotas Públicas)

#### `GET /animais`

Lista animais disponíveis para adoção.
Suporta filtros: `/api/animais?especie=gato&porte=pequeno`

```json
{
  "data": [
    {
      "id": "uuid-do-animal",
      "nome": "Frajola",
      "especie": "gato",
      "porte": "pequeno"
    }
  ],
  "total": 1
}
```

---

### Adoções

#### `POST /adocoes`

Cria pedido de adoção. (Protegida)

* **Body:**

  ```json
  {
    "animalId": "uuid-do-animal"
  }
  ```

* **Resposta:**

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

---

### Doações

#### `POST /doacoes`

Registra doação.

```json
{
  "nome": "Maria Souza",
  "email": "maria@email.com",
  "valor": 50.00,
  "mensagem": "Parabéns pelo trabalho!"
}
```

Resposta:

```json
{
  "doacao_id": "uuid-da-doacao",
  "nome": "Maria Souza",
  "valor": 50.00
}
```

---

## 🛠️ Administração (Admins)

#### `POST /admin/animais`

Cadastra animal (com foto).

#### `GET /animais/:id`

Detalhes de um animal com pedidos de adoção.

```json
{
  "id": "uuid-do-animal",
  "nome": "Rex",
  "pedidos": [
    {
      "id": "uuid-pedido-1",
      "status": "em_analise",
      "criado_em": "2025-08-27T14:30:00.000Z"
    },
    {
      "id": "uuid-pedido-2",
      "status": "aprovada",
      "criado_em": "2025-08-28T10:00:00.000Z"
    }
  ]
}
```

#### `PATCH /admin/animais/:id`

Atualiza dados do animal (ex.: descrição, porte, vacinação).

#### `DELETE /admin/animais/:id`

Remove animal.

#### `PATCH /adocoes/:id`

Atualiza status da adoção (`aprovada` ou `recusada`).
Se **aprovada**, o animal **não será exibido** nas listagens públicas.

## 👥 Desenvolvedores

Este projeto foi desenvolvido por:

**Pedro Coltro, Lucas D'Ávila, Mylenna Ponciano e Matheus Berozzi**

