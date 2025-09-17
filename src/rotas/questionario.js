import { Router } from 'express';
import QuestionarioControlador from '../controladores/QuestionarioControlador.js';
import autenticar from '../intermediarios/autenticar.js';

const router = Router();

router.post('/', autenticar, QuestionarioControlador.responder);

export default router;
