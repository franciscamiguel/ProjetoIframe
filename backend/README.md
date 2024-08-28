# GETDEMO BACKEND TASK

💫 Bem-vindo! 🎉

Este exercício de backend envolve a construção de um aplicativo Node.js/Express.js que servirá uma API REST.

## Modelos de Dados

> **Todos os modelos estão definidos em src/model.js**

### Demo

Uma demo é um objeto que contém um nome e uma lista de frames.

### Frames

Um frame é a representação de um estado de uma demo. Ele é composto pela ordem e um HTML.

## Preparação

O exercício requer que o Node.js esteja instalado. Recomendamos usar a versão LTS.

1. Comece criando um repositório local para esta pasta.

1. No diretório raiz do repositório, execute npm install para baixar todas as dependências.

1. Em seguida, npm run seed semeará o banco de dados SQLite local. Aviso: Isso excluirá o banco de dados existente, se houver. O banco de dados fica em um arquivo local chamado database.sqlite3.

1. Depois, execute npm start, que deverá iniciar o servidor.

❗️ **Certifique-se de commitar todas as mudanças na branch master!**

## Notas Técnicas

- O servidor está rodando com nodemon, que reiniciará automaticamente quando você modificar e salvar um arquivo.

- O provedor de banco de dados é SQLite, que armazenará os dados em um arquivo local no seu repositório chamado database.sqlite3. O ORM Sequelize está por cima dele. Você só precisará interagir com o Sequelize - **por favor, dedique algum tempo para ler a documentação do Sequelize antes de iniciar o exercício.**

- O servidor está rodando na porta 3001.

## APIs a Implementar

1. **_GET_** `/demos` - Retornar uma lista de demos.

1. **_PUT_** `/frames/:id` - Atualizar um frame com o HTML editado.

## Indo Além dos Requisitos

Dadas as expectativas de tempo deste exercício, não esperamos que alguém envie algo muito elaborado, mas se você encontrar tempo extra, qualquer item de crédito extra que mostre seus pontos fortes únicos seria incrível! 🙌

## Enviando a Tarefa

Quando terminar a tarefa, responda o email com o link do repositório do github.

Obrigado e boa sorte! 🙏
