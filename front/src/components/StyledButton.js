import styled from 'styled-components';
import {
  colors,
  shadows,
  breakpoints,
} from '../styles';

const StyledButton = styled.button`
  font-weight: 600;
  font-size: 16px;
  height: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.white};
  box-shadow: ${shadows.small};
  background-color: ${({ disabled }) => (disabled ? colors.grayMedium : colors.green)};
  padding: 20px;
  border-radius: 7px;
  border: 0;
  transition: .2s ease-out;
  // text-transform: uppercase;
  white-space: normal;
  word-wrap: break-word;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  :hover {
    box-shadow: ${({ disabled }) => (disabled ? shadows.small : shadows.big)};
  }
  ${breakpoints.mdDown} {
    height: 38px;
  }
`;

export default StyledButton;
