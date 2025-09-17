import express from 'express';
import AnimalControlador from '../controladores/AnimalControlador.js';

const router = express.Router();

router.get('/', AnimalControlador.listarDisponiveis);

export default router;