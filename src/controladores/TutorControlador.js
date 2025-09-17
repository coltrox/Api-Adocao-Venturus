import bcrypt from 'bcrypt';
import { Tutor, Questionario } from '../modelos/index.js';

class TutorControlador {
  // POST /usuario
  static async cadastrar(req, res) {
    try {
      const { 
        nome_completo, 
        email, 
        senha, 
        cidade, 
        estado, 
        idade, 
        telefone, 
        instagram, 
        facebook, 
        admin 
      } = req.body;

      if (!nome_completo || !email || !senha || !cidade || !estado || !idade || !telefone) {
        return res.status(400).json({ erro: "Todos os campos obrigatórios devem ser preenchidos corretamente." });
      }

      const existente = await Tutor.findOne({ where: { email } });
      if (existente) return res.status(400).json({ erro: "Email preenchido já está sendo utilizado." });

      const hash = await bcrypt.hash(senha, 10);
      const tutor = await Tutor.create({
        nome_completo,
        email,
        senha: hash,
        cidade,
        estado,
        idade,
        telefone,
        instagram,
        facebook,
        admin: !!admin
      });

      const { senha: _, ...tutorSemSenha } = tutor.toJSON();
      return res.status(201).json(tutorSemSenha);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ erro: "Erro interno ao cadastrar o tutor." });
    }
  }

  // PATCH /tutores/:id
  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      const dadosParaAtualizar = req.body;

      if (Object.keys(dadosParaAtualizar).length === 0) {
        return res.status(400).json({ erro: "Pelo menos um campo deve ser enviado para atualização" });
      }
      
      const tutor = await Tutor.findByPk(id);
      if (!tutor) return res.status(404).json({ erro: 'Tutor não encontrado' });

      if (dadosParaAtualizar.email && dadosParaAtualizar.email !== tutor.email) {
        const existe = await Tutor.findOne({ where: { email: dadosParaAtualizar.email } });
        if (existe) return res.status(400).json({ erro: 'E-mail já em uso' });
      }

      if (dadosParaAtualizar.senha) {
        dadosParaAtualizar.senha = await bcrypt.hash(dadosParaAtualizar.senha, 10);
      }

      await tutor.update(dadosParaAtualizar);

      const { senha: _, ...tutorSemSenha } = tutor.toJSON();
      return res.json(tutorSemSenha);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ erro: "Erro ao atualizar os dados do tutor" });
    }
  }

  // GET /tutores/:id
  static async detalhes(req, res) {
    try {
      const { id } = req.params;
      const tutor = await Tutor.findByPk(id, {
        include: [{
          model: Questionario,
          as: 'questionario'
        }]
      });

      if (!tutor) return res.status(404).json({ erro: 'Tutor não encontrado' });
      
      const { senha: _, ...tutorSemSenha } = tutor.toJSON();

      return res.json(tutorSemSenha);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ erro: "Erro ao buscar dados do tutor" });
    }
  }
}

export default TutorControlador;