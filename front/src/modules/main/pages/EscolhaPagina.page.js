import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PainelCard from '../components/PainelCard';
import Container from '../../../components/Container';
import PainelSelecao from '../components/PainelSelecao';
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
    title: 'Cadastro Pessoas',
    route: MAIN_URL_PATTERNS.CADASTRO,
    backgroundColor: colors.purple,
  },

//   {
//     title: 'Consulta Pessoas',
//     route: MAIN_URL_PATTERNS.CONSULTA,
//     backgroundColor: colors.blue,
//   },
];

function EscolhaPagina({ history }) {
  return (
    <StyledContainer>
      <PainelSelecao>
        {
              rotinas.map(
                rotina => (
                  <PainelCard
                    {...rotina}
                    key={rotina.route}
                    onClick={() => history.push(rotina.route)}
                  />
                )
              )
          }
      </PainelSelecao>
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
