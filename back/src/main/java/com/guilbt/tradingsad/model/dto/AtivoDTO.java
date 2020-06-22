package com.guilbt.tradingsad.model.dto;

import com.guilbt.tradingsad.controller.exceptions.NegocioException;
import com.guilbt.tradingsad.model.Ativo;
import lombok.Data;

@Data
public class AtivoDTO {
    private Long id;
    private String nome;
    private String simbolo;
    private String descricao;
    private String vantagem;

    public AtivoDTO(Ativo ativo) {
        this.id = ativo.getId();
        this.nome = ativo.getNome();
        this.simbolo = ativo.getSimbolo();
        this.descricao = ativo.getDescricao();
        this.vantagem = createVantagemTextByEnum(ativo.getVantagem());
    }

    private String createVantagemTextByEnum(Ativo.Vantagem vantagem) {
        switch(
            vantagem.getValue()
        ) {
            case 0: {
                return "Grande risco: o ativo está com um dos menos valores no últimos 12 meses, tendendo a subir.";
            }
            case 1: {
                return "Pequeno risco: o ativo tem tido um crescimento estável nos últimos anos.";
            }
            case 2: {
                return "Médio risco: o ativo tem tido um grande crescimento, tendo o maior retorno nos últimos 12 meses.";
            }
            default: {
                throw new NegocioException("Não há descrição pré-definida para a vantagem encontrada");
            }
        }
    }
}
