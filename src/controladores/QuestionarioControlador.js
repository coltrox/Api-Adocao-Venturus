// Placeholder simples – armazena só o payload recebido
class QuestionarioControlador {
  // POST /questionario
  static async responder(req, res) {
    // aqui você poderia gravar em uma tabela Questionario/Respostas com Sequelize
    return res.status(201).json({ mensagem: 'Questionário recebido', dados: req.body });
  }
}

export default QuestionarioControlador;
