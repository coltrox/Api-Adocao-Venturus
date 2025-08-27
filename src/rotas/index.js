import express from 'express';
import rotasDeAutenticacao from './autenticacao.js';
import rotasDeTutores from './tutores.js';
import rotasDeQuestionario from './questionario.js';
import rotasDeAnimaisPublicas from './animais.js';
import rotasDeAdocoes from './adocoes.js';
import rotasDeDoacoes from './doacoes.js';

// Rotas de Admin
import rotasDeAdminAnimais from './admin.animais.js';

const router = express.Router();

// Monta todas as rotas da aplicação
router.use('/login', rotasDeAutenticacao); // POST /api/login
router.use('/usuario', rotasDeTutores); // POST /api/usuario
router.use('/tutores', rotasDeTutores); // PATCH /api/tutores/:id, GET /api/tutores/:id
router.use('/questionario', rotasDeQuestionario); // POST /api/questionario
router.use('/animais', rotasDeAnimaisPublicas); // GET /api/animais
router.use('/adocoes', rotasDeAdocoes); // POST /api/adocoes, PATCH /api/adocoes/:id
router.use('/doacoes', rotasDeDoacoes); // POST /api/doacoes

// Monta as rotas de Admin com seus prefixos específicos
router.use('/admin/animais', rotasDeAdminAnimais);
// GET /api/admin/animais/:id, PATCH /api/admin/animais/:id, etc.

// Rota de admin para buscar um animal específico com seus pedidos
// A especificação pede GET /animais/:id para admin, então criamos ela aqui
// para não conflitar com a rota pública /animais
router.use('/animais', rotasDeAdminAnimais); // GET /api/animais/:id (admin)


export default router;