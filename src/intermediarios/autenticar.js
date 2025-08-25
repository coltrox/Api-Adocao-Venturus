import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default function autenticar(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ erro: 'Token não fornecido' });

  const [scheme, token] = auth.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ erro: 'Formatação do token inválida' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload; // { id, admin }
    return next();
  } catch {
    return res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
}
