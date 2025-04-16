# 📚 LitShare

LitShare é uma plataforma social para leitores onde os usuários podem compartilhar suas leituras favoritas, curtir livros, seguir outros leitores e explorar uma comunidade focada em literatura.

## 🖼️ Preview

![LitShare Screenshot](./preview.png)

## 🚀 Tecnologias Utilizadas

### Frontend
- **React**
- **Axios**
- **React Router**
- **Bootstrap** / **CSS**

### Backend
- **Node.js** + **Express**
- **PostgreSQL**
- **Passport.js** (Autenticação)
- **OpenLibrary API** (Busca de livros)

## ✨ Funcionalidades

- ✅ Cadastro e login de usuários
- 🔎 Buscar livros pela API do OpenLibrary
- 📚 Adicionar livros à estante pessoal
- ❤️ Curtir livros de outros usuários
- 👥 Seguir e deixar de seguir usuários
- 🔔 Receber notificações por e-mail ao ganhar um novo seguidor
- 💬 Interface dinâmica com React para uma experiência fluida
- 📈 Modais dinâmicos com seguidores, curtidas e interações sociais

## 📦 Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/LucasBondeDeSouza/litshare
cd litshare```

### 2. Configure o backend

```bash
cd backend
npm install
cp .env.example .env
# Edite o .env com suas configurações
node src/index.js```

### 3. Configure o frontend

```bash
cd frontend
npm install
npm run dev```
