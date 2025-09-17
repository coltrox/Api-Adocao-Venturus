# 🐾 API de Adoção de Pets - Versão Final

API RESTful completa para o gerenciamento de uma plataforma de adoção de animais.
Inclui cadastro de tutores, questionário obrigatório para adoção, gerenciamento de animais, fila de pedidos de adoção, sistema de doações e rotas administrativas protegidas.

Desenvolvida em **Node.js** com **Express**, utilizando **Sequelize** como ORM e **SQLite** como banco de dados. Autenticação via **JWT**.

---

## ✅ Tecnologias Utilizadas

* **Node.js**
* **Express.js**
* **Sequelize**
* **SQLite**
* **JWT (JSON Web Token)**
* **bcrypt**
* **Multer**
* **dotenv**

---

## 📌 Configuração do Ambiente

```bash
git clone https://github.com/coltrox/Api-Adocao-Venturus.git
cd Api-Adocao-Venturus
npm install
```

Crie o arquivo `.env` na raiz:

```env
PORT=3000
DB_STORAGE=./database.sqlite
JWT_SECRET=sua_chave_secreta_super_segura
```

Opcional: criar usuário admin inicial:

```bash
npm run seed
```

Inicie o servidor:

```bash
npm run dev      # desenvolvimento
npm run start    # produção
```

---

## 🔑 Autenticação

1. `POST /api/login` com email e senha.
2. Recebe um `token` JWT.
3. Inclua no header `Authorization`:

```
Authorization: Bearer <seu_token_jwt>
```

---

## 📖 Documentação da API

Prefixo base: `/api`

---

### Autenticação

#### `POST /login`

Login de tutor ou admin.

**Body:**

```json
{
  "email": "tutor@email.com",
  "senha": "123456"
}
```

**Resposta:**

```json
{
  "usuario": {
    "id": "uuid",
    "nome_completo": "Nome do Tutor",
    "email": "tutor@email.com",
    "admin": false
  },
  "token": "seu_token_jwt"
}
```

---

### Tutores / Usuários

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

Atualiza dados do tutor (protegida).

#### `GET /tutores/:id`

Detalhes de tutor e questionário (protegida).

---

### Questionário de Adoção

#### `POST /questionario`

Envio de respostas (protegida).

```json
{
  "empregado": true,
  "quantos_animais_possui": 0,
  "motivos_para_adotar": "Quero dar um lar."
}
```

---

### Animais

#### Rotas Públicas

#### `GET /animais`

Lista animais disponíveis para adoção. Filtros possíveis:

```
/api/animais?especie=gato&porte=pequeno
```

**Resposta:**

```json
{
  "data": [
    {
      "id": "uuid",
      "nome": "Frajola",
      "especie": "gato",
      "porte": "pequeno"
    }
  ],
  "total": 1
}
```

---

#### Rotas Admin

#### `GET /animais/:id`

Detalhes de um animal com pedidos de adoção (admin).

#### `POST /admin/animais`

Cadastro de animal (com foto).

#### `PATCH /admin/animais/:id`

Atualiza dados do animal.

#### `DELETE /admin/animais/:id`

Remove animal.

---

### Adoções

#### `POST /adocoes`

Cria pedido de adoção (protegida).

```json
{
  "animalId": "uuid-do-animal"
}
```

**Resposta:**

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

#### `PATCH /adocoes/:id`

Atualiza status da adoção (`aprovada` ou `recusada`).
Se aprovada, o animal deixa de aparecer nas listagens públicas.

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

**Resposta:**

```json
{
  "doacao_id": "uuid",
  "nome": "Maria Souza",
  "valor": 50.00
}
```

---

## 👥 Desenvolvedores

**Pedro Coltro, Lucas D'Ávila, Mylenna Ponciano e Matheus Berozzi**
