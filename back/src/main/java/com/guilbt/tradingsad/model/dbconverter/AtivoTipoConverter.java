package com.guilbt.tradingsad.model.dbconverter;

import com.guilbt.tradingsad.model.Ativo;

import javax.persistence.Converter;

@Converter
public class AtivoTipoConverter extends EnumConverter<Integer, Ativo.Tipo> {
    public AtivoTipoConverter() {
        super(Ativo.Tipo.class);
    }
}
