import styled from 'styled-components';

import {
  breakpoints,
  colors,
  shadows,

} from '../styles';

export const ContainerFluid = styled.div`
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: ${colors.white};
  box-shadow: ${shadows.medium};
  position: relative;
`;

export const Container = styled(ContainerFluid)`
  margin: 0 auto;
  ${breakpoints.xsUp} {
    max-width: 540px;
  }
  ${breakpoints.smUp} {
    max-width: 720px;
    margin-top: 20px;
  }
  ${breakpoints.mdUp} {
    max-width: 960px;
  }
  ${breakpoints.lgUp} {
    max-width: 1140px;
  }
`;

export default Container;
