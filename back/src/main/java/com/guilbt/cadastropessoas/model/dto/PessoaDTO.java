package com.guilbt.cadastropessoas.model.dto;

import com.guilbt.cadastropessoas.model.Pessoa;
import com.guilbt.cadastropessoas.model.dbconverter.PessoaSexoConverter;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Data
@EqualsAndHashCode(of = "id")
public class PessoaDTO {
    private Long id;
    private String nome;
    private String sexo;
    private String email;
    private String dataNascimento;
    private String naturalidade;
    private String nacionalidade;
    private String cpf;

    public Pessoa getDBObject() {
        Pessoa pessoa = new Pessoa();
        pessoa.setId(this.id);
        pessoa.setNome(this.nome);
        pessoa.setSexo(new PessoaSexoConverter().convertToEntityAttribute(this.sexo));
        pessoa.setEmail(this.email);
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(this.dataNascimento, dateFormatter);
        pessoa.setDataNascimento(localDate);
        pessoa.setNaturalidade(this.naturalidade);
        pessoa.setNacionalidade(this.nacionalidade);
        pessoa.setCpf(this.cpf);
        pessoa.setEstaArquivado(false);
        return pessoa;
    }
}
