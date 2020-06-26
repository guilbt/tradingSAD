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
import AtivoInvestidoCard from '../components/AtivoInvestidoCard';

const StyledContainer = styled(Container)`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.grayLight};
`;

class Carteira extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      carteira: {
        valorTotalInvestido: 0,
        fundos: 0,
        ativos: [],
      },
    };
  }

  setIsLoading = isLoading => {
    this.setState({
      isLoading,
    });
  }

  irParaEscolhaDePaginas = () => this.props.history.push('/');

  componentDidMount = () => {
    const { fundos } = this.props;
    CarteiraController.get()
      .then(
        response => {
          this.setState({
            carteira: response.data,
            isLoading: false,
          });
        }
      ).catch(
        error => {
          const ErrorTratadoWarning = {
            type: 'error',
            name: 'Erro ao buscar carteira',
            message: `${error.response.data}`,
          };
          dispatchCustomWarning(ErrorTratadoWarning);
        }
      );
  }

  render() {
    const { isLoading, carteira } = this.state;
    const valorInvestidoFormatado = $formatarUSD(carteira.valorTotalInvestido);
    const fundosFormatado = $formatarUSD(carteira.fundos);
    return (
      <StyledContainer>
        <ReturnArrow onClick={this.irParaEscolhaDePaginas} />
        {isLoading
          ? (
            <div>

              <h2>
                Carregando informações da sua carteira...
              </h2>
              <StyledLoadingLogo />
            </div>
          )
          : (
            <>
              <h1>
                Valor Total Investido:
                {' '}
                {valorInvestidoFormatado}
              </h1>
              <h1>
                Fundos:
                {' '}
                {fundosFormatado}
              </h1>
              <>
                <h1> Ativos </h1>
                <AtivosSelecao>
                  {carteira.ativos.length > 0
                    ? carteira.ativos.map(
                      ativo => (
                        <AtivoInvestidoCard key={ativo.id} {...ativo} investirEmAtivo={() => this.investirFundosEmAtivo(ativo)} />
                      )
                    )
                    : <h1> Você ainda não tem nenhum ativo </h1>}
                </AtivosSelecao>
              </>
            </>
          )}

      </StyledContainer>
    );
  }
}

Carteira.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Carteira;
