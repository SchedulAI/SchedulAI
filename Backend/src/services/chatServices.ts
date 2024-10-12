// // import { OpenAI } from "@langchain/openai";
import { llm } from '../utils/llm';
import { BufferMemory } from 'langchain/memory';
import { ConversationChain } from 'langchain/chains';
import { dialogRepository } from '../repository/dialogRepository';

export const chatServices = {
  chat: async (message: string, dialog: any): Promise<string> => {
    try {
      // Recuperar o histórico de mensagens para o diálogo
      const previousMessages = await dialogRepository.getMessagesByDialogId(
        dialog.id
      );

      const history = previousMessages
        .map((msg: any) => `${msg.sender}: ${msg.message}`)
        .join('\n');

      // Criar a instância de chain com memória e histórico
      const chain = new ConversationChain({
        llm: llm.model,
        memory: new BufferMemory(), // Memória automática para gerenciar o histórico
        prompt: llm.prompt,
      });

      // Passa apenas a nova mensagem do usuário
      const res = await chain.call({
        input: message,
      });

      return res.response;
    } catch (error) {
      console.error('Erro ao se comunicar com a IA:', error);
      throw new Error(
        'Desculpe, ocorreu um erro ao processar sua solicitação.'
      );
    }
  },
};
