import { Router } from 'express';
import TutorControlador from '../controladores/TutorControlador.js';
import autenticar from '../intermediarios/autenticar.js';

const router = Router();

router.post('/', TutorControlador.cadastrar);

router.patch('/:id', autenticar, TutorControlador.atualizar);

router.get('/:id', autenticar, TutorControlador.detalhes);

export default router;
