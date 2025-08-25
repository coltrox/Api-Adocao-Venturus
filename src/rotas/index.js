import { Router } from 'express';
import animaisRoutes from './animais.js';
import tutoresRoutes from './tutores.js';
import adocoesRoutes from './adocoes.js';
import doacoesRoutes from './doacoes.js';
import authRoutes from './autenticacao.js';
import questionarioRoutes from './questionario.js';
import adminAnimaisRoutes from './admin.animais.js';

const router = Router();

/**
 * Rotas da API (conforme solicitado):
 * | POST /animais
 * | GET /animais
 * | GET /animais/:id
 * | POST /tutores
 * | PATCH /tutores/:id
 * | GET /tutores/:id
 * | POST /questionário   -> usaremos /questionario (sem acento)
 * | POST /adocoes
 * | GET /admin/animais
 * | PATCH /admin/animais/:id
 * | DELETE /admin/animais/:id
 * | POST /login
 * | POST /doacoes 
 */
router.use('/animais', animaisRoutes);
router.use('/tutores', tutoresRoutes);
router.use('/adocoes', adocoesRoutes);
router.use('/doacoes', doacoesRoutes);
router.use('/questionario', questionarioRoutes);
router.use('/admin/animais', adminAnimaisRoutes);
router.use('/login', authRoutes); // POST /login

export default router;
