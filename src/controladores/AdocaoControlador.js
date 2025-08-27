// 1. Importar o Questionario para a verificação
import { Adocao, Animal, Tutor, Questionario } from '../modelos/index.js';

class AdocaoControlador {
    // POST /adocoes
    static async solicitar(req, res) {
        // O ID do tutor vem do usuário autenticado, não do body
        const tutorId = req.usuario.id; 
        const { animalId } = req.body;

        try {
            // 2. VERIFICAÇÃO DO QUESTIONÁRIO
            const questionario = await Questionario.findOne({ where: { TutorId: tutorId } });
            if (!questionario) {
                return res.status(400).json({ erro: "O tutor ainda não respondeu o questionário obrigatório" });
            }

            // 3. VERIFICAÇÃO DO ANIMAL E TUTOR
            const animal = await Animal.findByPk(animalId);
            if (!animal) return res.status(404).json({ erro: 'Animal não encontrado' });

            const tutor = await Tutor.findByPk(tutorId);
            if (!tutor) return res.status(404).json({ erro: 'Tutor não encontrado' });

            // Impede a solicitação se o animal já foi adotado (usando o campo 'adotado' do novo modelo)
            if (animal.adotado) {
                return res.status(400).json({ erro: 'Este animal já foi adotado.' });
            }

            // 4. VERIFICAÇÃO DE PEDIDO DUPLICADO
            const pedidoExistente = await Adocao.findOne({
                where: {
                    AnimalId: animalId,
                    TutorId: tutorId
                }
            });
            if (pedidoExistente) {
                return res.status(409).json({ erro: "Este tutor já tem um pedido de adoção para este animal" });
            }

            // 5. LÓGICA DA FILA
            const totalPedidos = await Adocao.count({ where: { AnimalId: animalId } });
            const posicaoFila = totalPedidos + 1;

            // 6. CRIAÇÃO DO PEDIDO DE ADOÇÃO
            const pedido = await Adocao.create({
                AnimalId: animal.id,
                TutorId: tutor.id,
                status: 'em_analise', // Status inicial padronizado
                posicao_fila: posicaoFila
            });

            // Retorna a resposta de sucesso padronizada
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

            // Validação simples para o status
            const statusValidos = ['aprovada', 'recusada', 'em_analise'];
            if (!status || !statusValidos.includes(status)) {
                return res.status(400).json({ erro: 'O status fornecido é inválido.' });
            }

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
                pedido.Animal.adotado = true; // Assumindo que o modelo Animal tem o campo 'adotado'
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