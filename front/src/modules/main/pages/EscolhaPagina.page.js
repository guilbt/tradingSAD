import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PaginaCard from '../components/PaginaCard';
import Container from '../../../components/Container';
import PaginaSelecao from '../components/PaginaSelecao';
import MAIN_URL_PATTERNS from '../mainUrlPatterns';
import {
  colors,
} from '../../../styles';

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.grayLight};
`;

const rotinas = [
  {
    title: 'Inserir Fundos',
    route: MAIN_URL_PATTERNS.INSERIR_FUNDOS,
    backgroundColor: colors.purple,
  },
  {
    title: 'Buscar Ativos Por Fundos',
    route: MAIN_URL_PATTERNS.BUSCA_ATIVOS,
    backgroundColor: colors.blue,
  },
  {
    title: 'Carteira',
    route: MAIN_URL_PATTERNS.CARTEIRA,
    backgroundColor: colors.blueDark,
  },
];

function EscolhaPagina({ history }) {
  return (
    <StyledContainer>
      <PaginaSelecao>
        {
          rotinas.map(
            rotina => (
              <PaginaCard
                {...rotina}
                key={rotina.route}
                onClick={() => history.push(rotina.route)}
              />
            )
          )
        }
      </PaginaSelecao>
    </StyledContainer>
  );
}

EscolhaPagina.propTypes = {
  history: PropTypes.shape({
    // goBack: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default EscolhaPagina;
