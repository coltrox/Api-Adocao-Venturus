import Animal from './Animal.js';
import Tutor from './Tutor.js';
import Adocao from './Adocao.js';
import Doacao from './Doacao.js';

// Associações
Tutor.hasMany(Animal);
Animal.belongsTo(Tutor);

Tutor.hasMany(Adocao);
Adocao.belongsTo(Tutor);

Animal.hasMany(Adocao);
Adocao.belongsTo(Animal);

Tutor.hasMany(Doacao);
Doacao.belongsTo(Tutor);

export { Animal, Tutor, Adocao, Doacao };
