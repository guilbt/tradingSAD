package com.guilbt.tradingsad.model;

import com.guilbt.tradingsad.model.dbconverter.AtivoTipoConverter;
import com.guilbt.tradingsad.model.dbconverter.AtivoVantagemConverter;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "ATIVO", schema = "TESTE")
@Data
@EqualsAndHashCode(of = "id")
public class Ativo {
    @Column(name = "ATIVO_ID")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NOME", nullable = false)
    private String nome;

    @Column(name = "SIMBOLO")
    private String simbolo;

    @Column(name = "DESCRICAO")
    private String descricao;

    @Column(name = "TIPO", nullable = false)
    @Convert(converter = AtivoTipoConverter.class)
    private Tipo tipo;
    @Column(name = "VANTAGEM", nullable = false)
    @Convert(converter = AtivoVantagemConverter.class)
    private Vantagem vantagem;
    @Column(name = "VALOR_INDICADO", nullable = false)
    private BigDecimal valorIndicado;

    public enum Tipo implements EnumBase<Integer> {
        BOLSA(0),
        CRYPTOMOEDA(1);

        private Integer value;

        Tipo(Integer value) {
            this.value = value;
        }

        public Integer getValue() {
            return value;
        }
    }

    public enum Vantagem implements EnumBase<Integer> {
        VALOR_ABAIXO_NORMAL(0),
        CRESCIMENTO_ESTAVEL(1),
        CRESCIMENTO_RECENTE(2);

        private Integer value;

        Vantagem(Integer value) {
            this.value = value;
        }

        public Integer getValue() {
            return value;
        }
    }
}
