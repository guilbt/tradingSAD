import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledFlexBox = styled.div`
  flex: 1;
  flex-direction: row;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
`;

const AtivosSelecao = ({
  children,
  ...props
}) => (
  <StyledFlexBox
    {...props}
  >
    {children}
  </StyledFlexBox>
);

AtivosSelecao.defaultProps = {
};

AtivosSelecao.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(
      PropTypes.element
    ),
  ]).isRequired,
};

export default AtivosSelecao;

