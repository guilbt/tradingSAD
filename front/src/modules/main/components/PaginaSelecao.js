import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  breakpoints,
} from '../../../styles';

const StyledGrid = styled.div`
  flex: 1;
  flex-direction: row;
  display: grid;
  grid-template-columns: repeat(auto-fill, ${({ columnSize }) => columnSize});
  flex-flow: row wrap;
  grid-gap: 1rem;
  ${breakpoints.xsDown} {
    grid-template-columns: repeat(auto-fill, 100%);
  }
`;

const PaginaSelecao = ({
  columnSize,
  children,
  style,
  containerStyle,
  containerProps,
  ...props
}) => (
  <StyledGrid
    columnSize={columnSize}
    style={style}
    {...props}
  >
    {children}
  </StyledGrid>
);

PaginaSelecao.defaultProps = {
  columnSize: '248px',
  style: {},
  containerStyle: {},
  containerProps: {},
};

PaginaSelecao.propTypes = {
  columnSize: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(
      PropTypes.element
    ),
  ]).isRequired,
  style: PropTypes.shape({}),
  containerStyle: PropTypes.shape({}),
  containerProps: PropTypes.shape({}),
};

export default PaginaSelecao;
