package com.guilbt.cadastropessoas.controller;

import com.guilbt.cadastropessoas.model.dto.PessoaDTO;
import com.guilbt.cadastropessoas.service.PessoasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/pessoas/v2")
public class PessoasV2Controller {

    private PessoasService pessoasService;

    @Autowired
    public PessoasV2Controller(
        PessoasService pessoasService
    ) {
        this.pessoasService = pessoasService;
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public Long cadastrar(
            Principal principal,
            @RequestBody PessoaDTO pessoa
    ) {
        return pessoasService.createPessoaValidatingParametersV2(pessoa, principal.getName());
    }
    
}
