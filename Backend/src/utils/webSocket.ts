import { WebSocketServer, WebSocket } from 'ws';
import { chatController } from '../controller/chatController';
import { chatServices } from '../services/chatServices';
import { Request } from 'express';

let wss: WebSocketServer;
const clients = new Map<string, WebSocket>();

export const configureWebSocket = (server: any) => {
  wss = new WebSocketServer({ server });

  wss.on('connection', (ws, req) => {
    const userId = req.url?.split('?userId=')[1];
    if (userId) {
      clients.set(userId, ws);
      console.log(`Client connected: ${userId}`);

      ws.on('message', async (message) => {
        const { message: userMessage, schedule_id } = JSON.parse(
          message.toString()
        );
        const fakeReq = { user: { id: userId } } as Request;
        if (fakeReq.user) {
          await chatController.handleChatWebSocket(
            fakeReq.user.id,
            userMessage,
            schedule_id
          );
        }
      });

      ws.on('close', () => {
        clients.delete(userId);
        console.log(`Client disconnected: ${userId}`);
      });
    }
  });

  return wss;
};

export const sendMessageToClient = async (
  userId: string,
  message: string,
  scheduleId: string
) => {
  const client = clients.get(userId);
  if (client && client.readyState === WebSocket.OPEN) {
    try {
      const aiMessage = await chatServices.chat(message, scheduleId, userId);
      client.send(JSON.stringify({ message: aiMessage }));
    } catch (error) {
      console.error('Erro ao processar a mensagem:', error);
    }
  }
};

export { wss };
