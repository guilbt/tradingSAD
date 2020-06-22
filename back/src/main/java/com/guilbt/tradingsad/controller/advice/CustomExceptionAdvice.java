package com.guilbt.tradingsad.controller.advice;

import com.guilbt.tradingsad.controller.exceptions.ConflictException;
import com.guilbt.tradingsad.controller.exceptions.NotFoundException;
import com.guilbt.tradingsad.controller.exceptions.PreConditionException;
import com.guilbt.tradingsad.controller.exceptions.NegocioException;
import com.guilbt.tradingsad.model.dto.CampoErroDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@ControllerAdvice
public class CustomExceptionAdvice implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException, ServletException {
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Falha na autenticação");
    }

    @ExceptionHandler (value = {AccessDeniedException.class})
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AccessDeniedException accessDeniedException) throws IOException {
        response.sendError(HttpServletResponse.SC_FORBIDDEN, "Falha na autorização: " + accessDeniedException.getMessage());
    }

    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<String> handleConflictException
            (ConflictException e, HttpServletRequest request) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler(PreConditionException.class)
    public ResponseEntity<CampoErroDTO> handlePreConditionException
            (PreConditionException e, HttpServletRequest request) {
        CampoErroDTO campoErroDTO = new CampoErroDTO(e.getCampo(), e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(campoErroDTO);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<String> handleNotFoundException
            (NotFoundException e, HttpServletRequest request) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(NegocioException.class)
    public ResponseEntity<String> handleUntreatedCaseException
            (NegocioException e, HttpServletRequest request) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
}
