package com.guilbt.tradingsad.model.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class AtivoInvestidoDTO {
    private String nome;
    private String simbolo;
    private BigDecimal quantidade;
    private BigDecimal precoUnitario;
    private BigDecimal valorTotal;
}
