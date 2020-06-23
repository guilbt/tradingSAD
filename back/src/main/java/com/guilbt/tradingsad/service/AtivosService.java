package com.guilbt.tradingsad.service;

import com.guilbt.tradingsad.controller.exceptions.PreConditionException;
import com.guilbt.tradingsad.dao.AtivoUsuarioDAO;
import com.guilbt.tradingsad.dao.AtivosDAO;
import com.guilbt.tradingsad.dao.UsuariosDAO;
import com.guilbt.tradingsad.model.Ativo;
import com.guilbt.tradingsad.model.Usuario;
import com.guilbt.tradingsad.model.UsuarioAtivo;
import com.guilbt.tradingsad.model.dto.AtivoDTO;
import com.guilbt.tradingsad.model.dto.AtivoValoresTratadoDTO;
import com.guilbt.tradingsad.model.dto.alphaVantage.AtivoValoresDTO;
import com.guilbt.tradingsad.model.dto.alphaVantage.AtivoValoresDTOWrapper;
import com.guilbt.tradingsad.service.client.AlphaVantageClient;
import com.guilbt.tradingsad.util.PreConditions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@Scope("singleton")
public class AtivosService {
    private AtivosDAO ativosDAO;
    private UsuariosDAO usuariosDAO;
    private AtivoUsuarioDAO ativoUsuarioDAO;

    @Autowired
    public AtivosService(
        AtivosDAO ativosDAO,
        UsuariosDAO usuariosDAO,
        AtivoUsuarioDAO ativoUsuarioDAO
    ) {
        this.ativosDAO = ativosDAO;
        this.usuariosDAO = usuariosDAO;
        this.ativoUsuarioDAO = ativoUsuarioDAO;
    }

    @Transactional
    public void investirValor(Long ativoId, BigDecimal valor, String principalEmail) {
        PreConditions.notNull(valor, "valor");
        PreConditions.notNull(ativoId, "ativoId");
        Usuario usuario = usuariosDAO.getByEmail(principalEmail);
        if(usuario.getFundos().compareTo(valor) < 0) {
            throw new PreConditionException(
                    "Valor",
                    "Valor a ser investido não pode ser maior que os fundos disponíveis do usuário"
            );
        }
        Ativo ativo = Optional.of(ativosDAO.recuperar(ativoId))
            .orElseThrow(
                () -> new PreConditionException(
                    "Ativo",
                    "Id do Ativo tem que ser válido"
            )
        );
        AtivoValoresDTO valores = this.buscarInformacoesPorSimbolo(ativo.getSimbolo());
        Long usuarioId = usuario.getId();
        BigDecimal quantidadeComprada = valor.divide(valores.getPreco(), 4, RoundingMode.HALF_EVEN);
        UsuarioAtivo usuarioAtivo = ativoUsuarioDAO.recuperar(usuarioId, ativoId);
        if(usuarioAtivo == null) {
            usuarioAtivo = new UsuarioAtivo(usuarioId, ativoId, quantidadeComprada);
            ativoUsuarioDAO.persist(usuarioAtivo);
        } else {
            usuarioAtivo.setQuantidade(
                usuarioAtivo.getQuantidade().add(quantidadeComprada)
            );
            ativoUsuarioDAO.merge(usuarioAtivo);
        }
        BigDecimal valorGasto = quantidadeComprada.multiply(valores.getPreco()).setScale(4, RoundingMode.HALF_EVEN);
        usuario.setFundos(usuario.getFundos().subtract(valorGasto));
        usuariosDAO.merge(usuario);
    }

    public List<AtivoDTO> buscarPorValor(BigDecimal valor) {
        PreConditions.notNull(valor, "valor");
        if(valor.compareTo(BigDecimal.ZERO) <= 0) {
            throw new PreConditionException(
                "Valor",
                "Valor a ser buscado tem que ser positivo"
            );
        }
        List<Ativo> ativos = ativosDAO.recuperarAtivosPorValor(valor);
        return ativos.stream().map(
            ativo -> new AtivoDTO(ativo)
        ).collect(Collectors.toList());
    }

    public AtivoValoresDTO buscarInformacoesPorSimbolo(String simbolo) {
        PreConditions.notNull(simbolo, "simbolo");
        AlphaVantageClient client = new AlphaVantageClient();
        return client.getInformacoesPorSimbolo(simbolo);
    }
}
