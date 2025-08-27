// src/modelos/Tutor.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Tutor = sequelize.define('Tutor', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    // O campo 'nome' foi renomeado para 'nome_completo'
    nome_completo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Novos campos adicionados
    cidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // Campo 'telefone' mantido como STRING para suportar caracteres como '()' e '-'
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Campos de rede social (opcionais)
    instagram: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    facebook: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // O campo 'endereco' foi mantido pois é útil e aparece em outras rotas
    endereco: {
        type: DataTypes.STRING,
        allowNull: true
    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'Tutores',
    timestamps: true 
});

export default Tutor;