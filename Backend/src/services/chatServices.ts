import { llm } from '../utils/llm';
import { dialogRepository } from '../repository/dialogRepository';
import { toolsByName } from '../tools/tools';
import {
  HumanMessage,
  mapStoredMessageToChatMessage,
} from '@langchain/core/messages';
import { dialogServices } from './dialogServices';

export const chatServices = {
  chat: async (
    message: string,
    scheduleId: string,
    userId: string
  ): Promise<string> => {
    try {
      let dialog = await dialogRepository.getDialog(userId, scheduleId);

      if (!dialog) {
        dialog = await dialogServices.createDialog(scheduleId, userId, null);
      }

      const previousMessages = await dialogRepository.getMessagesByDialogId(
        dialog.id
      );

      const history = previousMessages
        .map((msg) => {
          const deserializedMessage = mapStoredMessageToChatMessage(
            msg.message
          );

          switch (msg.sender) {
            case 'user':
              const sentAtString = ` - [Sent at: ${new Date(msg.created_at)}]`;

              deserializedMessage.content =
                deserializedMessage.content + sentAtString;

              return deserializedMessage;
            default:
              return deserializedMessage;
          }
        })
        .filter((msg) => msg !== undefined);

      const model = llm.model;

      const todayDate = new Date();

      const userMessageWithTime = new HumanMessage(
        message + ' - [Sent at: ' + todayDate + ']'
      );

      history.push(userMessageWithTime);

      let res = await model.invoke(history);

      const userMessage = new HumanMessage(message);

      await dialogRepository.saveMessage(
        dialog.id,
        JSON.stringify(userMessage.toDict(), null, 2),
        'user'
      );

      while (res.tool_calls!.length > 0) {
        await dialogRepository.saveMessage(
          dialog.id,
          JSON.stringify(res.toDict(), null, 2),
          'IA'
        );
        history.push(res);

        for (const toolCall of res.tool_calls!) {
          const selectedTool = toolsByName[toolCall.name];
          const toolResponse = await selectedTool.invoke(toolCall);

          await dialogRepository.saveMessage(
            dialog.id,
            JSON.stringify(toolResponse.toDict(), null, 2),
            'tool'
          );
          history.push(toolResponse);
        }

        res = await model.invoke(history);
      }

      await dialogRepository.saveMessage(
        dialog.id,
        JSON.stringify(res.toDict(), null, 2),
        'IA'
      );
      history.push(res);

      const aiResponse = res.content as string;

      return aiResponse;
    } catch (error) {
      console.error('Erro ao se comunicar com a IA:', error);
      throw error;
    }
  },
};
