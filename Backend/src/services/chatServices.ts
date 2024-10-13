// import { OpenAI } from "@langchain/openai";
import { llm } from '../utils/llm';
import { dialogRepository } from '../repository/dialogRepository';
import { StringOutputParser } from '@langchain/core/output_parsers';

export const chatServices = {
  chat: async (
    message: string,
    scheduleId: string,
    userId: string
  ): Promise<string> => {
    try {
      let dialog = await dialogRepository.getDialog(userId, scheduleId);

      if (!dialog) {
        dialog = await dialogRepository.createDialog(userId, scheduleId);
      }

      const previousMessages = await dialogRepository.getMessagesByDialogId(
        dialog.id
      );
      const history = previousMessages
        .map((msg: any) => `${msg.sender}: ${msg.message}`)
        .join('\n');

      const chain = llm.prompt.pipe(llm.model).pipe(new StringOutputParser());

      const res = await chain.invoke({
        input: message,
        history: history,
      });

      // Salva a mensagem no banco de dados (tanto do usuário quanto da IA)
      await dialogRepository.saveMessage(dialog.id, message, 'user'); // Mensagem do usuário
      await dialogRepository.saveMessage(dialog.id, res, 'IA'); // Resposta da IA

      return res;
    } catch (error) {
      console.error('Erro ao se comunicar com a IA:', error);
      throw new Error(
        'Desculpe, ocorreu um erro ao processar sua solicitação.'
      );
    }
  },
};
