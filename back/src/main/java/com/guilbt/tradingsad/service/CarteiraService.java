package com.guilbt.tradingsad.service;

import com.guilbt.tradingsad.dao.AtivoUsuarioDAO;
import com.guilbt.tradingsad.dao.AtivosDAO;
import com.guilbt.tradingsad.dao.UsuariosDAO;
import com.guilbt.tradingsad.model.Usuario;
import com.guilbt.tradingsad.model.dto.AtivoInvestidoDTO;
import com.guilbt.tradingsad.model.dto.CarteiraDTO;
import com.guilbt.tradingsad.model.dto.alphaVantage.AtivoValoresDTO;
import com.guilbt.tradingsad.service.client.AlphaVantageClient;
import com.guilbt.tradingsad.util.PreConditions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;


@Service
@Scope("singleton")
public class CarteiraService {
    private AtivoUsuarioDAO ativoUsuarioDAO;
    private UsuariosDAO usuariosDAO;

    @Autowired
    public CarteiraService(
        AtivoUsuarioDAO ativoUsuarioDAO,
        UsuariosDAO usuariosDAO
    ) {
        this.ativoUsuarioDAO = ativoUsuarioDAO;
        this.usuariosDAO = usuariosDAO;
    }

    @Transactional
    public void inserirFundos(BigDecimal fundos, String principalEmail) {
        PreConditions.notNull(fundos, "fundos");
        Usuario usuario = usuariosDAO.getByEmail(principalEmail);
        usuario.setFundos(fundos);
        usuariosDAO.merge(usuario);
    }

    @Transactional
    public CarteiraDTO buscar(String principalEmail) {
        Usuario usuario = usuariosDAO.getByEmail(principalEmail);
        List<AtivoInvestidoDTO> ativos = ativoUsuarioDAO.getAtivosInvestidosByUsuario(usuario.getId());
        for(AtivoInvestidoDTO ativo : ativos) {
            AlphaVantageClient client = new AlphaVantageClient();
            AtivoValoresDTO ativoValoresDTO = client.getInformacoesPorSimbolo(ativo.getSimbolo());
            ativo.setValorTotal(ativoValoresDTO.getPreco().multiply(ativo.getQuantidade()).setScale(4, RoundingMode.HALF_EVEN));
        }
        return new CarteiraDTO(usuario.getFundos(), ativos);
    }
}
