package com.guilbt.cadastropessoas.service;

import com.guilbt.cadastropessoas.controller.exceptions.ConflictException;
import com.guilbt.cadastropessoas.controller.exceptions.PreConditionException;
import com.guilbt.cadastropessoas.dao.PessoasDAO;
import com.guilbt.cadastropessoas.dao.UsuariosDAO;
import com.guilbt.cadastropessoas.model.Pessoa;
import com.guilbt.cadastropessoas.model.dto.PessoaDTO;
import com.guilbt.cadastropessoas.util.PreConditions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Scope("singleton")
public class PessoasService {
    private PessoasDAO pessoasDAO;
    private UsuariosDAO usuariosDAO;

    @Autowired
    public PessoasService(
        PessoasDAO pessoasDAO,
        UsuariosDAO usuariosDAO
    ) {
        this.pessoasDAO = pessoasDAO;
        this.usuariosDAO = usuariosDAO;
    }

    @Transactional
    public Long createPessoaValidatingParameters(PessoaDTO pessoaDTO, String principalEmail) {
        PreConditions.isNull(pessoaDTO.getId(), "id");
        PreConditions.notNull(pessoaDTO.getNome(), "nome");
        if(pessoaDTO.getEmail() != null) {
            PreConditions.validEmail(pessoaDTO.getEmail());
        }
        PreConditions.validDate(pessoaDTO.getDataNascimento());
        PreConditions.validCPF(pessoaDTO.getCpf());
        Pessoa pessoa = pessoaDTO.getDBObject();
        Long usuarioId = usuariosDAO.getIdByEmail(principalEmail);
        pessoa.setUsuarioCadastroId(usuarioId);
        try {
            pessoasDAO.persist(pessoa);
        } catch (DataIntegrityViolationException ex) {
            throw new ConflictException(
                    String.format("Já existe pessoa cadastrada com o CPF %s", pessoa.getCpf())
            );
        }
        return pessoa.getId();
    }

    @Transactional
    public Long createPessoaValidatingParametersV2(PessoaDTO pessoaDTO, String principalEmail) {
        PreConditions.notNull(pessoaDTO.getEndereco(), "endereco");
        return createPessoaValidatingParameters(pessoaDTO, principalEmail);
    }
}
