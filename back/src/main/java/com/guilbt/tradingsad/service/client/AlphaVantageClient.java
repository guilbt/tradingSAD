package com.guilbt.tradingsad.service.client;

import com.guilbt.tradingsad.controller.exceptions.NegocioException;
import com.guilbt.tradingsad.model.dto.alphaVantage.AtivoValoresDTO;
import com.guilbt.tradingsad.model.dto.alphaVantage.AtivoValoresDTOWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestClientException;

public class AlphaVantageClient {
    private final SimpleRestClient simpleRestClient;
    private static final String DEFAULT_URL = "https://www.alphavantage.co";
    private final String apikey;

    public AlphaVantageClient() {
        this.simpleRestClient = new SimpleRestClient(
            DEFAULT_URL
        );
        this.apikey = "7YT2DNBU8RK3AEKH";
    }

    public AtivoValoresDTO getInformacoesPorSimbolo(String simbolo) {
        try {
            String endpoint = String.format(
                    "/query?function=GLOBAL_QUOTE&symbol=%s&apikey=%s",
                    simbolo,
                    apikey
            );
            ResponseEntity<AtivoValoresDTOWrapper> response = simpleRestClient.get(
                    endpoint,
                    AtivoValoresDTOWrapper.class
            );
            AtivoValoresDTOWrapper ativoValoresDTOWrapper = response.getBody();
            if(ativoValoresDTOWrapper.getNote() != null) {
                throw new NegocioException("Limite de requisicoes ao site https://www.alphavantage.co atingido, espere alguns minutos e tente novamente.");
            }
            return ativoValoresDTOWrapper.getAtivoValores();
        } catch (RestClientException ex) {
            throw new NegocioException(
                String.format(
                    "Erro ao buscar informações do simbolo %s do site da Alpha Vantage ", simbolo
                )
            );
        }
    }
}
