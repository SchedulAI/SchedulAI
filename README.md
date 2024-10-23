<p align="center">
  <img src="https://github.com/user-attachments/assets/5476d416-ffd0-48f8-9be9-20c1fb75638a" width="100%">
</p>

# ScheduleAI <img src="https://github.com/user-attachments/assets/ed999ff8-176c-4eec-8927-b187f184e186" width="2%">

---

## Descrição

ScheduleAI é uma plataforma inteligente de agendamento desenvolvida para simplificar o processo de organizar reuniões. O aplicativo utiliza inteligência artificial para ajudar os usuários a encontrar os melhores horários, eliminando a necessidade de longas trocas de mensagens.

## Principais Funcionalidades

- **Agendamento com IA:** O anfitrião do evento pode inserir a data e o horário propostos, e o ScheduleAI, alimentado por um modelo de linguagem avançado (LLM), convida todas as pessoas que o anfitrião indicar e repassa essas informações para elas, verificando a disponibilidade de cada uma e retornando ao anfitrião com os possíveis horários para agendamento da reunião.
- **Interação com os Usuários:** Após o anfitrião agendar um evento, ele recebe um link exclusivo para compartilhar com os convidados. Caso um convidado já possua conta na plataforma, o convite aparecerá diretamente no seu painel. Os convidados podem criar uma conta através do link recebido e informar a sua disponibilidade dentro da disponibilidade do anfitrião.
- **Comparação de Disponibilidade em Tempo Real:** O sistema compara a disponibilidade do anfitrião com a dos convidados, priorizando as datas escolhidas pela maioria.
- **Interface Amigável:** Desenvolvido com frontend em React e backend em TypeScript, o aplicativo oferece uma experiência de usuário simples e intuitiva.
- **Segurança e Confiabilidade:** O ScheduleAI garante interações seguras através da autenticação de usuários.

## Tecnologias Utilizadas

### Frontend:

- **@phosphor-icons/react:** Biblioteca de ícones em React, com uma vasta coleção de ícones personalizáveis.
- **dotenv:** Biblioteca que carrega variáveis de ambiente a partir de um arquivo .env.
- **react:** Biblioteca JavaScript para construção de interfaces de usuário.
- **react-dom:** Pacote que fornece métodos específicos para manipulação do DOM no React.
- **react-router-dom:** Biblioteca React usada para gerenciar a navegação entre páginas.
- **showdown:** Biblioteca que converte linguagem Markdown em HTML.
- **styled-components:** Biblioteca para estilizar componentes no React com CSS-in-JS.
- **eslint:** Ferramenta de linting para garantir a qualidade do código JavaScript.
- **typescript:** Superset de JavaScript que adiciona tipagem estática.
- **vite:** Ferramenta de build rápida para desenvolvimento e bundling de projetos.

### Backend:

- **langchain:** Biblioteca para construir aplicações com integração de linguagem e LLMs (Modelos de Linguagem Grande).
- **@langchain/core:** Biblioteca central do LangChain para construção de aplicações de linguagem.
- **@langchain/openai:** Integração do LangChain com a API OpenAI.
- **bcrypt:** Biblioteca para hashing e comparação de senhas.
- **cookie-parser:** Middleware para analisar cookies em requisições HTTP.
- **cors:** Middleware para habilitar CORS (Cross-Origin Resource Sharing) em aplicações Express.
- **dotenv:** Biblioteca que carrega variáveis de ambiente a partir de um arquivo .env.
- **express:** Framework minimalista para construção de aplicações web no Node.js.
- **jsonwebtoken:** Biblioteca para criar e verificar tokens JSON Web Tokens (JWT).
- **openai:** Biblioteca para interagir com a API OpenAI.
- **pg:** Cliente PostgreSQL para Node.js.
- **zod:** Biblioteca para validação e análise de esquemas de dados.
- **ts-node:** Executa arquivos TypeScript diretamente no Node.js.
- **ts-node-dev:** Ferramenta para desenvolvimento que reinicia automaticamente o servidor TypeScript ao detectar alterações.
- **typescript:** Superset de JavaScript que adiciona tipagem estática.

## Instalação e Uso

> Instalação e uso local.

1. Clone o repositório: `git clone https://github.com/SchedulAI/SchedulAI.git`
2. Acesse a pasta do frontend com o seu terminal e rode o comando `npm install`.
3. Configure as variáveis de ambiente a partir do `.env_example`.
4. Utilize o comando `npm run build` para construir a aplicação.
5. Utilize o comando `npm run preview` para iniciar um servidor com os arquivos construídos.
6. Acesse a aplicação em http://localhost:5173.
7. Para o backend, acesse a pasta com o seu terminal e rode o comando `npm install`.
8. Configure as variáveis de ambiente a partir do `.env_example`.
9. Utilize o comando `npm run migrate` para iniciar as tabelas no seu banco de dados.
10. Utilize o comando `npm run build` para construir a aplicação.
11. Utilize o comando `npm start` para iniciar um servidor com os arquivos construídos.

---

> Instalação e uso em um servidor.

1. Clone o repositório: `git clone https://github.com/SchedulAI/SchedulAI.git`
2. Acesse a pasta do frontend com o seu terminal e rode o comando `npm install`.
3. Configure as variáveis de ambiente a partir do `.env_example`.
4. Utilize o comando `npm run build` para construir a aplicação.
5. Copie os arquivos da pasta **dist** para a pasta onde você serve os arquivos estáticos no Nginx.
6. Altere o `nginx-example.conf` para condizer com a sua máquina e copie para a pasta de configuração do Nginx.
7. Acesse a aplicação no link configurado do Nginx.
8. Para o backend, acesse a pasta com o seu terminal e rode o comando `npm install`.
9. Configure as variáveis de ambiente a partir do `.env_example`.
10. Utilize o comando `npm run migrate` para iniciar as tabelas no seu banco de dados.
11. Utilize o comando `npm run dev` para iniciar o servidor em modo de desenvolvimento.

## Equipe

- [Leonardo Mori](https://github.com/LeoMoriLima)
- [Renato Barbosa](https://github.com/RenatoFB8)
- [Leandro Santos](https://github.com/gaidenblk)
- [Willyan Pereira](https://github.com/willy4nn)

---

# English Version

---

## Description

ScheduleAI is an intelligent scheduling platform designed to simplify the process of organizing meetings. The application uses artificial intelligence to help users find the best times, eliminating the need for lengthy back-and-forth messaging.

## Key Features

- **AI Scheduling:** The event host can enter the proposed date and time, and ScheduleAI, powered by an advanced language model (LLM), invites all individuals specified by the host and relays that information to them, checking each person's availability and returning possible or unavailable time slots for scheduling that meeting back to the host.
- **User Interaction:** After the host schedules an event, they receive a unique link to share with guests. If a guest already has an account on the platform, the invitation will appear directly on their dashboard. Guests can create an account via the received link and indicate their availability within the host's timeframe.
- **Real-Time Availability Comparison:** The system compares the host's availability with that of the guests, prioritizing the dates chosen by the majority.
- **User-Friendly Interface:** Developed with a React frontend and a TypeScript backend, the app provides a simple and intuitive user experience.
- **Security and Reliability:** ScheduleAI ensures secure interactions through user authentication.

## Technologies Used

### Frontend:

- **@phosphor-icons/react:** Icon library in React, with a vast collection of customizable icons.
- **dotenv:** Library that loads environment variables from a .env file.
- **react:** JavaScript library for building user interfaces.
- **react-dom:** Package that provides methods specific to DOM manipulation in React.
- **react-router-dom:** React library used for managing navigation between pages.
- **showdown:** Library that converts Markdown language into HTML.
- **styled-components:** Library for styling components in React using CSS-in-JS.
- **eslint:** Linting tool to ensure the quality of JavaScript code.
- **typescript:** Superset of JavaScript that adds static typing.
- **vite:** Fast build tool for development and bundling of projects.

### Backend:

- **langchain:** Library for building applications with language integration and LLMs (Large Language Models).
- **@langchain/core:** Core library of LangChain for building language applications.
- **@langchain/openai:** LangChain integration with the OpenAI API.
- **bcrypt:** Library for hashing and comparing passwords.
- **cookie-parser:** Middleware for parsing cookies in HTTP requests.
- **cors:** Middleware to enable CORS (Cross-Origin Resource Sharing) in Express applications.
- **dotenv:** Library that loads environment variables from a .env file.
- **express:** Minimalist framework for building web applications in Node.js.
- **jsonwebtoken:** Library for creating and verifying JSON Web Tokens (JWT).
- **openai:** Library for interacting with the OpenAI API.
- **pg:** PostgreSQL client for Node.js.
- **zod:** Library for validation and schema analysis.
- **ts-node:** Executes TypeScript files directly in Node.js.
- **ts-node-dev:** Development tool that automatically restarts the TypeScript server upon detecting changes.
- **typescript:** Superset of JavaScript that adds static typing.

## Installation and Usage

> Local Installation and Usage.

1. Clone the repository: `git clone https://github.com/SchedulAI/SchedulAI.git`
2. Navigate to the frontend folder in your terminal and run the command `npm install`.
3. Configure the dependency variables from the `.env_example`.
4. Use the command `npm run build` to build the application.
5. Use the command `npm run preview` to start a server with the built files.
6. Access the application at [http://localhost:5173](http://localhost:5173).
7. For the backend, navigate to the folder in your terminal and run the command `npm install`.
8. Configure the dependency variables from the `.env_example`.
9. Use the command `npm run migrate` to initialize the tables in your database.
10. Use the command `npm run build` to build the application.
11. Use the command `npm start` to start a server with the built files.

---

> Server Installation and Usage.

1. Clone the repository: `git clone https://github.com/SchedulAI/SchedulAI.git`
2. Navigate to the frontend folder in your terminal and run the command `npm install`.
3. Configure the dependency variables from the `.env_example`.
4. Use the command `npm run build` to build the application.
5. Copy the files from the **dist** folder to the directory where you serve static files for nginx.
6. Edit `nginx-example.conf` to match your machine and copy it to the nginx configuration folder.
7. Access the application at the configured nginx link.
8. For the backend, navigate to the folder in your terminal and run the command `npm install`.
9. Configure the dependency variables from the `.env_example`.
10. Use the command `npm run migrate` to initialize the tables in your database.
11. Use the command `npm run dev` to start the server in development mode.

## Team

- [Leonardo Mori](https://github.com/LeoMoriLima)
- [Renato Barbosa](https://github.com/RenatoFB8)
- [Leandro Santos](https://github.com/gaidenblk)
- [Willyan Pereira](https://github.com/willy4nn)

---
