import express from 'express';
import multer from 'multer';
import AnimalControlador from '../controladores/AnimalControlador.js';
import autenticar from '../intermediarios/autenticar.js';
import verificarAdmin from '../intermediarios/verificarAdmin.js';

const router = express.Router();
// Configuração do Multer para upload de imagem em memória
const upload = multer();

// POST /admin/animais -> Cadastra um novo animal
router.post('/', autenticar, verificarAdmin, upload.single('foto'), AnimalControlador.cadastrar);

// GET /admin/animais/:id -> Busca um animal por ID com seus pedidos de adoção
router.get('/:id', autenticar, verificarAdmin, AnimalControlador.buscarPorIdAdmin);

// PATCH /admin/animais/:id -> Atualiza os dados de um animal
router.patch('/:id', autenticar, verificarAdmin, upload.single('foto'), AnimalControlador.adminAtualizar);

// DELETE /admin/animais/:id -> Deleta um animal
router.delete('/:id', autenticar, verificarAdmin, AnimalControlador.adminDeletar);

export default router;