package com.guilbt.tradingsad.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/source")
public class CodeRepositoryController {

    @GetMapping()
    public String retrieveUrl() {
        return "https://github.com/guilbt/tradingSAD";
    }
}
