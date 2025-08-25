import { Animal } from '../modelos/index.js';

class AnimalControlador {
  // POST /animais
  static async cadastrar(req, res) {
    try {
      const { nome, especie, porte, castrado, vacinado, descricao } = req.body;
      if (!req.file) return res.status(400).json({ erro: 'Foto é obrigatória' });

      const novoAnimal = await Animal.create({
        nome,
        especie,
        porte,
        castrado: String(castrado) === 'true' || castrado === true,
        vacinado: String(vacinado) === 'true' || vacinado === true,
        descricao,
        foto: req.file.buffer
      });

      return res.status(201).json(novoAnimal);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  // GET /animais (público)
  static async listar(req, res) {
    try {
      const animais = await Animal.findAll({
        attributes: ['id', 'nome', 'especie', 'porte', 'castrado', 'vacinado', 'descricao', 'createdAt']
      });
      return res.json(animais);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  // GET /animais/:id (público)
  static async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const animal = await Animal.findByPk(id);
      if (!animal) return res.status(404).json({ erro: 'Animal não encontrado' });
      return res.json(animal);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  // GET /admin/animais (admin)
  static async adminListar(req, res) {
    try {
      const animais = await Animal.findAll();
      return res.json(animais);
    } catch (e) {
      return res.status(500).json({ erro: e.message });
    }
  }

  // PATCH /admin/animais/:id (admin)
  static async adminAtualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, especie, porte, castrado, vacinado, descricao } = req.body;

      const animal = await Animal.findByPk(id);
      if (!animal) return res.status(404).json({ erro: 'Animal não encontrado' });

      if (nome !== undefined) animal.nome = nome;
      if (especie !== undefined) animal.especie = especie;
      if (porte !== undefined) animal.porte = porte;
      if (castrado !== undefined) animal.castrado = String(castrado) === 'true' || castrado === true;
      if (vacinado !== undefined) animal.vacinado = String(vacinado) === 'true' || vacinado === true;
      if (descricao !== undefined) animal.descricao = descricao;
      if (req.file) animal.foto = req.file.buffer;

      await animal.save();
      return res.json(animal);
    } catch (e) {
      return res.status(500).json({ erro: e.message });
    }
  }

  // DELETE /admin/animais/:id (admin)
  static async adminDeletar(req, res) {
    try {
      const { id } = req.params;
      const animal = await Animal.findByPk(id);
      if (!animal) return res.status(404).json({ erro: 'Animal não encontrado' });

      await animal.destroy();
      return res.status(204).send();
    } catch (e) {
      return res.status(500).json({ erro: e.message });
    }
  }
}

export default AnimalControlador;
