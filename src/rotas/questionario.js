import { Router } from 'express';
import QuestionarioControlador from '../controladores/QuestionarioControlador.js';
import autenticar from '../intermediarios/autenticar.js';

const router = Router();

// enviar respostas do questionário (autenticado)
router.post('/', autenticar, QuestionarioControlador.responder);

export default router;
