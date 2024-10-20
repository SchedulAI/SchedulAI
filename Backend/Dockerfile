# Usando uma imagem do Node.js
FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Instalar ts-node como global para rodar TypeScript diretamente
RUN npm install -g ts-node typescript

# Copiar o código fonte
COPY . .

# Expor a porta do backend
EXPOSE 3000

# Rodar o servidor usando ts-node
CMD ["ts-node", "src/index.ts"]
