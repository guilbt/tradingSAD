package com.guilbt.tradingsad.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "USUARIO", schema = "TESTE")
@Data
@EqualsAndHashCode(of = "id")
public class Usuario {
    @Column(name = "USUARIO_ID")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "EMAIL", nullable = false)
    private String email;

    @Column(name = "SENHA", nullable = false)
    private String senha;

    @Column(name = "FUNDOS", nullable = false)
    private BigDecimal fundos;
}
