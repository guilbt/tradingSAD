package com.guilbt.tradingsad.controller;

import com.guilbt.tradingsad.model.dto.CarteiraDTO;
import com.guilbt.tradingsad.model.dto.UsuarioDTO;
import com.guilbt.tradingsad.service.CarteiraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.security.Principal;

@RestController
@RequestMapping("/carteira")
public class CarteiraController {

    private CarteiraService carteiraService;

    @Autowired
    public CarteiraController(
            CarteiraService carteiraService
    ) {
        this.carteiraService = carteiraService;
    }

    @PutMapping("/fundos")
    @ResponseStatus(value = HttpStatus.OK)
    public void inserirFundos(
            Principal principal,
            @RequestBody BigDecimal valor
    ) {
        carteiraService.inserirFundos(valor, principal.getName());
    }

    @GetMapping("/infos")
    @ResponseStatus(value = HttpStatus.OK)
    public UsuarioDTO buscarInfos(
            Principal principal
    ) {
        return carteiraService.buscarInfos(principal.getName());
    }

    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public CarteiraDTO getCarteira(
            Principal principal
    ) {
        return carteiraService.buscar(principal.getName());
    }
}
