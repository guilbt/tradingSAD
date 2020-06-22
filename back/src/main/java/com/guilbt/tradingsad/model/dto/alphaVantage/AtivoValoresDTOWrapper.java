package com.guilbt.tradingsad.model.dto.alphaVantage;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class AtivoValoresDTOWrapper {
    @JsonProperty("Global Quote")
    private AtivoValoresDTO ativoValores;

    @JsonProperty("Note")
    private String note;
}
