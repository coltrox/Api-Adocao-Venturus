import { Router } from 'express';
import DoacaoControlador from '../controladores/DoacaoControlador.js';
import autenticar from '../intermediarios/autenticar.js';

const router = Router();

router.post('/', autenticar, DoacaoControlador.criar);

export default router;
