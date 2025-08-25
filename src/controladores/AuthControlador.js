import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Tutor } from '../modelos/index.js';

dotenv.config();

class AuthControlador {
  // POST /login
  static async login(req, res) {
    try {
      const { email, senha } = req.body;
      const tutor = await Tutor.findOne({ where: { email } });
      if (!tutor) return res.status(401).json({ erro: 'Credenciais inválidas' });

      const ok = await bcrypt.compare(senha, tutor.senha);
      if (!ok) return res.status(401).json({ erro: 'Credenciais inválidas' });

      const token = jwt.sign(
        { id: tutor.id, admin: tutor.admin },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
      );

      return res.json({
        token,
        usuario: { id: tutor.id, nome: tutor.nome, email: tutor.email, admin: tutor.admin }
      });
    } catch (e) {
      return res.status(500).json({ erro: e.message });
    }
  }
}

export default AuthControlador;
