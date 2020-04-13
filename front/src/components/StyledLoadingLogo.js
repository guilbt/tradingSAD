import styled from 'styled-components';
import logo from '../logo.svg';

const StyledLoadingLogo = styled.img`
  animation: App-logo-spin infinite 5s linear;
  height: 50px;
  pointer-events: none;
  width: 50px;
  resize: contain;
`;

StyledLoadingLogo.defaultProps = {
  src: logo,
  alt: 'logo',
};

const StyledSmallLoadingLogo = styled(StyledLoadingLogo)`
  height: 32px;
  width: 32px;
`;

export {
  StyledSmallLoadingLogo,
  StyledLoadingLogo,
};
