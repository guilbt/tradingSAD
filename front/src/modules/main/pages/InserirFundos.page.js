import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container } from '../../../components/Container';
import StyledButton from '../../../components/StyledButton';
import StyledParagraph from '../../../components/Paragraph';
import Row from '../../../components/Row';
import CampoLineWrapper from '../components/CampoLineWrapper';
import CurrencyInput from '../../../components/CurrencyInput.tsx';
import { colors } from '../../../styles';
import CarteiraController from '../../../controllers/Carteira.controller';
import { dispatchCustomWarning } from '../../../helpers/warningDispatcher';
import { StyledLoadingLogo } from '../../../components/StyledLoadingLogo';
import { $formatarUSD } from '../util/currencyUtil';
import ReturnArrow from '../../../components/ReturnArrow';

const StyledContainer = styled(Container)`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.grayLight};
`;

const StyledRow = styled(Row)`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: fit-content;
  justify-content: center;
  margin-bottom: 20px;
  justify-content: center;
`;

const StyledCurrencyInput = styled(CurrencyInput)`
  width: 300px;
  height: 40px;
  cursor: text;
`;

class InserirFundos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      fundosInt: 0,
    };
  }

  setFundosInt = value => this.setState({
    fundosInt: value,
  });

  setIsLoading = isLoading => {
    this.setState({
      isLoading,
    });
  }

  irParaEscolhaDePaginas = () => this.props.history.push('/main');

  irParaBuscaAtivos = () => this.props.history.push('/busca-ativos');

  handleInserirClick = () => {
    const { fundosInt } = this.state;
    this.setIsLoading(true);
    const fundosFloat = fundosInt / 100;
    CarteiraController.putFundos(fundosFloat).then(
      () => {
        const fundosFormatadoDisplay = $formatarUSD(fundosFloat);
        const FundosInseridosWarning = {
          type: 'success',
          name: `Valor ${fundosFormatadoDisplay} inserido com sucesso`,
          message: 'Invista em um novo ativo',
        };
        dispatchCustomWarning(FundosInseridosWarning);
        this.props.setFundos(fundosFloat);
        this.irParaBuscaAtivos();
      }
    ).catch(
      error => {
        if (error?.response) {
          if (error.response.status === 400) {
            const ErrorWarning = {
              type: 'error',
              name: `Campo ${error.response.data.campo} com erro`,
              message: `${error.response.data.erro}`,
            };
            dispatchCustomWarning(ErrorWarning);
          }
        }
      }
    );
  }

  render() {
    const { history } = this.props;
    const { fundosInt, isLoading } = this.state;

    const isFinished = (fundosInt != 0);

    return (
      <StyledContainer>
        <ReturnArrow onClick={this.irParaEscolhaDePaginas} />
        <h1> Inserir valor na carteira </h1>
        <StyledParagraph>
          Apenas valores positivos
        </StyledParagraph>
        <CampoLineWrapper desc="Valor (em dollares):">
          <StyledCurrencyInput
            onValueChange={this.setFundosInt}
            value={fundosInt}
          />
        </CampoLineWrapper>
        <StyledRow>
          <StyledButton tabIndex={1} disabled={!isFinished} onClick={this.handleInserirClick}>
            Inserir
          </StyledButton>
        </StyledRow>
        {isLoading && <StyledLoadingLogo />}
      </StyledContainer>
    );
  }
}

InserirFundos.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  setFundos: PropTypes.func.isRequired,
};

export default InserirFundos;
