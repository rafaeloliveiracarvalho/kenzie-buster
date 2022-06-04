<h1 align="center"><strong>Kenzie Buster API</strong></h1>

API foi criada como entrega na sprint 3, do módulo Q4 do curso de desenvolvimento full stack da [Kenzie Academy Brasil](www.kenzie.com.br). O objeto era criar uma API com funcionalidades básicas de um ecommerce de DVD's, onde é possível se cadastrar como usuário comum (compradores) ou usuários administradores (vendedores), sendo que usuários comuns podem adicionar DVD's em seu carrinho e finalizar as compras, e usuários do tipo administradores também podem incluir DVD's no banco de dados.

O url base da API é https://entrega-kenzie-buster.herokuapp.com

<br/>

## **Principais Tecnologias Utilizadas**

<hr/>

- Typescript
- Nodejs
- Express
- TypeORM
- Postgres

<br/>

## **Endpoints**

<hr/>
Acesse https://entrega-kenzie-buster.herokuapp.com/api/v1/docs

<br/>

## **Utilizando a API localmente**

<hr/>

1. Crie um database Postgres
2. Clone este repositório
3. Em um terminal, navegue até a pasta do repositório clonado
4. Crie um arquivo .env conforme o arquivo .env.example
   1. Será criado um usuário admin conforme as variáveis de ambiente
5. Instale as dependências
   1. Utilize npm install caso prefira npm como gerenciador de pacotes
   2. Utilize yarn ou yarn install caso prefira yarn como gerenciador de pacotes
6. Execute o script "migration:run" para que sejam criadas as tabelas no banco de dados
7. Execute o script "dev" para iniciar o servidor
8. Para acessar a documentação dos endpoints localmente utilize a url http://localhost:3000/api/v1/docs e troque o server para local

<br/>

## **Rest Client Insomnia**

<hr/>
Caso utilize opte por utilizar o Insomnia como rest client favor utilizar o arquivo rest-client-insomnia.json para importar os endpoints.
