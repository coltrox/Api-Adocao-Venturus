import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Doacao = sequelize.define('Doacao', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    mensagem: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'Doacoes',
    timestamps: true
});

export default Doacao;
