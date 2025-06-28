# Task List

## 📖 Descrição

Aplicação completa de lista de tarefas com frontend e backend.

## 📂 Estrutura do Projeto

Este é um monorepo que contém:

- **Frontend** (`/web`) - Interface web da aplicação
- **Backend** (`/api`) - API REST

## 🚀 Tecnologias

### Frontend
- TypeScript
- React
- Vite
- TailwindCSS

### Backend
- TypeScript
- Node.js
- Express
- Prisma

## ✅ Funcionalidades

- ✅ Cadastrar nova tarefa
- ✅ Listar todas as tarefas
- ✅ Editar tarefa existente
- ✅ Deletar tarefa
- ✅ Marcar/desmarcar tarefa como concluída

## Estrutura da Task

- `id` - Identificador único de cada task
- `title` - Título da task
- `description` - Descrição detalhada da task
- `completed_at` - Data de quando a task foi concluída. O valor inicial deve ser `null`
- `created_at` - Data de quando a task foi criada
- `updated_at` - Deve ser sempre alterado para a data de quando a task foi atualizada

## API Endpoints

- `POST /tasks` - Criar nova tarefa
- `GET /tasks` - Listar todas as tarefas
- `PUT /tasks/:id` - Atualizar tarefa
- `DELETE /tasks/:id` - Deletar tarefa
- `PATCH /tasks/:id/complete` - Marcar como concluída
- `PATCH /tasks/:id/uncomplete` - Desmarcar a task como concluída

---

Feito com 💜 &nbsp;por [Tiago Lopes]([https://www.tiagolopes.bio) 👋
