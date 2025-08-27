🐾 API de Adoção de Pets
API para gerenciamento de adoção de animais, cadastro de tutores, doações e administração.
Desenvolvida em Node.js com Express, SQLite e JWT para autenticação.

✅ Tecnologias Utilizadas
Node.js + Express
SQLite com Sequelize ORM
JWT para autenticação
Multer para upload de imagens (armazenadas como Buffer)
dotenv para variáveis de ambiente
📌 Configuração Inicial
1. Clone o repositório
git clone https://github.com/coltrox/Api-Adocao-Venturus.git
cd api-adocao-pets
2. Instale as dependências
npm install
3. Crie o arquivo .env na raiz do projeto:
PORT=3000
DB_STORAGE=./database.sqlite
JWT_SECRET=sua_chave_secreta
4. Inicie o servidor
npm run start
Certifique-se que o arquivo database.sqlite existe.

🔑 Autenticação
Faça login em POST /api/login para receber um token JWT.
Envie o token no header Authorization nas rotas protegidas:
Authorization: Bearer <TOKEN>
✅ Endpoints Principais
1. Criar um Tutor um Admin e um não Admin
POST /api/tutores
Body (JSON):

{
  "nome": "Tutor Admin",
  "email": "admin@teste.com",
  "senha": "123456",
  "admin": true
}
✅ Retorna dados do tutor cadastrado. depois Body (JSON):

{
  "nome": "Tutor normal",
  "email": "tutor@teste.com",
  "senha": "123456",
  "admin": false
}
✅ Retorna dados do tutor cadastrado.

2. Login
POST /api/login
Body (JSON):

{
  "email": "admin@teste.com",
  "senha": "123456"
}
✅ Retorna token JWT e dados do usuário.

3. Cadastrar Animal com Foto
POST /api/animais
Headers:

Authorization: Bearer <TOKEN>
Content-Type: form-data
Body (form-data):

nome: Rex
especie: Cachorro
porte: Médio
castrado: true
vacinado: true
descricao: Cachorro dócil e carinhoso
foto: (selecione uma imagem)
✅ Resposta esperada:

{
  "id": "uuid",
  "nome": "Rex",
  "especie": "Cachorro",
  "porte": "Médio",
  "castrado": true,
  "vacinado": true,
  "descricao": "Cachorro dócil e carinhoso",
  "foto": "<Buffer>"
}
4. Listar Animais Disponíveis
GET /api/animais
✅ Retorna lista de animais.

5. Atualizar dados do Tutor
PATCH /api/tutores/:id
Headers:

Authorization: Bearer <TOKEN>
Body (JSON):

{
  "nome": "Tutor Atualizado",
  "endereco": "Rua Nova, 123"
}
6. Admin – Ver todos os animais
GET /api/admin/animais
Headers:

Authorization: Bearer <TOKEN>
7. Admin – Atualizar Animal
PATCH /api/admin/animais/:id
Headers:

Authorization: Bearer <TOKEN>
Body (JSON):

{
  "descricao": "Atualização de descrição"
}
8. Admin – Deletar Animal
DELETE /api/admin/animais/:id
Headers:

Authorization: Bearer <TOKEN>
9.1 Pedido de Adoção
POST /api/adocoes
Headers:

Authorization: Bearer <TOKEN>
Body (JSON):

{
  "animalId": "id-do-animal",
  "tutorId": "id-do-tutor"
}
**9.2 Atualizar Status da Adoção
PATCH /api/adocoes/:id Headers:

Authorization: Bearer <TOKEN>
Body (JSON):

{
  "status": "aprovada"
}
Valores possíveis para status:pendente/aprovada/recusada
10. Apoie a ONG (Doações)
POST /api/doacoes
Headers:

Authorization: Bearer <TOKEN>
Body (JSON):

{
  "valor": 100,
  "metodo": "PIX",
  "tutorId": "id-do-tutor"
}
✅ tutorId é obrigatório.

✅ Observações finais
Uploads de imagem: usamos multer() em memória para salvar Buffer no campo foto.
Autenticação: utilize o token JWT em rotas protegidas.
Banco: SQLite definido pelo .env na variável DB_STORAGE.
