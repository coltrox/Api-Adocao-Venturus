import { Router } from 'express';
import AdocaoControlador from '../controladores/AdocaoControlador.js';
import autenticar from '../intermediarios/autenticar.js';

const router = Router();

// solicitar adoção (autenticado)
router.post('/', autenticar, AdocaoControlador.solicitar);

// NOVA ROTA
// atualizar status da adoção (autenticado)
router.patch('/:id', autenticar, AdocaoControlador.atualizarStatus);

export default router;
