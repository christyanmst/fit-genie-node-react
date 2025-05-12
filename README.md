# Fit Genie

Fit Genie é uma aplicação para gerenciamento de treinos, check-ins e acompanhamento de usuários, composta por um backend em Node.js/Express e um frontend em Next.js/React.

## Demonstração

Acesse: https://fit-genie-node-react.vercel.app

## Estrutura do Projeto

- **fit-genie-api/**: Backend (Node.js, Express, Prisma, MySQL)
- **fit-genie-web/**: Frontend (Next.js, React)

## Tecnologias Utilizadas

- **Backend:**
  - Node.js, Express
  - Prisma ORM
  - MySQL
  - JWT para autenticação
  - Multer para upload de arquivos
- **Frontend:**
  - Next.js, React
  - Axios
  - Rebass, Recharts, React Icons, React Modal, React Toastify

## Como rodar o projeto localmente

### Pré-requisitos
- Node.js >= 18
- MySQL

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/fit-genie-node-react.git
cd fit-genie-node-react
```

### 2. Configuração do Backend
```bash
cd fit-genie-api
cp .env.example .env # configure as variáveis de ambiente
npm install
npx prisma migrate dev # cria as tabelas no banco
npm run dev
```

- O backend roda por padrão em `http://localhost:3333`

### 3. Configuração do Frontend
```bash
cd fit-genie-web
npm install
npm run dev
```
- O frontend roda por padrão em `http://localhost:3000`

## Principais Funcionalidades

- Cadastro e login de usuários
- Criação e gerenciamento de fichas de treino
- Registro de check-ins
- Upload de foto de perfil
- Visualização de progresso

## Modelos do Banco de Dados (Prisma)
- **User**: Usuário, email, senha, altura, peso, foto, fichas de treino, check-ins
- **TrainingSheet**: Ficha de treino, pertence a um usuário
- **TrainingSheetItem**: Exercícios de uma ficha
- **CheckInHist**: Histórico de check-ins do usuário

## Scripts úteis

### Backend
- `npm run dev` — inicia o servidor em modo desenvolvimento
- `npm run lint` — executa o linter

### Frontend
- `npm run dev` — inicia o frontend em modo desenvolvimento
- `npm run lint` — executa o linter

## Deploy

O frontend pode ser facilmente publicado no Vercel. O backend pode ser hospedado em qualquer serviço Node.js/MySQL.

---

Sinta-se à vontade para contribuir ou abrir issues!
