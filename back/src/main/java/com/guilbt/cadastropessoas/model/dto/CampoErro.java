package com.guilbt.cadastropessoas.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CampoErro {
    private String campo;
    private String erro;
}
