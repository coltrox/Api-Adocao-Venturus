import { Questionario, Tutor } from '../modelos/index.js';

class QuestionarioControlador {
  // POST /questionario
  static async responder(req, res) {
    const tutorId = req.usuario.id; 
    
    try {
      const questionarioExistente = await Questionario.findOne({ where: { TutorId: tutorId } });
      if (questionarioExistente) {
        return res.status(409).json({ erro: "Você já enviou um questionário." }); // 409 Conflict
      }

      const dadosQuestionario = req.body;
      
      if (Object.keys(dadosQuestionario).length === 0) {
        return res.status(400).json({ erro: "O corpo da requisição não pode estar vazio." });
      }

      const novoQuestionario = await Questionario.create({
        ...dadosQuestionario,
        TutorId: tutorId
      });

      return res.status(201).json({ mensagem: 'Questionário enviado com sucesso!', questionario: novoQuestionario });
    } catch (e) {
      if (e.name === 'SequelizeValidationError') {
        return res.status(400).json({ erro: "Todos os campos obrigatórios devem ser preenchidos corretamente." });
      }
      console.error(e);
      return res.status(500).json({ erro: "Erro interno ao processar o questionário." });
    }
  }
}

export default QuestionarioControlador;