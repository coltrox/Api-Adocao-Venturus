// src/modelos/index.js
import Tutor from './Tutor.js';
import Animal from './Animal.js';
import Questionario from './Questionario.js';
import Adocao from './Adocao.js';
import Doacao from './Doacao.js';

// --- DEFINIÇÃO DAS ASSOCIAÇÕES ---

// Relação Tutor <-> Questionário (Um para Um)
Tutor.hasOne(Questionario, { foreignKey: 'TutorId', as: 'questionario' });
Questionario.belongsTo(Tutor, { foreignKey: 'TutorId', as: 'tutor' });

// Relação Animal <-> Adoção (Um para Muitos)
Animal.hasMany(Adocao, { foreignKey: 'AnimalId' });
Adocao.belongsTo(Animal, { foreignKey: 'AnimalId' });

// Relação Tutor <-> Adoção (Um para Muitos)
Tutor.hasMany(Adocao, { foreignKey: 'TutorId' });
Adocao.belongsTo(Tutor, { foreignKey: 'TutorId' });

// Exporta todos os modelos
export {
  Tutor,
  Animal,
  Questionario,
  Adocao,
  Doacao
};