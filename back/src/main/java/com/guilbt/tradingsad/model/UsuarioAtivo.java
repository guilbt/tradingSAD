package com.guilbt.tradingsad.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "USUARIO_ATIVO", schema = "TESTE")
@Data
@EqualsAndHashCode(of = "id")
@NoArgsConstructor
public class UsuarioAtivo {
    @Column(name = "USUARIO_ATIVO_ID")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "USUARIO_ID", nullable = false)
    private Long usuarioId;

    @Column(name = "ATIVO_ID", nullable = false)
    private Long ativoId;

    @Column(name = "QUANTIDADE", nullable = false)
    private BigDecimal quantidade;

    public UsuarioAtivo(Long usuarioId, Long ativoId, BigDecimal quantidade) {
        this.usuarioId = usuarioId;
        this.ativoId = ativoId;
        this.quantidade = quantidade;
    }
}
