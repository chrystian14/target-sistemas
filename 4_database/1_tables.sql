/*
4) Banco de dados
  Uma empresa solicitou a você um aplicativo para manutenção de um cadastro de clientes. Após a reunião de definição
   dos requisitos, as conclusões foram as seguintes:

  Um cliente pode ter um número ilimitado de telefones;
  Cada telefone de cliente tem um tipo, por exemplo: comercial, residencial, celular, etc. O sistema deve permitir 
  cadastrar novos tipos de telefone;
  A princípio, é necessário saber apenas em qual estado brasileiro cada cliente se encontra. O sistema deve permitir cadastrar novos estados;
  Você ficou responsável pela parte da estrutura de banco de dados que será usada pelo aplicativo. Assim sendo:

  Proponha um modelo lógico para o banco de dados que vai atender a aplicação. Desenhe as tabelas necessárias, os campos 
  de cada uma e marque com setas os relacionamentos existentes entre as tabelas;
  Aponte os campos que são chave primária (PK) e chave estrangeira (FK);
  Faça uma busca utilizando comando SQL que traga o código, a razão social e o(s) telefone(s) de todos os clientes do estado de São Paulo (código “SP”);
*/

CREATE TABLE "states" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(25) NOT NULL,
    "code" CHAR(2) NOT NULL UNIQUE
);

CREATE TABLE "customers" (
    "id" SERIAL PRIMARY KEY,
    "business_name" VARCHAR(255) NOT NULL,

    "state_id" INTEGER NOT NULL,
    FOREIGN KEY ("state_id") REFERENCES "states"("id")
);

CREATE TABLE "phone_types" (
    "id" SERIAL PRIMARY KEY,
    "type_name" VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE "phones" (
    "id" SERIAL PRIMARY KEY,
    "number" VARCHAR(15) NOT NULL,

    "phone_type_id" INTEGER NOT NULL,
    FOREIGN KEY ("phone_type_id") REFERENCES "phone_types"("id"),

    "customer_id" INTEGER NOT NULL,
    FOREIGN KEY ("customer_id") REFERENCES "customers"("id")
);

-- Criando um index para acelear a pesquisa pelo código do estado
CREATE INDEX idx_states_code ON "states"("code");
