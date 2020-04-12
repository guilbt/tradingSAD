package com.guilbt.cadastropessoas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("")
public class AuthenticationController {

    @GetMapping("/email")
    public String retrievePrincipal(Principal principal) {
        return principal.getName();
    }
}
