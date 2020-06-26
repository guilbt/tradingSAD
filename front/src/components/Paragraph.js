import styled from 'styled-components';
import colors from '../styles/colors';

const StyledParagraph = styled.p`
  font-size: 18px;
  color: ${({ color }) => color || colors.black};
  margin-top: 0px;
`;

export default StyledParagraph;
