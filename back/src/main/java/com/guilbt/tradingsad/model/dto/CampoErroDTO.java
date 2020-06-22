package com.guilbt.tradingsad.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CampoErroDTO {
    private String campo;
    private String erro;
}
