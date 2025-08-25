import { Doacao, Tutor } from '../modelos/index.js';

class DoacaoControlador {
  // POST /doacoes
  static async criar(req, res) {
    try {
      const { valor, metodo, tutorId } = req.body;
      if (!valor || !metodo || !tutorId) {
        return res.status(400).json({ erro: 'valor, metodo e tutorId são obrigatórios' });
      }

      const tutor = await Tutor.findByPk(tutorId);
      if (!tutor) return res.status(404).json({ erro: 'Tutor não encontrado' });

      const doacao = await Doacao.create({ valor, metodo, TutorId: tutorId });
      return res.status(201).json(doacao);
    } catch (e) {
      return res.status(500).json({ erro: e.message });
    }
  }
}

export default DoacaoControlador;
