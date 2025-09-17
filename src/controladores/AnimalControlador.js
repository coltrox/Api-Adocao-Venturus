import { Animal, Adocao } from '../modelos/index.js';

class AnimalControlador {
  // POST /animais (Rota de Admin)
  static async cadastrar(req, res) {
    try {
      const { nome, especie, porte, castrado, vacinado, descricao } = req.body;
      
      if (!req.file) {
        return res.status(400).json({ erro: 'O campo foto é obrigatório.' });
      }

      const boolCastrado = String(castrado).toLowerCase() === 'true';
      const boolVacinado = String(vacinado).toLowerCase() === 'true';

      const novoAnimal = await Animal.create({
        nome,
        especie,
        porte,
        castrado: boolCastrado,
        vacinado: boolVacinado,
        descricao,
        foto: req.file.buffer
      });
      
      const response = novoAnimal.toJSON();
      response.foto = "Buffer";

      return res.status(201).json(response);
    } catch (erro) {
      if (erro.name === 'SequelizeValidationError') {
        return res.status(400).json({ erro: 'Todos os campos obrigatórios devem ser preenchidos corretamente.' });
      }
      console.error(erro);
      return res.status(500).json({ erro: 'Erro interno ao cadastrar o animal.' });
    }
  }

  // GET /animais (Público, com filtros)
  static async listarDisponiveis(req, res) {
    try {
      const { especie, porte, castrado, vacinado } = req.query;
      const where = { adotado: false };

      if (especie) where.especie = especie;
      if (porte) where.porte = porte;
      if (castrado) where.castrado = String(castrado).toLowerCase() === 'true';
      if (vacinado) where.vacinado = String(vacinado).toLowerCase() === 'true';

      const { count, rows } = await Animal.findAndCountAll({
        where,
        order: [['createdAt', 'ASC']],
        attributes: { exclude: ['foto'] }
      });

      return res.status(200).json({
        data: rows,
        total: count
      });
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ erro: 'Erro ao buscar animais' });
    }
  }

  // GET /animais/:id (Rota de Admin)
  static async buscarPorIdAdmin(req, res) {
    try {
      const { id } = req.params;
      const animal = await Animal.findByPk(id, {
        include: [{
          model: Adocao,
          order: [['createdAt', 'ASC']] 
        }]
      });

      if (!animal) return res.status(404).json({ erro: 'Animal não encontrado' });
      
      const response = animal.toJSON();
      response.pedidos = response.Adocoes ? response.Adocoes.map(p => p.id) : [];
      delete response.Adocoes;
      response.foto = response.foto ? "Buffer" : null;

      return res.json(response);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ erro: 'Erro interno no servidor' });
    }
  }

  // PATCH /admin/animais/:id (Rota de Admin)
  static async adminAtualizar(req, res) {
    try {
      const { id } = req.params;
      const dadosParaAtualizar = req.body;

      if (Object.keys(dadosParaAtualizar).length === 0 && !req.file) {
        return res.status(400).json({ erro: 'Nenhum campo foi fornecido para atualização' });
      }

      const animal = await Animal.findByPk(id);
      if (!animal) return res.status(404).json({ erro: 'Animal não encontrado' });

      if (req.file) {
        dadosParaAtualizar.foto = req.file.buffer;
      }

      await animal.update(dadosParaAtualizar);

      const { foto, ...animalSemFoto } = animal.toJSON();
      return res.json(animalSemFoto);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ erro: 'Erro ao atualizar o animal' });
    }
  }

  // DELETE /admin/animais/:id (Rota de Admin)
  static async adminDeletar(req, res) {
    try {
      const { id } = req.params;
      const animal = await Animal.findByPk(id);
      if (!animal) return res.status(404).json({ erro: 'Animal não encontrado' });

      await animal.destroy();
      return res.status(204).send();
    } catch (e) {
      console.error(e);
      return res.status(500).json({ erro: 'Erro ao remover animal' });
    }
  }
}

export default AnimalControlador;