
create database teste;

\c teste

create schema teste;

CREATE TABLE teste.USUARIO (
  usuario_id SERIAL PRIMARY KEY,	
  email TEXT NOT NULL,
  senha TEXT NOT NULL
);

create unique index usuario_email_uindex
  on teste.USUARIO (email);
   
-- CREATE TYPE SEXO as ENUM('F', 'M');
CREATE TABLE teste.PESSOA (
  PESSOA_ID SERIAL PRIMARY KEY,	
  nome TEXT NOT NULL,
  sexo CHAR(1),
  email TEXT,
  data_nascimento DATE NOT NULL,
  naturalidade TEXT,
  nacionalidade TEXT,
  cpf TEXT unique,
  esta_arquivado boolean default false,
  usuario_cadastro_id int constraint table_name_usuario__fk references teste.usuario ("usuario_id"),
  endereco TEXT
);

create unique index pessoa_cpf_uindex
  on teste.pessoa (cpf);
   
INSERT INTO teste.USUARIO (email, senha)
  values ('usuario@default.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a');