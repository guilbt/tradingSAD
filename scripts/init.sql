create database teste;

\connect teste;

create schema teste;

CREATE TABLE teste.USUARIO (
  USUARIO_ID SERIAL PRIMARY KEY,
  EMAIL TEXT NOT NULL,
  SENHA TEXT NOT NULL,
  FUNDOS NUMERIC(12, 2) NOT NULL
);

create unique index usuario_email_uindex
  on teste.USUARIO (email);

-- CREATE TYPE SEXO as ENUM('F', 'M');
CREATE TABLE teste.ATIVO (
  ATIVO_ID SERIAL PRIMARY KEY,
  NOME TEXT NOT NULL,
  SIMBOLO TEXT NOT NULL,
  DESCRICAO TEXT,
  TIPO INTEGER NOT NULL,
  VANTAGEM INTEGER NOT NULL,
  VALOR_INDICADO NUMERIC(12, 2) NOT NULL
);

create unique index pessoa_cpf_uindex
  on teste.ATIVO (SIMBOLO);

CREATE TABLE teste.USUARIO_ATIVO (
  USUARIO_ATIVO_ID SERIAL PRIMARY KEY,
  USUARIO_ID int constraint usuario_ativo__usuario__fk references teste.USUARIO (usuario_id),
  ATIVO_ID int constraint usuario_ativo__ativo__fk references teste.ativo (ATIVO_ID),
  QUANTIDADE NUMERIC(12, 4) NOT NULL
);

INSERT INTO teste.USUARIO (email, senha, fundos)
  values ('usuario@default.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a', 0);

INSERT INTO teste.ATIVO (NOME, SIMBOLO, DESCRICAO, TIPO, VANTAGEM, VALOR_INDICADO)
    values (
        'NRG Energy Inc.',
        'NRG',
        'NRG Energy é uma compania de venda e distribuição de energia que prove serviços nos Estados Unidos.',
        0,
        0,
        20000
     ),
     (
        'Vornado Realty Trust',
        'VNO',
        'Vornado Realty Trust é uma empresa de investimento imobiliário.',
        0,
        0,
        10000
     ),
     (
        'MGM Resorts International',
        'MGM',
        'MGM é uma empresa que opera e controla hotéis.',
        0,
        0,
        1000
     ),
     (
        'AmerisourceBergen Corp.',
        'ABC',
        'AmerisourceBergen é uma empresa farmacêutica especializada em genéricos.',
        0,
        1,
        20000
     ),
     (
        'Align Technology Inc',
        'ALGN',
        'Align Technology projeta e constroi um metodo para alinhamento dentário.',
        0,
        1,
        2500
     ),
     (
        'DexCom Inc.',
        'DXCM',
        'DexCom é uma compania que desenvolve aparelhos para monitoramento médico.',
        0,
        2,
        20000
     ),
     (
        'NVIDIA Corp. ',
        'NVDA',
        'NVIDIA é uma empresa de desenvolvimento e construção de hardware e software para computadores.',
        0,
        2,
        10000
     ),
     (
        'Advanced Micro Devices Inc.',
        'AMD',
        'AMD é uma empresa de desenvolvimento e construção de hardware e software para computadores.',
        0,
        2,
        1000
     );