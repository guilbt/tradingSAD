package com.guilbt.cadastropessoas.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Entity
@Table(name = "USUARIO", schema = "TESTE")
@Data
@EqualsAndHashCode(of = "id")
public class Usuario {
    @Column(name = "USUARIO_ID") @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "EMAIL", nullable = false)
    private String email;

    @Column(name = "SENHA", nullable = false)
    private String senha;
}
