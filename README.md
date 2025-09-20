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

| Método | Endpoint | Body (Exemplo Completo) | Resposta |
| :--- | :--- | :--- | :--- |
| `POST` | `http://localhost:3000/api/usuario` | `{<br>  "nome_completo": "Administrador do Sistema",<br>  "email": "admin@email.com",<br>  "senha": "senha_segura_admin",<br>  "cidade": "São Paulo",<br>  "estado": "SP",<br>  "idade": 35,<br>  "telefone": "11987654321",<br>  "instagram": "@admin_pets",<br>  "facebook": "/admin.pets",<br>  "endereco": "Rua da Administração, 123",<br>  "admin": true<br>}` | `json {"id":"uuid","nome_completo":"Administrador do Sistema","email":"admin@email.com"}` |

### Passo 2: Realizando o Login

Com o usuário administrador criado, o próximo passo é autenticá-lo para obter um token de acesso. Este token será necessário para acessar todas as rotas protegidas.

| Método | Endpoint | Body | Resposta |
| :--- | :--- | :--- | :--- |
| `POST` | `http://localhost:3000/api/login` | `json {"email":"admin@email.com","senha":"senha_segura_admin"}` | `json {"usuario":{"id":"uuid","nome_completo":"Administrador do Sistema","admin":true},"token":"seu_token_jwt"}` |

**Atenção:** Copie e guarde o `token` retornado. Ele deverá ser enviado no cabeçalho de autorização para acessar as rotas protegidas.

**Formato do Cabeçalho:**

```
Authorization: Bearer <seu_token_jwt>
```

-----

### 🛠️ Rotas de Administrador (Protegidas)

As rotas a seguir são exclusivas para administradores e requerem a inclusão do `Bearer Token` no cabeçalho `Authorization` de cada requisição. Elas permitem o gerenciamento completo de tutores, animais e processos de adoção.

#### Criando um Novo Animal

Com o token de admin, agora você pode cadastrar novos animais na plataforma.

| Método | Endpoint | Body (Exemplo Completo) | Resposta |
| :--- | :--- | :--- | :--- |
| `POST` | `http://localhost:3000/api/admin/animais` | `{<br>  "nome": "Bolinha",<br>  "especie": "Cachorro",<br>  "porte": "Pequeno",<br>  "castrado": true,<br>  "vacinado": true,<br>  "descricao": "Um cãozinho muito dócil e brincalhão, adora crianças e outros animais. Se adapta bem em apartamentos.",<br>  "foto": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."<br>}` | `json {"id":"uuid","nome":"Bolinha","especie":"Cachorro"}` |

#### Gerenciamento Completo (Admin)

| Método | Endpoint | Descrição e Exemplo | Resposta |
| :--- | :--- | :--- | :--- |
| `GET` | `http://localhost:3000/api/tutores` | Lista todos os tutores cadastrados no sistema. | `json [{"id":"uuid","nome_completo":"João da Silva"}, ...]` |
| `GET` | `http://localhost:3000/api/admin/animais/:id` | Consulta os detalhes de um animal específico e todos os seus pedidos de adoção. | ` json {"id":"uuid","nome":"Bolinha","pedidos":[...]}  ` |
| `PATCH` | `http://localhost:3000/api/admin/animais/:id` | Altera os dados de um animal. <br>**Exemplo:** `json {"porte": "médio", "vacinado": false}` | `json {"id":"uuid","nome":"Bolinha","porte":"médio"}` |
| `DELETE` | `http://localhost:3000/api/admin/animais/:id` | Remove um animal do sistema. | `json {"message":"Animal removido com sucesso"}` |
| `PATCH` | `http://localhost:3000/api/adocoes/:id` | Altera o status de um pedido de adoção (`em_analise`, `aprovada`, `rejeitada`). <br>**Exemplo:** `json {"status": "aprovada"}` | `json {"id":"uuid","status":"aprovada"}` |
| `GET` | `http://localhost:3000/api/adocoes` | Lista todos os pedidos de adoção registrados. | `json [{"id":"uuid","status":"em_analise"}, ...]` |
| `GET` | `http://localhost:3000/api/doacoes` | Lista todas as doações recebidas. | `json [{"doacao_id":"uuid","valor":50.00}, ...]` |

-----

### 🟢 Rotas Públicas

Rotas que não exigem autenticação.

| Método | Endpoint | Descrição e Exemplo | Resposta |
| :--- | :--- | :--- | :--- |
| `POST` | `http://localhost:3000/api/usuario` | Cria um novo usuário (tutor). | `json {"id":"uuid","nome_completo":"João da Silva","email":"joao@email.com"}` |
| `GET` | `http://localhost:3000/api/animais` | Lista os animais disponíveis para adoção, com filtros opcionais. <br>**Exemplo:** `?especie=gato&porte=pequeno` | `json {"data":[{"id":"uuid","nome":"Frajola"}],"total":1}` |
| `GET` | `http://localhost:3000/api/animais/:id` | Exibe os detalhes de um animal específico. | `json {"id":"uuid","nome":"Frajola","especie":"gato"}` |

#### Realizando uma Doação

Qualquer pessoa pode realizar uma doação para a organização através da rota pública abaixo.

| Método | Endpoint | Body (Exemplo Completo) | Resposta |
| :--- | :--- | :--- | :--- |
| `POST` | `http://localhost:3000/api/doacoes` | `{<br>  "nome": "Maria Souza",<br>  "email": "maria@email.com",<br>  "valor": 75.50,<br>  "mensagem": "Parabéns pelo trabalho incrível! Espero que ajude."<br>}` | `json {"doacao_id":"uuid","nome":"Maria Souza","valor":75.50}` |

-----

### 🔒 Rotas de Tutor (Protegidas)

Estas rotas requerem que o usuário (tutor) esteja logado e envie o `Bearer Token`.

#### Preenchendo o Questionário de Adoção

Antes de poder solicitar uma adoção, o tutor **deve** preencher completamente o questionário. O `TutorId` é extraído automaticamente do token de autenticação.

| Método | Endpoint | Body (Exemplo Completo) | Resposta |
| :--- | :--- | :--- | :--- |
| `POST` | `http://localhost:3000/api/questionario` | `{<br>  "empregado": true,<br>  "quantos_animais_possui": 1,<br>  "motivos_para_adotar": "Quero companhia e dar um lar a um animal necessitado.",<br>  "quem_vai_sustentar_o_animal": "Eu e meu cônjuge.",<br>  "numero_adultos_na_casa": 2,<br>  "numero_criancas_na_casa": 1,<br>  "idades_criancas": [8],<br>  "residencia_tipo": "Casa com quintal murado.",<br>  "proprietario_permite_animais": true,<br>  "todos_de_acordo_com_adocao": true,<br>  "responsavel_pelo_animal": "Eu, o tutor principal.",<br>  "responsavel_concorda_com_adocao": true,<br>  "ha_alergico_ou_pessoas_que_nao_gostam": false,<br>  "gasto_mensal_estimado": 250.00,<br>  "valor_disponivel_no_orcamento": true,<br>  "tipo_alimentacao": "Ração Super Premium.",<br>  "local_que_o_animal_vai_ficar": "Dentro de casa, com acesso ao quintal.",<br>  "forma_de_permanencia": "Solto dentro de casa/quintal.",<br>  "forma_de_confinamento": "Nenhuma, sempre solto.",<br>  "tera_brinquedos": true,<br>  "tera_passeios_acompanhado": true,<br>  "tera_passeios_sozinho": false,<br>  "companhia_outro_animal": true,<br>  "companhia_humana_24h": false,<br>  "companhia_humana_parcial": true,<br>  "sem_companhia_humana": false,<br>  "sem_companhia_animal": false,<br>  "o_que_faz_em_viagem": "Deixo com um familiar de confiança ou em hotel para pets.",<br>  "o_que_faz_se_fugir": "Procuro imediatamente na vizinhança, faço cartazes e divulgo nas redes sociais.",<br>  "o_que_faz_se_nao_puder_criar": "Procuro um novo lar responsável entre amigos ou familiares.",<br>  "destino_animais_anteriores": "Meu último animal faleceu de velhice, com 15 anos.",<br>  "costuma_esterilizar": true,<br>  "costuma_vacinar": true,<br>  "costuma_vermifugar": true,<br>  "veterinario_usual": "Clínica Vet Vida, Dr. Carlos.",<br>  "envia_fotos_e_videos_do_local": true,<br>  "aceita_visitas_e_fotos_do_animal": true,<br>  "topa_entrar_grupo_adotantes": true,<br>  "concorda_com_taxa_adocao": true,<br>  "data_disponivel_para_buscar_animal": "2025-10-05"<br>}` | `json {"id":"uuid-questionario","TutorId":"uuid-tutor","message":"Questionário enviado com sucesso!"}` |

#### Outras Ações do Tutor

| Método | Endpoint | Descrição e Exemplo | Resposta |
| :--- | :--- | :--- | :--- |
| `GET` | `http://localhost:3000/api/tutores/:id` | Consulta os dados do próprio perfil, incluindo o questionário. | `json {"id":"uuid","nome_completo":"João da Silva","questionario":{...}}` |
| `PATCH` | `http://localhost:3000/api/tutores/:id` | Altera os dados do próprio perfil. <br>**Exemplo:** `json {"cidade": "Campinas"}` | `json {"id":"uuid","nome_completo":"João da Silva","cidade":"Campinas"}` |
| `POST` | `http://localhost:3000/api/adocoes` | Solicita a adoção de um animal (requer questionário preenchido).<br>**Exemplo:** `json {"animalId": "uuid-do-animal"}` | `json {"id":"uuid-pedido","status":"em_analise","posicao_fila":1}` |

-----

## 👥 Desenvolvedores

**Pedro Coltro, Lucas D'Ávila, Mylenna Ponciano e Matheus Berozzi**
