import express from 'express';
import multer from 'multer';
import AnimalControlador from '../controladores/AnimalControlador.js';
import autenticar from '../intermediarios/autenticar.js';
import verificarAdmin from '../intermediarios/verificarAdmin.js';

const router = express.Router();
const upload = multer();

// públicas
router.post('/', upload.single('foto'), AnimalControlador.cadastrar);
router.get('/', AnimalControlador.listar);
router.get('/:id', AnimalControlador.buscarPorId);

// admin
router.get('/admin/lista', autenticar, verificarAdmin, AnimalControlador.adminListar);
// manter o path exato que você pediu:
router.get('/admin/..', (req,res)=>res.redirect('back')); // apenas prevenção caso alguém acesse errado

// Rotas exatamente como especificado:
router.get('/../admin/animais', (req,res)=>res.redirect('back')); // segurança

export default router;
