import { Adocao, Animal, Tutor } from '../modelos/index.js';

class AdocaoControlador {
    // POST /adocoes
    static async solicitar(req, res) {
        try {
            const { animalId, tutorId } = req.body;

            const animal = await Animal.findByPk(animalId);
            if (!animal) return res.status(404).json({ erro: 'Animal não encontrado' });

            // Impede a solicitação se o animal já foi adotado
            if (animal.status === 'adotado') {
                return res.status(400).json({ erro: 'Este animal já foi adotado.' });
            }

            const tutor = await Tutor.findByPk(tutorId);
            if (!tutor) return res.status(404).json({ erro: 'Tutor não encontrado' });

            const pedido = await Adocao.create({
                AnimalId: animal.id,
                TutorId: tutor.id,
                status: 'pendente'
            });

            return res.status(201).json(pedido);
        } catch (e) {
            return res.status(500).json({ erro: e.message });
        }
    }

    // NOVO MÉTODO
    // PATCH /adocoes/:id
    static async atualizarStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const pedido = await Adocao.findByPk(id, {
                include: [Animal] // Inclui o animal para poder atualizá-lo
            });

            if (!pedido) {
                return res.status(404).json({ erro: 'Pedido de adoção não encontrado' });
            }

            // Atualiza o status do pedido
            pedido.status = status;
            await pedido.save();

            // Se a adoção for aprovada, marca o animal como 'adotado'
            if (status === 'aprovada' && pedido.Animal) {
                pedido.Animal.status = 'adotado';
                await pedido.Animal.save();
            }

            return res.status(200).json(pedido);
        } catch (e) {
            // Retorna um erro de validação se o status for inválido
            if (e.name === 'SequelizeValidationError') {
                const errors = e.errors.map(err => err.message);
                return res.status(400).json({ erro: errors });
            }
            return res.status(500).json({ erro: e.message });
        }
    }
}

export default AdocaoControlador;