import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Adocao = sequelize.define('Adocao', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    TutorId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    AnimalId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('em_analise', 'aprovada', 'recusada'),
        defaultValue: 'em_analise',
        allowNull: false
      },
    posicao_fila: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    criado_em: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    tableName: 'Adocoes',
    timestamps: true
});

export default Adocao;
