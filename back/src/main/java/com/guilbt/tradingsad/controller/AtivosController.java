package com.guilbt.tradingsad.controller;

import com.guilbt.tradingsad.model.dto.AtivoDTO;
import com.guilbt.tradingsad.model.dto.AtivoInvestidoDTO;
import com.guilbt.tradingsad.model.dto.AtivoValoresTratadoDTO;
import com.guilbt.tradingsad.model.dto.CarteiraDTO;
import com.guilbt.tradingsad.model.dto.alphaVantage.AtivoValoresDTO;
import com.guilbt.tradingsad.service.AtivosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/ativos")
public class AtivosController {

    private AtivosService ativosService;

    @Autowired
    public AtivosController(
        AtivosService ativosService
    ) {
        this.ativosService = ativosService;
    }

    @PostMapping("/{ativoId}/investir")
    @ResponseStatus(value = HttpStatus.OK)
    public void investirValor(
            Principal principal,
            @RequestBody  BigDecimal valor,
            @PathVariable("ativoId") Long ativoId
    ) {
        ativosService.investirValor(ativoId, valor, principal.getName());
    }


    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<AtivoDTO> getAtivosPorValor(
            @RequestParam("valor") BigDecimal valor
    ) {
        return ativosService.buscarPorValor(valor);
    }

    @GetMapping("/{simbolo}")
    @ResponseStatus(value = HttpStatus.OK)
    public AtivoValoresTratadoDTO getInformacoesAtivoPorSimbolo(
            @PathVariable("simbolo") String simbolo
    ) {
        return new AtivoValoresTratadoDTO(ativosService.buscarInformacoesPorSimbolo(simbolo));
    }
}
