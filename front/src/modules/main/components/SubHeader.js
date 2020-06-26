import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  breakpoints,
  headerSizes,
  colors,
} from '../../../styles';
import { StyledLoadingLogo } from '../../../components/StyledLoadingLogo';
import StyledButton from '../../../components/StyledButton';
import AutenticacaoController from '../../../controllers/Autenticacao.controller';
import { $formatarUSD } from '../util/currencyUtil';

const StyledView = styled.div`
  background-color: ${colors.grayDark2};
  padding: 0px 20px;
  width: 100%;
  height: calc(${headerSizes.desktopHeight} - 20px);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: calc(10px + 2vmin);
  color: white;
  ${breakpoints.mdDown}{
    height: calc(${headerSizes.desktopHeight} - 20px);
  }
`;

const StyledLogoutButton = styled(StyledButton)`
  font-size: 0.67em;
  padding-left: 20px;
  background-color: ${colors.grayDark2};
  margin-bottom: 0px;
  padding: 0.4rem 0.8rem;
  height: 100%;
`;

const SubHeader = ({ email, fundos }) => (
  <StyledView>
    {
      email
        ? (
          <>
            <h5>
              {`Conectado como: ${email}`}
            </h5>
            <h5>
              Fundos:
              {' '}
              {$formatarUSD(fundos)}
            </h5>
          </>
        )
        : <StyledLoadingLogo />
    }
    <StyledLogoutButton
      title="Sair"
      onClick={() => AutenticacaoController.logout()}
    >
      Sair
    </StyledLogoutButton>
  </StyledView>
);

SubHeader.propTypes = {
  email: PropTypes.string,
  fundos: PropTypes.number,
};

SubHeader.defaultProps = {
  email: null,
  fundos: 0,
};

export default SubHeader;
