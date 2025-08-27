import bcrypt from 'bcrypt';
// Importe o Questionario para poder incluí-lo na busca
import { Tutor, Questionario } from '../modelos/index.js';

class TutorControlador {
  // POST /usuario (Lembre-se de atualizar a rota)
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

      // 1. Validação de campos obrigatórios, conforme a especificação
      if (!nome_completo || !email || !senha || !cidade || !estado || !idade || !telefone) {
        return res.status(400).json({ erro: "Todos os campos obrigatórios devem ser preenchidos corretamente." });
      }

      const existente = await Tutor.findOne({ where: { email } });
      // 2. Mensagem de erro padronizada
      if (existente) return res.status(400).json({ erro: "Email preenchido já está sendo utilizado." });

      const hash = await bcrypt.hash(senha, 10);

      // 3. Usar novos nomes de campos para criar o tutor
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

      // Não retornar o hash da senha
      const { senha: _, ...tutorSemSenha } = tutor.toJSON();
      return res.status(201).json(tutorSemSenha);
    } catch (e) {
      // 4. Mensagem de erro genérica padronizada
      console.error(e); // Logar o erro real para debug
      return res.status(500).json({ erro: "Erro interno ao cadastrar o tutor." });
    }
  }

  // PATCH /tutores/:id
  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      const dadosParaAtualizar = req.body;

      // 1. Validação de corpo da requisição vazio
      if (Object.keys(dadosParaAtualizar).length === 0) {
        return res.status(400).json({ erro: "Pelo menos um campo deve ser enviado para atualização" });
      }
      
      const tutor = await Tutor.findByPk(id);
      if (!tutor) return res.status(404).json({ erro: 'Tutor não encontrado' });

      // Se o e-mail estiver sendo atualizado, verifique a duplicidade
      if (dadosParaAtualizar.email && dadosParaAtualizar.email !== tutor.email) {
        const existe = await Tutor.findOne({ where: { email: dadosParaAtualizar.email } });
        if (existe) return res.status(400).json({ erro: 'E-mail já em uso' });
      }

      // Se a senha estiver sendo atualizada, crie um novo hash
      if (dadosParaAtualizar.senha) {
        dadosParaAtualizar.senha = await bcrypt.hash(dadosParaAtualizar.senha, 10);
      }

      // Atualiza o tutor com os novos dados
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
      // 2. Incluir o questionário na busca
      const tutor = await Tutor.findByPk(id, {
        include: [{
          model: Questionario,
          as: 'questionario' // 'as' deve ser o mesmo definido na associação do modelo
        }]
      });

      if (!tutor) return res.status(404).json({ erro: 'Tutor não encontrado' });
      
      // Remove a senha manualmente antes de enviar a resposta
      const { senha: _, ...tutorSemSenha } = tutor.toJSON();

      return res.json(tutorSemSenha);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ erro: "Erro ao buscar dados do tutor" });
    }
  }
}

export default TutorControlador;