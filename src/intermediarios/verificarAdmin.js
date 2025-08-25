export default function verificarAdmin(req, res, next) {
  if (!req.usuario?.admin) {
    return res.status(403).json({ erro: 'Acesso restrito ao administrador' });
  }
  next();
}
