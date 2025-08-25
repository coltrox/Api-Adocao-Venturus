import bcrypt from 'bcrypt';
import { Tutor } from '../modelos/index.js';

class TutorControlador {
  // POST /tutores
  static async cadastrar(req, res) {
    try {
      const { nome, email, senha, endereco, telefone, admin } = req.body;

      const existente = await Tutor.findOne({ where: { email } });
      if (existente) return res.status(400).json({ erro: 'E-mail já cadastrado' });

      const hash = await bcrypt.hash(senha, 10);

      const tutor = await Tutor.create({
        nome, email, senha: hash, endereco, telefone, admin: !!admin
      });

      // não retornar hash
      const { senha: _, ...tutorSemSenha } = tutor.toJSON();
      return res.status(201).json(tutorSemSenha);
    } catch (e) {
      return res.status(500).json({ erro: e.message });
    }
  }

  // PATCH /tutores/:id
  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, senha, endereco, telefone } = req.body;

      const tutor = await Tutor.findByPk(id);
      if (!tutor) return res.status(404).json({ erro: 'Tutor não encontrado' });

      if (email && email !== tutor.email) {
        const existe = await Tutor.findOne({ where: { email } });
        if (existe) return res.status(400).json({ erro: 'E-mail já em uso' });
        tutor.email = email;
      }

      if (senha) {
        tutor.senha = await bcrypt.hash(senha, 10);
      }

      if (nome !== undefined) tutor.nome = nome;
      if (endereco !== undefined) tutor.endereco = endereco;
      if (telefone !== undefined) tutor.telefone = telefone;

      await tutor.save();
      const { senha: _, ...tutorSemSenha } = tutor.toJSON();
      return res.json(tutorSemSenha);
    } catch (e) {
      return res.status(500).json({ erro: e.message });
    }
  }

  // GET /tutores/:id
  static async detalhes(req, res) {
    try {
      const { id } = req.params;
      const tutor = await Tutor.findByPk(id, {
        attributes: ['id', 'nome', 'email', 'endereco', 'telefone', 'admin', 'createdAt', 'updatedAt']
      });
      if (!tutor) return res.status(404).json({ erro: 'Tutor não encontrado' });
      return res.json(tutor);
    } catch (e) {
      return res.status(500).json({ erro: e.message });
    }
  }
}

export default TutorControlador;
