import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Doacao = sequelize.define('Doacao', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    // Adicionei campos de exemplo, você pode ajustar
    // para os campos que existem no seu modelo.
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    metodo: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Doacoes'
});

export default Doacao;
