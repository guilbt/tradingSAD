package com.guilbt.tradingsad.model.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class CarteiraDTO {
    private final BigDecimal valorTotalInvestido;
    private final BigDecimal fundos;
    private final List<AtivoInvestidoDTO> ativos;

    public CarteiraDTO(BigDecimal fundos, List<AtivoInvestidoDTO> ativos) {
        this.ativos = ativos;
        this.fundos = fundos;
        this.valorTotalInvestido = ativos.stream()
            .map(AtivoInvestidoDTO::getValorTotal)
            .reduce(BigDecimal.ZERO,BigDecimal::add);
    }
}
