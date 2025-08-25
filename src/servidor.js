import dotenv from 'dotenv';
import app from './app.js';
import sequelize from './config/database.js';
import './modelos/index.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await sequelize.sync();
        console.log('Banco de dados sincronizado');

        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    } catch (erro) {
        console.error('Erro ao iniciar:', erro);
    }
})();
