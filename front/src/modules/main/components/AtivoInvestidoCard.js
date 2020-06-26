import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../../styles/colors';
import shadows from '../../../styles/shadows';
import StyledButton from '../../../components/StyledButton';
import AtivosController from '../../../controllers/Ativos.controller';
import { StyledSmallLoadingLogo } from '../../../components/StyledLoadingLogo';
import { $formatarUSD } from '../util/currencyUtil';
import AtivoCardBottomInfo from './AtivoCardBottomInfo';

const StyledCardDiv = styled.div`
  background-color: ${colors.white};
  height: 300px;
  margin: 10px;
  display: flex;
  flex: 0 0 300px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: ${colors.grayDark};
  border-radius: 5px;
  padding: 10px;
  transition: .2s ease-out;
  :hover {
    box-shadow: ${shadows.medium};
  }
  & > h2 {
    margin-top: 0px;
    margin-bottom: 0px;
  }
  & > h4, h5 {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

function AtivoInvestidoCard({
  nome, simbolo, quantidade,
  precoUnitario, valorTotal,
}) {
  return (
    <StyledCardDiv>
      <h2>
        {nome}
        <br />
        (
        {simbolo}
        )
      </h2>
      <h3>
        Quantidade:
        {' '}
        {quantidade}
      </h3>
      <h3>
        Valor Unitario:
        {' '}
        {$formatarUSD(precoUnitario)}
      </h3>
      <h3>
        Valor Total:
        {' '}
        {$formatarUSD(valorTotal)}
      </h3>
    </StyledCardDiv>
  );
}

AtivoInvestidoCard.defaultProps = {
};

AtivoInvestidoCard.propTypes = {
  nome: PropTypes.string.isRequired,
  simbolo: PropTypes.string.isRequired,
  quantidade: PropTypes.number.isRequired,
  precoUnitario: PropTypes.number.isRequired,
  valorTotal: PropTypes.number.isRequired,
};

export default AtivoInvestidoCard;
