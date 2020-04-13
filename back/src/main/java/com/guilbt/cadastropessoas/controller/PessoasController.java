package com.guilbt.cadastropessoas.controller;

import com.guilbt.cadastropessoas.model.dto.PessoaDTO;
import com.guilbt.cadastropessoas.service.PessoasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/pessoas")
public class PessoasController {

    private PessoasService pessoasService;

    @Autowired
    public PessoasController(
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
        return pessoasService.createPessoaValidatingParameters(pessoa, principal.getName());
    }


    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<PessoaDTO> getListaPessoas(
            Principal principal
    ) {
        return pessoasService.buscarPessoasDePrincipal(principal.getName());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public void arquivarPessoa(
            Principal principal,
            @PathVariable("id") Long pessoaId
    ) {
        pessoasService.arquivarPessoa(pessoaId, principal.getName());
    }

}
