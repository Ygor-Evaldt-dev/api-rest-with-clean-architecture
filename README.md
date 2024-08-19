# API REST - Lista de tarefas
![Versão](https://img.shields.io/badge/Versão-1.0.0-blue?style=flat-square)

## Apresentação
Esta é uma API REST de lista de tarefas com autenticação de usuário. <br>
Construída para servir aplicações web onde um usuário pode descrever e salvar as tarefas que deseja realizar e sinalizar as tarefas que já concluiu.

### Tecnologias utilizadas
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white) ![Postgres](https://img.shields.io/badge/PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white) ![Jest](https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-1572B6?style=flat-square&logo=axios&logoColor=white) ![JSON Web Token](https://img.shields.io/badge/JSON%20Web%20Token-000000?style=flat-square&logo=json-web-tokens&logoColor=white) ![Bcrypt](https://img.shields.io/badge/Bcrypt-435363?style=flat-square&logo=npm&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) ![Compose](https://img.shields.io/badge/Compose-1A1A1A?style=flat-square&logo=docker&logoColor=white) ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat-square&logo=swagger&logoColor=black)

## Serviços disponíveis

### Públicos

#### Autenticação
![POST](https://img.shields.io/badge/POST-blue) - **LOGIN**: Serviço para autenticar usuários.<br/>

#### Usuário
![POST](https://img.shields.io/badge/POST-blue) - **CADASTRAR**: Permite registrar um novo usuário.<br/>

### Protegidos

#### Usuário
![GET](https://img.shields.io/badge/GET-brightgreen) - **BUSCAR POR ID**: Permite buscar dados de um usuário pelo seu ID.<br/>
![PATCH](https://img.shields.io/badge/PATCH-yellow) - **ATUALIZAR**: Permite atualizar informações do usuário.<br/>
![DELETE](https://img.shields.io/badge/DELETE-red) - **EXCLUIR**: Permite excluir um usuário.<br/>

#### Tarefa
![POST](https://img.shields.io/badge/POST-blue) - **CADASTRAR**: Permite adicionar uma nova tarefa.<br/>
![GET](https://img.shields.io/badge/GET-brightgreen) - **BUSCAR**: Recupera a lista de todas as tarefas do usuário autenticado.<br/>
![GET](https://img.shields.io/badge/GET-brightgreen) - **BUSCAR POR ID**: Recupera uma tarefa pelo seu ID.<br/>
![PATCH](https://img.shields.io/badge/PATCH-yellow) - **ATUALIZAR**: Permite modificar informações de uma tarefa existente.<br/>
![DELETE](https://img.shields.io/badge/DELETE-red) - **EXCLUIR**: Permite excluir uma tarefa.<br/>

## Instalação

### Pré requisítos
- Nodejs v18.20.3 ou superior
- Docker v26.1.4 ou superior
- Docker Compose v2.27.0 ou superior
- Git v2.39.2 ou superior

### Clonagem do repositório
- ![HTTPS](https://img.shields.io/badge/HTTPS-green?style=flat-square)
    ```bash
    https://github.com/Ygor-Evaldt-dev/api-rest-with-clean-architecture.git
    ```
- ![SSH](https://img.shields.io/badge/SSH-green?style=flat-square)
    ```bash
    git@github.com:Ygor-Evaldt-dev/api-rest-with-clean-architecture.git
    ```
Também é possível baixar o arquivo .zip do projeto clicando no botão '<> Code' acima da listagem de arquivos do projeto e selecionando a opção 'Download ZIP'

### Executando projeto localmente
Em seu computador, abra o diretório do projeto no terminal e execute o seguinte comando para baixar as dependências.
```bash
npm install
```

Após baixar as dependências, você deve ser capaz de executar o projeto localmente executando um dos comando abaixo.
```bash
# desenvolvimento
npm run dev

# modo produção
$ npm run start
```

### Conferindo se tudo deu certo
- Acesse [http://localhost:3000/swagger](http://localhost:3000/swagger) para acessar a documentação do webservice.
- Acesse [http://localhost:8081](http://localhost:8081) para acessar o pgAdmin com as credenciais definidas no arquivo '.env'

### .env
É necessário criar um arquivo .env na raiz do projeto seguindo o modelo abaixo:
```bash
#Local development
PORT=3000
BASE_URL=http://localhost:${PORT}

# Token
TOKEN_SECRET=token_secret
TOKEN_TIME=1d

# Database
## Environment variables declared in this file are automatically made available to Prisma.
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=db_name
POSTGRES_USER=db_user
POSTGRES_PASSWORD=db_password

PGADMIN_DEFAULT_EMAIL=email@email.com
PGADMIN_DEFAULT_PASSWORD=password

## Url
DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}
```

## Como utilizar
É preciso cadastrar um usuário para utilização dos serviços autenticados.

### Criando um usuário
- Acesse [http://localhost:3000/swagger](http://localhost:3000/swagger)
- Navegue até a sessão 'Usuário' e encontre o serviço 'Cadastrar'.
- Após concluír o cadastro de usuário, utilize as credenciais para obter um token de autenticação válido.

### Autenticação
1 - Navegue até a sessão 'Autenticação' e encontre o serviço 'Login'<br/>
2 - Clique em 'Try it out', preencha o 'request body' com as credêndiais do usuario cadastrado e clique em 'Execute'<br/>
3 - Copie o token de autenticação, navegue até o inicio da página do swagger, clique no botão 'Authorize' e cole o token no campo de entrada.<br/>
4 - Feito todos os passos descritos acima, os serviços autenticados estarão disponíveis para útilização<br/>

## Contribua

### Testes
Até a data atual (05-08-2024), foram implementados apenas testes unitários e de integração de forma básica neste projeto, há muito o que melhorar na camada de testes, sinta-se a vontade para contribuir com este projeto melhorando a camada de teste ou adicionando novas features. Envie seu pull request !! :D.

## Licença

- [GNU GENERAL PUBLIC LICENSE](https://github.com/Ygor-Evaldt-dev/api-com-express/tree/master?tab=GPL-3.0-1-ov-file)
