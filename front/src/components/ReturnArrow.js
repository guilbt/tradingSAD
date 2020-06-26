import React from 'react';
import styled from 'styled-components';
import {
  colors,
} from '../styles';
import SvgIcon, { ICONS_CONSTS } from './SvgIcon';

const StyledA = styled.a`
    left: 10px;
    top: 0px;
    
    position: absolute;
    text-align: center;
    font-size: 28px;
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const StyledArrowIcon = styled(SvgIcon).attrs({ type: ICONS_CONSTS.setaEsquerda })`
    transition: .4s;
    margin-top: 10px;
    &:hover {
        fill: ${colors.grayDark};
        margin-top: 5px;
    }
`;

const ReturnArrow = props => (
  <StyledA {...props}>
    <StyledArrowIcon />
  </StyledA>
);

export default ReturnArrow;
