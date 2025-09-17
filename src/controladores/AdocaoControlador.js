import { Adocao, Animal, Tutor, Questionario } from '../modelos/index.js';

class AdocaoControlador {
    // POST /adocoes
    static async solicitar(req, res) {
        const tutorId = req.usuario.id; 
        const { animalId } = req.body;

        try {
            const questionario = await Questionario.findOne({ where: { TutorId: tutorId } });
            if (!questionario) {
                return res.status(400).json({ erro: "O tutor ainda não respondeu o questionário obrigatório" });
            }

            const animal = await Animal.findByPk(animalId);
            if (!animal) return res.status(404).json({ erro: 'Animal não encontrado' });

            const tutor = await Tutor.findByPk(tutorId);
            if (!tutor) return res.status(404).json({ erro: 'Tutor não encontrado' });

            if (animal.adotado) {
                return res.status(400).json({ erro: 'Este animal já foi adotado.' });
            }

            const pedidoExistente = await Adocao.findOne({
                where: {
                    AnimalId: animalId,
                    TutorId: tutorId
                }
            });
            if (pedidoExistente) {
                return res.status(409).json({ erro: "Este tutor já tem um pedido de adoção para este animal" });
            }

            const totalPedidos = await Adocao.count({ where: { AnimalId: animalId } });
            const posicaoFila = totalPedidos + 1;

            const pedido = await Adocao.create({
                AnimalId: animal.id,
                TutorId: tutor.id,
                status: 'em_analise',
                posicao_fila: posicaoFila
            });

            return res.status(201).json({
                id: pedido.id,
                tutor_id: pedido.TutorId,
                animal_id: pedido.AnimalId,
                status: pedido.status,
                posicao_fila: pedido.posicao_fila,
                criado_em: pedido.createdAt
            });

        } catch (e) {
            console.error(e);
            return res.status(500).json({ erro: "Erro ao registrar o pedido de adoção" });
        }
    }

    // PATCH /adocoes/:id (Rota para Admin)
    static async atualizarStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const statusValidos = ['aprovada', 'recusada', 'em_analise'];
            if (!status || !statusValidos.includes(status)) {
                return res.status(400).json({ erro: 'O status fornecido é inválido.' });
            }

            const pedido = await Adocao.findByPk(id, {
                include: [Animal]
            });

            if (!pedido) {
                return res.status(404).json({ erro: 'Pedido de adoção não encontrado' });
            }

            pedido.status = status;
            await pedido.save();

            if (status === 'aprovada' && pedido.Animal) {
                pedido.Animal.adotado = true;
                await pedido.Animal.save();
            }

            return res.status(200).json(pedido);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ erro: "Erro interno ao atualizar o status da adoção." });
        }
    }
}

export default AdocaoControlador;