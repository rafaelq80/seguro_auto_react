# Projeto Gerenciador de Seguros Automotivos - Frontend

<br />

<div align="center">
    <img src="https://i.imgur.com/AzshGmS.png" title="source: imgur.com" width="50%"/>
</div>

<br /><br />

# 1. Descrição

O **Gerenciador de Seguros Automotivos** é uma aplicação **frontend** desenvolvida com **React**, utilizando **Vite** e **TypeScript**, responsável pela interface de usuário do sistema de gestão de seguros de veículos.

A aplicação consome uma **API REST desenvolvida em NestJS**, permitindo o gerenciamento das principais entidades do sistema, como **Usuários**, **Clientes** e **Apólices de Seguro**.

O sistema também implementa **autenticação por usuário e senha**, utilizando **JWT (JSON Web Token)** para proteger rotas privadas e garantir que apenas usuários autenticados tenham acesso às funcionalidades da aplicação.

O objetivo do projeto é demonstrar a construção de uma **aplicação moderna baseada em arquitetura cliente-servidor**, com separação clara entre frontend e backend, utilizando tecnologias amplamente utilizadas no desenvolvimento web.

---

## 1.1 Principais Funcionalidades

* **Autenticação por Usuário e Senha**
  Sistema de login que controla o acesso à aplicação.
* **Validação de Token JWT**
  Proteção de rotas privadas por meio da verificação do token retornado pela API.
* **CRUD de Usuários**
  Criação, visualização e atualização de usuários do sistema.
* **CRUD de Clientes**
  Cadastro e gerenciamento de clientes que possuem seguros automotivos.
* **CRUD de Apólices (Seguros)** 
  Registro e gerenciamento das apólices de seguros vinculadas aos clientes.

---

# 2. Tecnologias

| Item                         | Descrição    |
| ---------------------------- | ------------ |
| **Servidor**                 | Node.js      |
| **Linguagem de programação** | TypeScript   |
| **Biblioteca**               | React        |
| **Build Tool**               | Vite         |
| **Estilização**              | Tailwind CSS |

---

# 3. Outras Bibliotecas

| Item                     | Descrição      |
| ------------------------ | -------------- |
| **Tabela de Dados**      | TanStack Table |
| **Manipulação de Datas** | Date-fns       |
| **Gráficos - Dashboard** | Rechart       |

---

# 4. Pré-requisitos

Antes de iniciar, certifique-se de possuir as seguintes ferramentas instaladas:

* **Node.js** (v16 ou superior)
* **API Backend em NestJS** em execução (responsável pelos dados da aplicação)

---

# 5. Instalação – Ambiente Local

## 5.1 Clonando o repositório

```bash
git clone https://github.com/rafaelq80/seguro-auto-react.git
cd seguradora-react
```

---

## 5.2 Instalando as dependências

Instale todas as bibliotecas do projeto utilizando o **npm**:

```bash
npm install
```

---

## 5.3 Configuração do ambiente

A aplicação deve estar configurada para consumir a API NestJS no endereço abaixo:

```bash
http://localhost:4000
```

Caso necessário, ajuste a URL da API no serviço responsável pelas requisições HTTP.

---

## 5.4 Executando o projeto

Inicie o servidor de desenvolvimento com o comando:

```bash
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:5173
```

---

# 6. Estrutura do Projeto

```plaintext
src/
│
├── components/       # Componentes reutilizáveis da interface
├── contexts/         # Gerenciamento de estado global (ex: autenticação)
├── models/           # Modelos e tipagens da aplicação
├── pages/            # Páginas da aplicação
├── services/         # Integração com a API (requisições HTTP)
├── utils/            # Funções auxiliares
└── App.tsx           # Componente principal da aplicação
```

---

# 7. Autenticação e Validação de Token JWT

## Fluxo de Autenticação

1. O usuário realiza o login informando **usuário** e **senha**.
2. A aplicação envia uma requisição para a **API NestJS**.
3. A API valida as credenciais e retorna um **token JWT**.
4. O token é armazenado na **Context API**, permitindo sua reutilização nas requisições autenticadas.
5. Todas as rotas protegidas utilizam o token para validar o acesso.

---

## Controle de Autenticação

* Caso o **token expire** ou seja **inválido**, o usuário será redirecionado automaticamente para a página de **login**.

---

# 8. Implementações Futuras

* [ ] Implementar atualização de perfil do usuário
* [x] Implementar Dashboard com gráficos e indicadores
* [ ] Implementar notificações relacionadas à expiração de apólices
* [ ] Implementar relatórios de seguros e clientes cadastrados
