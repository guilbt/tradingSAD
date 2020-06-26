package com.guilbt.tradingsad.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.guilbt.tradingsad.model.dto.alphaVantage.AtivoValoresDTO;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class AtivoValoresTratadoDTO {
    @JsonProperty("preco")
    private BigDecimal preco;
    @JsonProperty("variacaoPorcentagem")
    private String variacaoPorcentagem;
    @JsonProperty("ultimaBusca")
    private LocalDateTime ultimaBusca;

    public AtivoValoresTratadoDTO(AtivoValoresDTO ativoValoresDTO) {
        this.preco = ativoValoresDTO.getPreco();
        this.variacaoPorcentagem = ativoValoresDTO.getVariacaoPorcentagem();
        this.ultimaBusca = LocalDateTime.now();
    }
}
