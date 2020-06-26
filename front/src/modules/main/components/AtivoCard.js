import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../../styles/colors';
import shadows from '../../../styles/shadows';
import StyledButton from '../../../components/StyledButton';
import AtivosController from '../../../controllers/Ativos.controller';
import { StyledSmallLoadingLogo } from '../../../components/StyledLoadingLogo';
import { dispatchCustomWarning } from '../../../helpers/warningDispatcher';
import AtivoCardBottomInfo from './AtivoCardBottomInfo';

const StyledCardDiv = styled.div`
  background-color: ${colors.white};
  height: 400px;
  margin: 10px;
  display: flex;
  flex: 0 0 300px;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  color: ${colors.grayDark};
  border-radius: 5px;
  padding: 0px;
  transition: .2s ease-out;
  :hover {
    box-shadow: ${shadows.medium};
  }
  & > h2, h3 {
    margin-top: 0px;
    margin-bottom: 0px;
  }
  & > h4, h5 {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

const StyledCardTextDiv = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;

const StyledBottomButton = styled(StyledButton)`
  flex: 0 0 80px;
  margin: 0px;
  width: 100%;
  background-color: ${colors.greenDark};
`;

const vantagensMap = {
  0: 'Grande risco: o ativo está com um dos menos valores no últimos 12 meses, tendendo a subir.',
  1: 'Pequeno risco: o ativo tem tido um crescimento estável nos últimos anos.',
  2: 'Médio risco: o ativo tem tido um grande crescimento, tendo o maior retorno nos últimos 12 meses.',
};

function switchBottomComponent(isLoading, infos, buscarValor, investirFundos) {
  if (isLoading) return <StyledSmallLoadingLogo />;
  if (infos == null) {
    return (
      <StyledBottomButton onClick={buscarValor}>
        Buscar Valor
      </StyledBottomButton>
    );
  }
  return (<AtivoCardBottomInfo {...infos} investirFundos={investirFundos} />);
}

class AtivoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      infos: null,
    };
  }

  setIsLoading = isLoading => this.setState({ isLoading })

  buscarValor = () => {
    const { simbolo } = this.props;
    this.setIsLoading(true);
    AtivosController.getInformacoesPorSimbolo(simbolo).then(response => {
      this.setState({
        infos: response.data,
        isLoading: false,
      });
    }).catch(
      error => {
        const ErrorTratadoWarning = {
          type: 'error',
          name: 'Erro ao buscar valores de ativo',
          message: `${error.response.data}`,
        };
        dispatchCustomWarning(ErrorTratadoWarning);
      }
    );
  }

  render() {
    const {
      nome, simbolo, descricao,
      vantagem, investirEmAtivo,
    } = this.props;
    const { isLoading, infos } = this.state;
    return (
      <StyledCardDiv>
        <StyledCardTextDiv>
          <h2>
            {nome}
            <br />
            (
            {simbolo}
            )
          </h2>
          <h4>
            {descricao}
          </h4>
          <h5>
            {vantagensMap[vantagem]}
          </h5>
        </StyledCardTextDiv>
        {switchBottomComponent(isLoading, infos, this.buscarValor, investirEmAtivo)}
      </StyledCardDiv>
    );
  }
}

AtivoCard.defaultProps = {
};

AtivoCard.propTypes = {
  id: PropTypes.number.isRequired,
  nome: PropTypes.string.isRequired,
  simbolo: PropTypes.string.isRequired,
  descricao: PropTypes.string.isRequired,
  vantagem: PropTypes.number.isRequired,
  investirEmAtivo: PropTypes.func.isRequired,
};

export default AtivoCard;
