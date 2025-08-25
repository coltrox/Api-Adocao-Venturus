import { Router } from 'express';
import multer from 'multer';
import AnimalControlador from '../controladores/AnimalControlador.js';
import autenticar from '../intermediarios/autenticar.js';
import verificarAdmin from '../intermediarios/verificarAdmin.js';

const router = Router();
const upload = multer();

router.get('/', autenticar, verificarAdmin, AnimalControlador.adminListar);            // GET /admin/animais
router.patch('/:id', autenticar, verificarAdmin, upload.single('foto'), AnimalControlador.adminAtualizar); // PATCH /admin/animais/:id
router.delete('/:id', autenticar, verificarAdmin, AnimalControlador.adminDeletar);     // DELETE /admin/animais/:id

export default router;
