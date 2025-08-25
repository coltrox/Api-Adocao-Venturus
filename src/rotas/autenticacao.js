import { Router } from 'express';
import AuthControlador from '../controladores/AuthControlador.js';

const router = Router();

// login
router.post('/', AuthControlador.login);

export default router;
