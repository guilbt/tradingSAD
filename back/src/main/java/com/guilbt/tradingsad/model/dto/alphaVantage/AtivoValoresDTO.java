package com.guilbt.tradingsad.model.dto.alphaVantage;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class AtivoValoresDTO {
    @JsonProperty("05. price")
    private BigDecimal preco;
    @JsonProperty("10. change percent")
    private String variacaoPorcentagem;
}
