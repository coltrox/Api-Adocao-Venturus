import { Questionario, Tutor } from '../modelos/index.js';

class QuestionarioControlador {
  // POST /questionario
  static async responder(req, res) {
    // 1. Obter o ID do tutor logado (assumindo que o middleware de auth o adiciona em req.usuario)
    const tutorId = req.usuario.id; 
    
    try {
      // 2. Verificar se o tutor já possui um questionário respondido
      const questionarioExistente = await Questionario.findOne({ where: { TutorId: tutorId } });
      if (questionarioExistente) {
        return res.status(409).json({ erro: "Você já enviou um questionário." }); // 409 Conflict
      }

      // 3. Extrair todos os dados do corpo da requisição
      const dadosQuestionario = req.body;
      
      // Validação simples para garantir que o corpo não está vazio
      if (Object.keys(dadosQuestionario).length === 0) {
        return res.status(400).json({ erro: "O corpo da requisição não pode estar vazio." });
      }

      // 4. Criar o registro do questionário no banco de dados, associando ao TutorId
      const novoQuestionario = await Questionario.create({
        ...dadosQuestionario, // Espalha todos os dados recebidos do formulário
        TutorId: tutorId    // Adiciona a chave estrangeira
      });

      return res.status(201).json({ mensagem: 'Questionário enviado com sucesso!', questionario: novoQuestionario });
    } catch (e) {
      // Trata erros de validação do Sequelize (campos faltando, tipos errados)
      if (e.name === 'SequelizeValidationError') {
        return res.status(400).json({ erro: "Todos os campos obrigatórios devem ser preenchidos corretamente." });
      }
      console.error(e);
      return res.status(500).json({ erro: "Erro interno ao processar o questionário." });
    }
  }
}

export default QuestionarioControlador;