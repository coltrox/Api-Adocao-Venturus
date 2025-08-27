import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Adocao from './Adocao.js'; // Importar para criar a associação

const Animal = sequelize.define('Animal', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    especie: {
        type: DataTypes.STRING,
        allowNull: false
    },
    porte: {
        type: DataTypes.STRING,
        allowNull: false
    },
    castrado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    vacinado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    // Campo 'adotado' adicionado para controlar o status do animal
    adotado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT
    },
    foto: {
        // BLOB('long') é uma boa escolha para armazenar o buffer da imagem
        type: DataTypes.BLOB('long'),
        allowNull: false
    }
}, {
    tableName: 'Animais',
    timestamps: true // Garante a criação de createdAt e updatedAt
});

// Definindo a associação: Um Animal pode ter muitos pedidos de Adoção
Animal.hasMany(Adocao);

export default Animal;