package com.guilbt.tradingsad.controller;

import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @GetMapping("/email")
    public String retrievePrincipal(Principal principal) {
        return principal.getName();
    }
}
