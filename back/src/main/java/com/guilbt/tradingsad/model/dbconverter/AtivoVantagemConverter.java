package com.guilbt.tradingsad.model.dbconverter;

import com.guilbt.tradingsad.model.Ativo;

import javax.persistence.Converter;

@Converter
public class AtivoVantagemConverter extends EnumConverter<Integer, Ativo.Vantagem> {
    public AtivoVantagemConverter() {
        super(Ativo.Vantagem.class);
    }
}
