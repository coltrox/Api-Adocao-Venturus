import { Animal, Adocao } from '../modelos/index.js';

class AnimalControlador {
  // POST /animais (Rota de Admin)
  static async cadastrar(req, res) {
    try {
      // Usando 'adotado' do modelo, que tem o valor padrão 'false'
      const { nome, especie, porte, castrado, vacinado, descricao } = req.body;
      
      if (!req.file) {
        return res.status(400).json({ erro: 'O campo foto é obrigatório.' });
      }

      // Converte valores de formulário (que podem ser strings) para booleanos
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
      response.foto = "Buffer"; // Retorna a string "Buffer" como na especificação

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
      // 1. Lógica de Filtros
      const { especie, porte, castrado, vacinado } = req.query;
      const where = { adotado: false }; // Sempre filtra por animais não adotados

      if (especie) where.especie = especie;
      if (porte) where.porte = porte;
      if (castrado) where.castrado = String(castrado).toLowerCase() === 'true';
      if (vacinado) where.vacinado = String(vacinado).toLowerCase() === 'true';

      // 2. Usar findAndCountAll para paginação e total
      const { count, rows } = await Animal.findAndCountAll({
        where,
        order: [['createdAt', 'ASC']], // Ordena do mais antigo para o mais novo
        attributes: { exclude: ['foto'] } // Exclui o buffer da foto da listagem
      });

      // 3. Formato de resposta padronizado
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
        // 4. Incluir pedidos de adoção associados
        include: [{
          model: Adocao,
          order: [['createdAt', 'ASC']] // Ordena os pedidos por ordem de chegada
        }]
      });

      if (!animal) return res.status(404).json({ erro: 'Animal não encontrado' });
      
      const response = animal.toJSON();
      // Mapeia para retornar apenas os IDs dos pedidos, como na especificação
      response.pedidos = response.Adocoes ? response.Adocoes.map(p => p.id) : [];
      delete response.Adocoes; // Remove o objeto completo de adoções
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
      // Adicionado 'adotado' aos campos que podem ser atualizados
      const dadosParaAtualizar = req.body;

      if (Object.keys(dadosParaAtualizar).length === 0 && !req.file) {
        return res.status(400).json({ erro: 'Nenhum campo foi fornecido para atualização' });
      }

      const animal = await Animal.findByPk(id);
      if (!animal) return res.status(404).json({ erro: 'Animal não encontrado' });

      // Adiciona o buffer do novo arquivo de imagem, se existir
      if (req.file) {
        dadosParaAtualizar.foto = req.file.buffer;
      }

      await animal.update(dadosParaAtualizar);

      // Retorna o animal atualizado conforme a especificação
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
      return res.status(204).send(); // 204 No Content
    } catch (e) {
      console.error(e);
      return res.status(500).json({ erro: 'Erro ao remover animal' });
    }
  }
}

export default AnimalControlador;