package com.guilbt.cadastropessoas.model;

import com.guilbt.cadastropessoas.model.dbconverter.PessoaSexoConverter;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "PESSOA", schema = "TESTE")
@Data
@EqualsAndHashCode(of = "id")
public class Pessoa {
    @Column(name = "PESSOA_ID") @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NOME", nullable = false)
    private String nome;

    @Column(name = "SEXO")
//    @Convert(converter = PessoaSexoConverter.class)
//    @Enumerated(EnumType.STRING)
    private Sexo sexo;

    @Column(name = "EMAIL", nullable = false)
    private String email;

    @Column(name = "DATA_NASCIMENTO")
    private LocalDate dataNascimento;

    @Column(name = "NATURALIDADE")
    private String naturalidade;

    @Column(name = "NACIONALIDADE")
    private String nacionalidade;

    @Column(name = "CPF", nullable = false, unique = true)
    private String cpf;

    @Column(name = "USUARIO_CADASTRO_ID", nullable = false)
    private Long usuarioCadastroId;

    @Column(name = "ESTA_ARQUIVADO", nullable = false)
    private Boolean estaArquivado;

    @Column(name = "ENDERECO", nullable = true)
    private String endereco;

    public enum Sexo implements EnumBase<String> {
        F("F"),
        M("M");

        private String value;

        Sexo(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }
}
