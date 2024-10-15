// import { OpenAI } from "@langchain/openai";
import { llm } from '../utils/llm';
import { dialogRepository } from '../repository/dialogRepository';
import { toolsByName } from '../utils/tools';
import { scheduleRepository } from '../repository/scheduleRepository';

export const chatServices = {
  chat: async (
    message: string,
    scheduleId: string,
    userId: string
  ): Promise<string> => {
    try {
      const schedule = await scheduleRepository.getScheduleById(scheduleId);

      let dialog = await dialogRepository.getDialog(userId, scheduleId);

      if (!dialog) {
        dialog = await dialogRepository.createDialog(userId, scheduleId);
        await dialogRepository.saveMessage(
          dialog.id,
          `O id do usuário é ${userId}, O id do agendamento é ${scheduleId}, O id do criador do agendamento é ${schedule.user_id}`,
          'system'
        );
      }

      const previousMessages = await dialogRepository.getMessagesByDialogId(
        dialog.id
      );
      let history = previousMessages
        .map((msg: any) => `${msg.sender}: ${msg.message}`)
        .join('\n');

      // Cria a cadeia de execução usando o modelo e ferramentas (tools)
      const chain = llm.prompt.pipe(llm.model);

      // Passa o histórico e a mensagem do usuário como entrada para o modelo
      let res = await chain.invoke({
        input: message,
        history: history,
      });

      await dialogRepository.saveMessage(dialog.id, message, 'user');

      if (res.tool_calls) {
        const toolsMessages = [];

        for (const toolCall of res.tool_calls) {
          const selectedTool = toolsByName[toolCall.name];
          const toolResponse = await selectedTool.invoke(toolCall);

          toolsMessages.push(toolResponse);
        }

        res = await chain.invoke({
          input: toolsMessages,
          history: history,
        });
      }

      const aiResponse = res.content as string;

      await dialogRepository.saveMessage(dialog.id, aiResponse, 'IA');

      return aiResponse;
    } catch (error) {
      console.error('Erro ao se comunicar com a IA:', error);
      throw new Error(
        'Desculpe, ocorreu um erro ao processar sua solicitação.'
      );
    }
  },
};
