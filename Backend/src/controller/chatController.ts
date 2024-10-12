import { Request, Response } from 'express';
import { dialogRepository } from '../repository/dialogRepository';
import { chatServices } from '../services/chatServices';

export const chatController = {
  handleChat: async (req: Request, res: Response): Promise<void> => {
    const { message, schedule_id } = req.body; // Recebendo as informações do usuário e agendamento
    const user = req.user!;
    try {
      if (!schedule_id) {
        res.status(400).json({
          error: 'O chat precisa de um id de agendamento!',
        });
        return;
      }
      // Verifica se o diálogo já existe para este usuário e agenda
      let dialog = await dialogRepository.getDialog(user.id, schedule_id);

      // Se não existir, cria um novo diálogo
      if (!dialog) {
        dialog = await dialogRepository.createDialog(user.id, schedule_id);
      }

      // Chama a função de chat passando a mensagem e o histórico (se já tiver)
      const responseMessage = await chatServices.chat(message, dialog);

      // Salva a mensagem no banco de dados (tanto do usuário quanto da IA)
      await dialogRepository.saveMessage(dialog.id, message, 'user'); // Mensagem do usuário
      await dialogRepository.saveMessage(dialog.id, responseMessage, 'IA'); // Resposta da IA

      // Retorna a resposta da IA
      res.status(200).json({ response: responseMessage });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  },
};
