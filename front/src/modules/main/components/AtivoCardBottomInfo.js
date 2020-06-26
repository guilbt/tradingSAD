import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../../styles/colors';
import StyledButton from '../../../components/StyledButton';
import Row from '../../../components/Row';
import { $formatarUSD } from '../util/currencyUtil';

const StyledCardBottomDiv = styled.div`
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  color: ${colors.white};
  border-radius: 5px;
  flex: 0 0 80px;
  width: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const StyledRow = styled(Row)`
  flex: 1 0 0px;
  margin: 0px;
`;

const StyledColText = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor};
  font-weight: bold;
  flex: 1 0 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const StyledBottomButton = styled(StyledButton)`
  flex: 1 0 0px;
  width: 100%;
  padding: 4px;
  border-radius: 0px;
`;

function AtivoCardBottomInfo(
  {
    preco, variacaoPorcentagem,
    investirFundos,
  }
) {
  return (
    <StyledCardBottomDiv>
      <StyledRow>
        <StyledColText backgroundColor={colors.blueLight}>
          Valor:
          {' '}
          {$formatarUSD(preco)}
        </StyledColText>
        <StyledColText backgroundColor={colors.blueDark}>
          Variação:
          {' '}
          {variacaoPorcentagem}
        </StyledColText>
      </StyledRow>
      <StyledBottomButton onClick={investirFundos}>
        Investir Fundos
      </StyledBottomButton>
    </StyledCardBottomDiv>
  );
}

AtivoCardBottomInfo.defaultProps = {
};

AtivoCardBottomInfo.propTypes = {
  preco: PropTypes.number.isRequired,
  variacaoPorcentagem: PropTypes.string.isRequired,
  investirFundos: PropTypes.func.isRequired,
};

export default AtivoCardBottomInfo;
