package com.guilbt.tradingsad.model.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class UsuarioDTO {
    private Long id;
    private String email;
    private BigDecimal fundos;

    public UsuarioDTO(Long id, String email, BigDecimal fundos) {
        this.id = id;
        this.email = email;
        this.fundos = fundos;
    }
}
