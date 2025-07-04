# PlaSeg API

## Introdução

API para uma plataforma de criação automatizada de projetos municipais.

## Tecnologias

- Linguagem: [Node.js](https://nodejs.org)
- Framework: [Fastify.js](https://www.fastify.io)
- ORM: [PrismaORM](https://www.prisma.io)
- Documentação [Swagger](https://swagger.io/)
- Banco de Dados: [PostgreSQL](https://www.postgresql.org)
- Autenticação: [JWT](https://jwt.io)
- Gerenciamento de Dependências: [pnpm](https://pnpm.io)
- Linter: [ESLint](https://eslint.org)
- Testes: [Vitest](https://vitest.dev)

## Estrutura do Projeto

| Diretório/Arquivo                                                       | Descrição                                                                                           |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **prisma/**                                                             | Configuração do Prisma ORM para gerenciamento do banco de dados                                     |
| └─ **migrations/**                                                      | Pasta com as migrações do Prisma                                                                    |
| └─ **schema.prisma**                                                    | Arquivo de configuração de schema                                                                   |
| **src/**                                                                | Código-fonte principal da aplicação                                                                 |
| └─ **core/**                                                            | Componentes centrais e reutilizáveis                                                                |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ **entities/**                                | Definições de entidades "core" que serão usadas no domínio                                          |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ **errors/**                                  | Gerenciamento de erros personalizados                                                               |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ **types/**                                   | Definições de tipos TypeScript                                                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ **utils/**                                   | Funções utilitárias e helpers                                                                       |
| └─ **domain/**                                                          | Lógica de negócio e regras do domínio                                                               |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ **cryptography/**                            | Abstrações das classes que envolvem criptografia                                                    |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ **entities/**                                | Entidades específicas do domínio                                                                    |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ **value-objects/**   | Estruturas imutáveis que compõe entidades de negócio                                                |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ **repositories/**                            | Interfaces de repositórios para acesso a dados                                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ **use-cases/**                               | Casos de uso que implementam a lógica de negócio                                                    |
| └─ **infra/**                                                           | Camada de infraestrutura e integrações externas                                                     |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ **adapters/**                                | Adaptadores para conectar domínio e infraestrutura                                                  |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ **database/prisma/**                         | Implementações específicas do Prisma                                                                |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ **mappers/**         | Mapeamento entre modelos de dados e entidades                                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ **repositories/**    | Implementações concretas de repositórios                                                            |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ **use-cases/**       | Casos de uso adaptados para infraestrutura                                                          |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ **prisma.ts**        | Configuração e inicialização do Prisma Client                                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ **env/**                                     | Configurações de variáveis de ambiente                                                              |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ **http/**                                    | Configurações relacionadas à API HTTP                                                               |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ **controllers/**     | Controladores para lidar com requisições HTTP                                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ **middlewares/**     | Middlewares para processamento de requisições                                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ **schemas/**         | Esquemas de validação de dados                                                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ **error-handler.ts** | Manipulação centralizada de erros HTTP                                                              |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ **server.ts**        | Inicialização e configuração do servidor Fastify                                                    |
| **test/**                                                               | Pasta que gerencia os arquivos necessários para a execução dos testes                               |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ **cryptography/**                            | Classes que simulam as funcionalidades de criar token e criptografar e comparar senhas criptografas |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ **factories/**                               | Funções que criam "mocks" das entidades para serem utilizadas nos testes                            |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ **repositories/**                            | Repositórios em memória para serem utilizados nos testes                                            |

## Endpoints

| Método   | Endpoint                              | Descrição                                   |
| -------- | ------------------------------------- | ------------------------------------------- |
| **POST** | `/auth/sign-up`                       | Registrar um novo usuário                   |
| **POST** | `/auth/sign-in`                       | Fazer login e obter o token de autenticação |
| **GET**  | `/auth/profile`                       | Obter o perfil do usuário autenticado       |
| **POST** | `/municipality`                       | Criar um novo município                     |
| **POST** | `/municipality/qualified-staff`       | Criar um novo funcionário qualificado       |
| **POST** | `/municipality/project-partnership`   | Criar uma nova parceria de projeto          |
| **POST** | `/municipality/allocation-department` | Criar um novo departamento de alocação      |
| **POST** | `/municipality/management`            | Criar um novo gerenciamento                 |
| **POST** | `/municipality/maintenance-contract`  | Criar um novo contrato de manutenção        |
| **POST** | `/types`                              | Criar um novo tipo                          |
| **GET**  | `/types/group-parent-id`              | Obter tipos por grupo e parent-id           |
| **POST** | `/opportunities`                      | Criar uma nova oportunidade                 |
| **GET**  | `/opportunities`                      | Obter oportunidades                         |
| **GET**  | `/opportunities/{id}`                 | Obter oportunidade por id                   |
| **PUT**  | `/opportunities/{id}`                 | Atualizar uma oportunidade existente        |
| **POST** | `/base-products`                      | Criar um novo produto base                  |
| **GET**  | `/base-products`                      | Obter produtos base                         |
| **GET**  | `/base-products/{id}`                 | Obter produto base por id                   |

## Instalação

Clone o repositório na sua máquina:

```bash
git clone https://github.com/plaseg/plaseg-api
```

Acesse o projeto:

```bash
cd plaseg-api
```

Instale as dependências:

```bash
pnpm install
```

Configure o arquivo .env com suas credenciais (baseado no .env.example):

```env
NODE_ENV=development
EXPIRES_IN=10000
PORT=3333
DATABASE_URL=postgresql://postgres:docker@localhost:5432/fastify
```

# Executando o Projeto

Rode o banco postgres no docker (caso não já possua um postgres hospedado em outro serviço):

```bash
docker compose up -d
```

Suba as migrações para o banco:

```bash
pnpm migrate
```

Gere o schema do prisma:

```bash
pnpm generate
```

Inicie o servidor:

```bash
pnpm dev
```

Acesse a documentação da api com Swagger: http://localhost:3333/

# Executando os Testes

Testes unitários:

```bash
pnpm test
```

Testes E2E:

```bash
pnpm test:e2e
```
