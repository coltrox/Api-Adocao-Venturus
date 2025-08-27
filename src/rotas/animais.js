import express from 'express';
import AnimalControlador from '../controladores/AnimalControlador.js';

const router = express.Router();

// GET /animais -> Lista animais disponíveis para adoção (com filtros)
// (Usa o método 'listarDisponiveis' que criamos no controller)
router.get('/', AnimalControlador.listarDisponiveis);

export default router;