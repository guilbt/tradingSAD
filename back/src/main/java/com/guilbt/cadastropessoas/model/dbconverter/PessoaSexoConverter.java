package com.guilbt.cadastropessoas.model.dbconverter;

import com.guilbt.cadastropessoas.model.Pessoa;

import javax.persistence.Converter;

@Converter
public class PessoaSexoConverter extends EnumConverter<String, Pessoa.Sexo> {
    public PessoaSexoConverter() {
        super(Pessoa.Sexo.class);
    }
}
