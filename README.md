# 🐾 API de Adoção de Pets - Versão Final

API RESTful completa para o gerenciamento de uma plataforma de adoção de animais.
Inclui cadastro de tutores, questionário obrigatório para adoção, gerenciamento de animais, fila de pedidos de adoção, sistema de doações e rotas administrativas protegidas.

Desenvolvida em **Node.js** com **Express**, utilizando **Sequelize** como ORM e **SQLite** como banco de dados. Autenticação via **JWT**.

-----

## ✅ Tecnologias Utilizadas

  * **Node.js**
  * **Express.js**
  * **Sequelize**
  * **SQLite**
  * **JWT (JSON Web Token)**
  * **bcrypt**
  * **Multer**
  * **dotenv**

-----

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

-----

## 📖 Documentação e Fluxo de Uso da API

O prefixo base para todas as rotas é `/api`.

### Passo 1: Criando um Usuário Administrador

Para gerenciar a plataforma, o primeiro passo é criar um usuário com permissões de administrador. Isso é feito através da rota pública de criação de usuário, definindo o campo `admin` como `true`.

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `http://localhost:3000/api/usuario` | Cria um novo usuário com todos os campos. Para um admin, defina `"admin": true`. |

**Exemplo de Body:**

```json
{
  "nome_completo": "Administrador do Sistema",
  "email": "admin@gmail.com",
  "senha": "123456",
  "cidade": "São Paulo",
  "estado": "SP",
  "idade": 35,
  "telefone": "19999999999",
  "instagram": "@adote_um_pet",
  "facebook": "/adote_um_pet",
  "endereco": "Rua zero, 123",
  "admin": true
}
```

### Passo 2: Realizando o Login

Com o usuário criado, o próximo passo é autenticá-lo para obter um token de acesso. Este token será necessário para acessar todas as rotas protegidas.

| Método | Endpoint | Body |
| :--- | :--- | :--- |
| `POST` | `http://localhost:3000/api/login` | `{"email":"admin@gmail.com","senha":"123456"}` |

**Atenção:** Copie e guarde o `token` retornado no login. Ele deverá ser enviado no cabeçalho de autorização para acessar as rotas protegidas.

**Formato do Cabeçalho:**

```
Authorization: Bearer <seu_token_jwt>
```

-----

### 🛠️ Rotas de Administrador (Protegidas)

As rotas a seguir são exclusivas para administradores e requerem a inclusão do `Bearer Token` no cabeçalho `Authorization` de cada requisição. Elas permitem o gerenciamento completo de tutores, animais e processos de adoção.

#### Criando um Novo Animal

Com o token de admin, agora você pode cadastrar novos animais na plataforma.

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `http://localhost:3000/api/admin/animais` | Cadastra um novo animal no sistema com todos os campos. |

**Exemplo de Body:**

```json
{
  "nome": "Bolinha",
  "especie": "Cachorro",
  "porte": "Pequeno",
  "castrado": true,
  "vacinado": true,
  "descricao": "Um cãozinho muito dócil e brincalhão, adora crianças e outros animais. Se adapta bem em apartamentos.",
  "foto": " --- "
}
```

#### Gerenciamento Completo (Admin)

| Método | Endpoint | Descrição | Exemplo de Body |
| :--- | :--- | :--- |:--- |
| `GET` | `http://localhost:3000/api/tutores` | Lista todos os tutores cadastrados no sistema. | - |
| `GET` | `http://localhost:3000/api/admin/animais/:id` | Consulta os detalhes de um animal específico e seus pedidos de adoção. | - |
| `PATCH` | `http://localhost:3000/api/admin/animais/:id` | Altera um ou mais dados de um animal existente. | `{"porte": "médio", "vacinado": false}` |
| `DELETE` | `http://localhost:3000/api/admin/animais/:id` | Remove um animal do sistema. | - |
| `PATCH` | `http://localhost:3000/api/adocoes/:id` | Altera o status de um pedido de adoção. | `{"status": "aprovada"}` |
| `GET` | `http://localhost:3000/api/adocoes` | Lista todos os pedidos de adoção registrados. | - |
| `GET` | `http://localhost:3000/api/doacoes` | Lista todas as doações recebidas. | - |

-----

### 🟢 Rotas Públicas

Rotas que não exigem autenticação.

| Método | Endpoint | Descrição e Exemplo de Query |
| :--- | :--- | :--- |
| `POST` | `http://localhost:3000/api/usuario` | Cria um novo usuário (tutor). Veja o exemplo completo na **Seção 1**. |
| `GET` | `http://localhost:3000/api/animais` | Lista os animais para adoção, com filtros opcionais. <br>**Exemplo:** `?especie=gato&porte=pequeno` |
| `GET` | `http://localhost:3000/api/animais/:id` | Exibe os detalhes de um animal que esteja **disponível para adoção**. |

#### Realizando uma Doação

Qualquer pessoa pode realizar uma doação para a organização através desta rota.

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `http://localhost:3000/api/doacoes` | Registra uma nova doação para a organização. |

**Exemplo de Body:**

```json
{
  "nome": "Maria Souza",
  "email": "maria@gmail.com",
  "valor": 75.50,
  "mensagem": "Parabéns pelo trabalho incrível! Espero que ajude."
}
```

-----

### 🔒 Rotas de Tutor (Protegidas)

Estas rotas requerem que o usuário (tutor) esteja logado e envie o `Bearer Token`.

#### Preenchendo o Questionário de Adoção

Antes de poder solicitar uma adoção, o tutor **deve** preencher completamente o questionário. O `TutorId` é extraído automaticamente do token de autenticação.

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `http://localhost:3000/api/questionario` | Envia o formulário de pré-adoção preenchido. |

**Exemplo de Body:**

```json
{
  "empregado": true,
  "quantos_animais_possui": 1,
  "motivos_para_adotar": "Quero companhia e dar um lar a um animal necessitado.",
  "quem_vai_sustentar_o_animal": "Eu e meu cônjuge.",
  "numero_adultos_na_casa": 2,
  "numero_criancas_na_casa": 1,
  "idades_criancas": [8],
  "residencia_tipo": "Casa com quintal murado.",
  "proprietario_permite_animais": true,
  "todos_de_acordo_com_adocao": true,
  "responsavel_pelo_animal": "Eu, o tutor principal.",
  "responsavel_concorda_com_adocao": true,
  "ha_alergico_ou_pessoas_que_nao_gostam": false,
  "gasto_mensal_estimado": 250.00,
  "valor_disponivel_no_orcamento": true,
  "tipo_alimentacao": "Ração Super Premium.",
  "local_que_o_animal_vai_ficar": "Dentro de casa, com acesso ao quintal.",
  "forma_de_permanencia": "Solto dentro de casa/quintal.",
  "forma_de_confinamento": "Nenhuma, sempre solto.",
  "tera_brinquedos": true,
  "tera_passeios_acompanhado": true,
  "tera_passeios_sozinho": false,
  "companhia_outro_animal": true,
  "companhia_humana_24h": false,
  "companhia_humana_parcial": true,
  "sem_companhia_humana": false,
  "sem_companhia_animal": false,
  "o_que_faz_em_viagem": "Deixo com um familiar de confiança ou em hotel para pets.",
  "o_que_faz_se_fugir": "Procuro imediatamente na vizinhança, faço cartazes e divulgo nas redes sociais.",
  "o_que_faz_se_nao_puder_criar": "Procuro um novo lar responsável entre amigos ou familiares.",
  "destino_animais_anteriores": "Meu último animal faleceu de velhice, com 15 anos.",
  "costuma_esterilizar": true,
  "costuma_vacinar": true,
  "costuma_vermifugar": true,
  "veterinario_usual": "Clínica Vet Vida, Dr. Carlos.",
  "envia_fotos_e_videos_do_local": true,
  "aceita_visitas_e_fotos_do_animal": true,
  "topa_entrar_grupo_adotantes": true,
  "concorda_com_taxa_adocao": true,
  "data_disponivel_para_buscar_animal": "2025-10-05"
}
```

#### Outras Ações do Tutor

| Método | Endpoint | Descrição | Exemplo de Body |
| :--- | :--- | :--- | :--- |
| `GET` | `http://localhost:3000/api/tutores/:id` | Consulta os dados do próprio perfil. | - |
| `PATCH` | `http://localhost:3000/api/tutores/:id` | Altera os dados do próprio perfil. | `{"cidade": "Campinas", "telefone": "19123456789"}` |
| `POST` | `http://localhost:3000/api/adocoes` | Solicita a adoção de um animal. | `{"animalId": "uuid-do-animal"}` |

-----

## 👥 Desenvolvedores

**Pedro Coltro, Lucas D'Ávila, Mylenna Ponciano e Matheus Berozzi**
