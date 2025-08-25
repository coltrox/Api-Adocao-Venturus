import { Router } from 'express';
import TutorControlador from '../controladores/TutorControlador.js';
import autenticar from '../intermediarios/autenticar.js';

const router = Router();

// cadastro de tutor (público)
router.post('/', TutorControlador.cadastrar);

// atualização de tutor (autenticado e dono da conta OU admin)
// (aqui um exemplo simples: só exige autenticação; refine se quiser validar dono)
router.patch('/:id', autenticar, TutorControlador.atualizar);

// detalhes do tutor (autenticado)
router.get('/:id', autenticar, TutorControlador.detalhes);

export default router;
