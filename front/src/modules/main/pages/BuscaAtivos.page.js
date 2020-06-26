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
import PaginaSelecao from '../components/PaginaSelecao';
import AtivosController from '../../../controllers/Ativos.controller';
import AtivosSelecao from '../components/AtivosSelecao';
import AtivoCard from '../components/AtivoCard';

const StyledContainer = styled(Container)`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.grayLight};
`;

class BuscaAtivos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      ativos: [],
    };
  }

  setIsLoading = isLoading => {
    this.setState({
      isLoading,
    });
  }

  irParaInserirFundos = () => this.props.history.push('/inserir-fundos');

  componentDidMount = () => {
    const { fundos } = this.props;
    if (fundos <= 0) {
      dispatchCustomWarning({
        type: 'error',
        name: 'Valor de Fundos',
        message: 'Precisam ser positivos para busca de ativos',
      });
      this.irParaInserirFundos();
      return;
    }
    AtivosController.getPorValor(fundos)
      .then(
        response => {
          this.setState({
            ativos: response.data,
            isLoading: false,
          });
        }
      );
  }

  irParaEscolhaDePaginas = () => this.props.history.push('/');

  irParaCarteira = () => this.props.history.push('/carteira');

  investirFundosEmAtivo = ativo => {
    const { fundos } = this.props;
    this.setIsLoading(true);
    AtivosController.postInvestir(ativo.id, fundos).then(
      () => {
        const fundosFormatadoDisplay = $formatarUSD(fundos);
        const InvestimentoSucessWarning = {
          type: 'success',
          name: `Valor ${fundosFormatadoDisplay} investido `,
          message: `Incrementado ao ativo ${ativo.nome}, verifique sua carteira`,
        };
        dispatchCustomWarning(InvestimentoSucessWarning);
        this.props.setFundos(0);
        this.irParaCarteira();
      }
    ).catch(
      error => {
        const ErrorTratadoWarning = {
          type: 'error',
          name: 'Erro ao investir em ativo',
          message: `${error.response.data}`,
        };
        dispatchCustomWarning(ErrorTratadoWarning);
      }
    );
  }

  render() {
    const { fundos } = this.props;
    const { isLoading, ativos } = this.state;
    const fundosFormatado = $formatarUSD(fundos);
    return (
      <StyledContainer>
        <ReturnArrow onClick={this.irParaEscolhaDePaginas} />
        {isLoading
          ? (
            <div>

              <h2>
                Carregandos ativos recomendos para o valor de:
                {' '}
                {fundosFormatado}
              </h2>
              <StyledLoadingLogo />
            </div>
          )
          : (
            <>
              <h1>
                Ativos Recomendados para
                {' '}
                {fundosFormatado}
              </h1>
              <AtivosSelecao>
                {ativos.map(
                  ativo => (<AtivoCard key={ativo.id} {...ativo} investirEmAtivo={() => this.investirFundosEmAtivo(ativo)} />)
                )}
              </AtivosSelecao>
            </>
          )}

      </StyledContainer>
    );
  }
}

BuscaAtivos.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  setFundos: PropTypes.func.isRequired,
};

export default BuscaAtivos;
