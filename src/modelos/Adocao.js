import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Adocao = sequelize.define('Adocao', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pendente',
        validate: {
            isIn: {
                args: [['pendente', 'aprovada', 'recusada']],
                msg: "Status deve ser 'pendente', 'aprovada' ou 'recusada'"
            }
        }
    }
}, {
    tableName: 'Adocoes'
});

export default Adocao;
