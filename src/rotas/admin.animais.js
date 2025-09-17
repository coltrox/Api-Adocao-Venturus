import express from 'express';
import multer from 'multer';
import AnimalControlador from '../controladores/AnimalControlador.js';
import autenticar from '../intermediarios/autenticar.js';
import verificarAdmin from '../intermediarios/verificarAdmin.js';

const router = express.Router();
const upload = multer();

router.post('/', autenticar, verificarAdmin, upload.single('foto'), AnimalControlador.cadastrar);
// GET /admin/animais/:id
router.get('/:id', autenticar, verificarAdmin, AnimalControlador.buscarPorIdAdmin);
// PATCH /admin/animais/:id
router.patch('/:id', autenticar, verificarAdmin, upload.single('foto'), AnimalControlador.adminAtualizar);
// DELETE /admin/animais/:id
router.delete('/:id', autenticar, verificarAdmin, AnimalControlador.adminDeletar);

export default router;