import Tutor from './Tutor.js';
import Animal from './Animal.js';
import Questionario from './Questionario.js';
import Adocao from './Adocao.js';
import Doacao from './Doacao.js';

Tutor.hasOne(Questionario, { foreignKey: 'TutorId', as: 'questionario' });
Questionario.belongsTo(Tutor, { foreignKey: 'TutorId', as: 'tutor' });

Animal.hasMany(Adocao, { foreignKey: 'AnimalId' });
Adocao.belongsTo(Animal, { foreignKey: 'AnimalId' });

Tutor.hasMany(Adocao, { foreignKey: 'TutorId' });
Adocao.belongsTo(Tutor, { foreignKey: 'TutorId' });

export {
  Tutor,
  Animal,
  Questionario,
  Adocao,
  Doacao
};