interface Message {
  sender: senders;
  message: string;
}

type senders = 'user' | 'IA' | 'system' | 'tool';

interface ConversationMessage {
  sender: 'user' | 'ia';
  message: any;
  schedule?: Schedule;
}

interface GetConversation {
  messages: ConversationMessage[];
  schedule: Schedule;
}
