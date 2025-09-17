import { Router } from 'express';
import AdocaoControlador from '../controladores/AdocaoControlador.js';
import autenticar from '../intermediarios/autenticar.js';

const router = Router();

router.post('/', autenticar, AdocaoControlador.solicitar);

router.patch('/:id', autenticar, AdocaoControlador.atualizarStatus);

export default router;
