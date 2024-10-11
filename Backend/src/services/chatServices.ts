// // import { OpenAI } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { PromptTemplate } from "@langchain/core/prompts";
import config from "../config";
import * as dialogRepository from "../repository/dialogRepository";


const apiKey = config.OPENAIKEY;

// Instancia o modelo com as configurações
const model = new ChatOpenAI({
    openAIApiKey: apiKey,
    temperature: 0.7,
    modelName: "gpt-3.5-turbo",
});

// Define o template do prompt com as regras de agendamento
const prompt = new PromptTemplate({
    template: `
Você é um assistente de agendamento de reuniões com IA. Sua função é ajudar o host a agendar compromissos e reuniões, gerenciando horários e recebendo respostas dos convidados.

Regras:
1. Se o usuário for o host, solicite informações sobre o evento (título, descrição, datas e horários disponíveis) e ofereça-se para enviar convites.
2. Se o usuário for um convidado, pergunte sobre sua disponibilidade e confirme sua presença.
3. Foque APENAS em tarefas relacionadas ao agendamento de reuniões.
4. Se o usuário perguntar algo fora do escopo, lembre-o gentilmente que você só pode ajudar com agendamentos.
5. Suas respostas devem sempre ser orientadas ao agendamento, organizando e sugerindo datas conforme a disponibilidade informada.
6. Seja proativo em sugerir horários e datas que funcionem para todos os participantes.
7. Mantenha um tom profissional e eficiente, mas amigável.

Entrada do usuário: {input}

Resposta do Assistente:`,
    inputVariables: ["input"],
});

export async function chat(message: string, dialog: any): Promise<string> {
    try {
        // Recuperar o histórico de mensagens para o diálogo
        const previousMessages = await dialogRepository.getMessagesByDialogId(dialog.id);

        const history = previousMessages
            .map((msg: any) => `${msg.sender}: ${msg.message}`)
            .join("\n");

        // Criar a instância de chain com memória e histórico
        const chain = new ConversationChain({
            llm: model,
            memory: new BufferMemory(), // Memória automática para gerenciar o histórico
            prompt: prompt,
        });

        // Passa apenas a nova mensagem do usuário
        const res = await chain.call({
            input: message,
        });

        return res.response;
    } catch (error) {
        console.error("Erro ao se comunicar com a IA:", error);
        throw new Error("Desculpe, ocorreu um erro ao processar sua solicitação.");
    }
}
