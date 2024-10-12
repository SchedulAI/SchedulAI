// import { OpenAI } from "@langchain/openai";
import { llm } from '../utils/llm';
import { dialogRepository } from '../repository/dialogRepository';
import { StringOutputParser } from '@langchain/core/output_parsers';

export const chatServices = {
  chat: async (message: string, dialog: any): Promise<string> => {
    try {
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

      return res;
    } catch (error) {
      console.error('Erro ao se comunicar com a IA:', error);
      throw new Error(
        'Desculpe, ocorreu um erro ao processar sua solicitação.'
      );
    }
  },
};
