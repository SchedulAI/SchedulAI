// import { OpenAI } from "@langchain/openai";
import { llm } from '../utils/llm';
import { dialogRepository } from '../repository/dialogRepository';
import { toolsByName } from '../tools/tools';
import { scheduleRepository } from '../repository/scheduleRepository';
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
  ToolMessage,
} from '@langchain/core/messages';

export const chatServices = {
  chat: async (
    message: string,
    scheduleId: string,
    userId: string
  ): Promise<string> => {
    try {
      const schedule = await scheduleRepository.getScheduleById(scheduleId);

      let dialog = await dialogRepository.getDialog(userId, scheduleId);

      const isUserHost = userId === schedule.user_id ? true : false;

      if (!dialog) {
        dialog = await dialogRepository.createDialog(userId, scheduleId);

        await dialogRepository.saveMessage(
          dialog.id,
          `O id do usuário é ${userId}, O id do agendamento é ${scheduleId}, O usuário é o host`,
          'system'
        );

        await dialogRepository.saveMessage(dialog.id, llm.prompt, 'system');
      }

      const previousMessages = await dialogRepository.getMessagesByDialogId(
        dialog.id
      );

      const history = previousMessages
        .map((msg) => {
          const messageWithTime =
            msg.message + ' - [Sent at: ' + new Date(msg.created_at) + ']';

          switch (msg.sender) {
            case 'user':
              return new HumanMessage(messageWithTime);
            case 'IA':
              return new AIMessage(msg.message);
            case 'system':
              return new SystemMessage(msg.message);
          }
        })
        .filter((msg) => msg !== undefined);

      const model = llm.model;

      const todayDate = new Date();

      history.push(
        new HumanMessage(message + ' - [Sent at: ' + todayDate + ']')
      );

      // Passa o histórico e a mensagem do usuário como entrada para o modelo
      let res = await model.invoke(history);

      await dialogRepository.saveMessage(dialog.id, message, 'user');

      while (res.tool_calls!.length > 0) {
        history.push(res);

        for (const toolCall of res.tool_calls!) {
          console.log('Tool call:', toolCall);

          const selectedTool = toolsByName[toolCall.name];
          const toolResponse = await selectedTool.invoke(toolCall);

          history.push(toolResponse);
        }

        res = await model.invoke(history);
      }

      history.push(res);

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
