import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../../styles/colors';
import shadows from '../../../styles/shadows';

const StyledDiv = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor};
  height: 200px;
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
  border-radius: 5px;
  cursor: pointer;
  padding: 10px;
  transition: .2s ease-out;
  :hover{
    box-shadow: ${shadows.medium};
  }
`;

const StyledParagraph = styled.p`
  font-size: 28px;
  font-family: PtSansBold;
  transition: .2s ease-out;
`;

const PaginaCard = ({
  title, backgroundColor, onClick,
  textStyle, textProps, ...otherProps
}) => (
  <StyledDiv
    backgroundColor={backgroundColor}
    onClick={onClick}
    {...otherProps}
  >
    <StyledParagraph
      style={textStyle}
      {...textProps}
    >
      {title}
    </StyledParagraph>
  </StyledDiv>
);

PaginaCard.propTypes = {
  title: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  textStyle: PropTypes.shape({}),
  textProps: PropTypes.shape({}),
};

PaginaCard.defaultProps = {
  textStyle: {},
  textProps: {},
};

export default PaginaCard;
