# Full Stack FSW Foods

FSW foods é um projeto que você pode estudar toda a construção de um e-commmerce de restaurantes estilo Ifood junto com o Felipe na Full Stack Week 4.0. Muito interessante para desenvolver todo o front-end e back-end do ecossistema de um serviço de delivery, aprender sobre client e server componentes e como integrá-los nos componentes da aplicação. Visto que é necessário se comunicar com banco de dados no back-end e persistir dados em estados no front-end. Um grande aprendizado desse projeto foi me aprofundar em Context API na construção do carrinho e em como integrá-lo na aplicação já que ele pode ser acessado de vários pontos da aplicação.

## Tecnologias
Nesse projeto foi utilizado:
- Next Js 14
- Typescript
- Serve Actions
- Shadcn-ui
- Prisma ORM
- Banco de Dados Postgres
- Neon para hospedar o banco de dados
- Deploy na Vercel
- Contex API
- Autenticação com Next-Auth e o Google

## Features

- O usuário pode buscar o restaurante na barra de pesquisa
- O carrinho possui todas as funções necessárias pra calcular a ordem do usuário junto com a quantidade e o preço utilizando context API.
- Cada usuário pode criar uma lista de restaurantes favoritos
- Cada usuário possui um gerenciador de pedidos onde pode consultar todos os pedidos e até refazê-los.

## Melhorias da minha parte
Além do projeto feito durante as lives, inseri a responsividade do site para as versões desktop e tablet com o Figma do projeto fornecido, adicionei o sistema de avaliação do restaurante no banco de dados e nas queries dos restaurantes para renderizar os componentes. 

## Projetos futuros
É um projeto que ainda pode se melhorar ainda mais, adicionar um dashboard  para gestão de pedidos, estoque e financeiro para o restaurante por exemplo.

## Configurações iniciais 
### Cloning the repository

```shell
git clone https://github.com/jrneliodias/lingo-project.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
DATABASE_URL=
GOOGLE_CLIENT_ID =
GOOGLE_CLIENT_SECRET =
```
### Setup Prisma ORM

```shell
npm run db:push

```

### Seed the app

```shell
npm run db:seed

```


### Start the app

```shell
npm run dev
```
