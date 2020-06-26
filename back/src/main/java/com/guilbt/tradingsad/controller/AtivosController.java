package com.guilbt.tradingsad.controller;

import com.guilbt.tradingsad.model.dto.AtivoDTO;
import com.guilbt.tradingsad.model.dto.AtivoValoresTratadoDTO;
import com.guilbt.tradingsad.service.AtivosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;
import java.util.concurrent.TimeUnit;

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
            @RequestBody BigDecimal valor,
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

    @GetMapping("/simbolo/{simbolo}")
    @ResponseStatus(value = HttpStatus.OK)
    public ResponseEntity<AtivoValoresTratadoDTO> getInformacoesAtivoPorSimbolo(
            @PathVariable("simbolo") String simbolo
    ) {
        CacheControl cacheControl = CacheControl.maxAge(60, TimeUnit.MINUTES)
                .noTransform()
                .mustRevalidate();
        return ResponseEntity.ok().cacheControl(cacheControl).body(
                new AtivoValoresTratadoDTO(ativosService.buscarInformacoesPorSimbolo(simbolo))
        );
    }
}
