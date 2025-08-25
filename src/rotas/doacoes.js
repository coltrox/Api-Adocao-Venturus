import { Router } from 'express';
import DoacaoControlador from '../controladores/DoacaoControlador.js';
import autenticar from '../intermediarios/autenticar.js';

const router = Router();

// apoio à ONG (autenticado)
router.post('/', autenticar, DoacaoControlador.criar);

export default router;
