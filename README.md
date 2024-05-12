# hubbe-technical-assessment
Technical assessment for company hubbe.app.

# Projeto de Tela Segura com React e Node.js

Este projeto consiste em uma aplicação web que permite o acesso a uma "tela segura" por apenas um usuário por vez. O frontend é desenvolvido em React, enquanto o backend é criado em Node.js utilizando Express.js para gerenciar a lógica de acesso à tela segura e a comunicação em tempo real é facilitada pelo uso de WebSockets (Socket.IO). Se necessário, o MongoDB é utilizado para armazenar informações sobre o estado da tela segura.

## Motivação

- **React**: É uma biblioteca JavaScript amplamente utilizada para a construção de interfaces de usuário. Sua abordagem baseada em componentes facilita a criação de interfaces interativas e reativas.
- **Node.js com Express.js**: O Node.js é uma plataforma que permite executar JavaScript no servidor, enquanto o Express.js é um framework minimalista para construir aplicativos web em Node.js. Essa combinação oferece um ambiente de desenvolvimento rápido e eficiente para criar o backend da aplicação.
- **Socket.IO**: Uma biblioteca JavaScript para aplicativos web em tempo real. Facilita a comunicação bidirecional entre o cliente e o servidor, ideal para implementar funcionalidades como a exclusividade de acesso à "tela segura".
- **MongoDB**: Um banco de dados NoSQL flexível e escalável. Utilizado para armazenar informações sobre o estado da tela segura, como quem está acessando no momento.

## Estrutura do Projeto

O projeto é dividido em duas partes principais: o frontend e o backend.

hubbe-technical-assessment/
│
├── backend/
│   ├── index.js         # Arquivo principal do servidor Node.js
│   ├── socketManager.js # Lógica de gerenciamento de sockets
│   ├── models/          # Modelos do MongoDB (se necessário)
│   └── routes/          # Rotas da API REST (se necessário)
│
└── frontend/
    ├── public/
    └── src/
      ├── components/   # Componentes React
      ├── pages/        # Páginas React
      ├── services/     # Funções utilitárias para comunicação com o backend
      └── App.tsx        # Componente principal do React

## Funcionalidades

- **Acesso à Tela Segura**: A aplicação permite que apenas um usuário por vez acesse a "tela segura". Quando um usuário está nessa tela, outros usuários são redirecionados para uma página de espera.
- **Comunicação em Tempo Real**: Utilizando WebSockets (Socket.IO), a aplicação é capaz de atualizar automaticamente a interface do usuário quando o estado da tela segura é alterado.
- **Armazenamento de Dados**: Se necessário, o MongoDB é utilizado para armazenar informações sobre o estado da tela segura, como quem está acessando no momento.

## Como Executar

1. Clone o repositório:

```bash
git clone https://github.com/gugagobbato/hubbe-technical-assessment.git
```

2. Instale as dependências do frontend e do backend:

```bash
cd hubbe-technical-assessment
cd frontend
npm install
cd ..
cd backend
npm install
```

3. Inicie o servidor Node.js:

```bash
cd backend
npm start
```

4. Inicie o aplicativo React:

```bash
cd frontend
npm start
```

5. Acesse o aplicativo em seu navegador:

```bash
http://localhost:3000
```

## Observações

- **Configuração do MongoDB**: Caso deseje utilizar o MongoDB para armazenar informações sobre o estado da tela segura, certifique-se de ter o MongoDB instalado em sua máquina e ajuste a URL de conexão no backend.

- **Testes**: Este projeto inclui testes básicos para o frontend e o backend. Contudo, para um ambiente de produção, é recomendável adicionar testes mais abrangentes para garantir a qualidade e a confiabilidade do código.

## Conclusão

Este projeto é um exemplo básico de uma aplicação web que permite o acesso a uma "tela segura" por apenas um usuário por vez. Utilizando React, Node.js, Socket.IO e, opcionalmente, MongoDB, é possível criar uma aplicação reativa e em tempo real com funcionalidades avançadas de comunicação e armazenamento de dados.