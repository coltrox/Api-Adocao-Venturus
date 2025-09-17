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

1. `POST http://localhost:3000/api/login` com email e senha.
2. Recebe um `token` JWT.
3. Inclua no header `Authorization`:

```
Authorization: Bearer <seu_token_jwt>
```

---

## 📖 Documentação da API

Prefixo base: `/api`

---

### 🟢 Rotas Públicas

| Método | Endpoint                                | Body / Query                                                                                                                                                       | Resposta                                                                                                                          |
| ------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| POST   | `http://localhost:3000/api/login`       | `json {"email":"tutor@email.com","senha":"123456"} `                                                                                                               | `json {"usuario":{"id":"uuid","nome_completo":"Nome do Tutor","email":"tutor@email.com","admin":false},"token":"seu_token_jwt"} ` |
| POST   | `http://localhost:3000/api/usuario`     | `json {"nome_completo":"João da Silva","email":"joao@email.com","senha":"senha_forte_123","cidade":"Campinas","estado":"SP","idade":30,"telefone":"19999998888"} ` | `json {"id":"uuid","nome_completo":"João da Silva","email":"joao@email.com"} `                                                    |
| GET    | `http://localhost:3000/api/animais`     | `?especie=gato&porte=pequeno`                                                                                                                                      | `json {"data":[{"id":"uuid","nome":"Frajola","especie":"gato","porte":"pequeno"}],"total":1} `                                    |
| POST   | `http://localhost:3000/api/doacoes`     | `json {"nome":"Maria Souza","email":"maria@email.com","valor":50.00,"mensagem":"Parabéns pelo trabalho!"} `                                                        | `json {"doacao_id":"uuid","nome":"Maria Souza","valor":50.00} `                                                                   |
| GET    | `http://localhost:3000/api/animais/:id` | -                                                                                                                                                                  | `json {"id":"uuid","nome":"Frajola","especie":"gato","porte":"pequeno"} `                                                         |

---

### 🔒 Rotas Tutor / Usuário (protegidas)

| Método | Endpoint                                 | Body / Query                                                                                    | Resposta                                                                                                                                                                              |
| ------ | ---------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PATCH  | `http://localhost:3000/api/tutores/:id`  | `json {"cidade":"Campinas","telefone":"19999998888"} `                                          | `json {"id":"uuid","nome_completo":"João da Silva","cidade":"Campinas"} `                                                                                                             |
| GET    | `http://localhost:3000/api/tutores/:id`  | -                                                                                               | `json {"id":"uuid","nome_completo":"João da Silva","email":"joao@email.com","questionario":{"empregado":true,"quantos_animais_possui":0,"motivos_para_adotar":"Quero dar um lar."}} ` |
| POST   | `http://localhost:3000/api/questionario` | `json {"empregado":true,"quantos_animais_possui":0,"motivos_para_adotar":"Quero dar um lar."} ` | `json {"id":"uuid","tutor_id":"uuid","criado_em":"2025-08-27T14:30:00.000Z"} `                                                                                                        |
| POST   | `http://localhost:3000/api/adocoes`      | `json {"animalId":"uuid-do-animal"} `                                                           | `json {"id":"uuid-do-pedido","tutor_id":"uuid-do-tutor","animal_id":"uuid-do-animal","status":"em_analise","posicao_fila":1,"criado_em":"2025-08-27T14:30:00.000Z"} `                 |

---

### 🛠️ Rotas Admin (protegidas)

| Método | Endpoint                                      | Body / Query                                                                 | Resposta                                                                                                                               |
| ------ | --------------------------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `http://localhost:3000/api/admin/animais/:id` | -                                                                            | `json {"id":"uuid","nome":"Rex","pedidos":[{"id":"uuid-pedido-1","status":"em_analise"},{"id":"uuid-pedido-2","status":"aprovada"}]} ` |
| POST   | `http://localhost:3000/api/admin/animais`     | `json {"nome":"Rex","especie":"cachorro","porte":"grande","foto":"base64"} ` | `json {"id":"uuid","nome":"Rex","especie":"cachorro"} `                                                                                |
| PATCH  | `http://localhost:3000/api/admin/animais/:id` | `json {"porte":"médio"} `                                                    | `json {"id":"uuid","nome":"Rex","porte":"médio"} `                                                                                     |
| DELETE | `http://localhost:3000/api/admin/animais/:id` | -                                                                            | `json {"message":"Animal removido com sucesso"} `                                                                                      |
| PATCH  | `http://localhost:3000/api/adocoes/:id`       | `json {"status":"aprovada"} `                                                | `json {"id":"uuid","status":"aprovada"} `                                                                                              |
| GET    | `http://localhost:3000/api/tutores`           | -                                                                            | `json [{"id":"uuid","nome_completo":"João da Silva"}] `                                                                                |
| GET    | `http://localhost:3000/api/adocoes`           | -                                                                            | `json [{"id":"uuid","tutor_id":"uuid","animal_id":"uuid","status":"em_analise"}] `                                                     |
| GET    | `http://localhost:3000/api/doacoes`           | -                                                                            | `json [{"doacao_id":"uuid","nome":"Maria Souza","valor":50.00}] `                                                                      |

---

## 👥 Desenvolvedores

**Pedro Coltro, Lucas D'Ávila, Mylenna Ponciano e Matheus Berozzi**
