import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Row from '../../../components/Row';
import colors from '../../../styles/colors';

const StyledRow = styled(Row)`
  align-items: flex-start;
  margin-bottom: 30px;
`;

const StyledLabel = styled.label`
    flex: 1 1 50px;
    text-align: end;
    color: ${colors.blueDark};
    word-wrap: break-word;
    margin-top: 10px;
    margin-right: 50px;
    font-size: 16px;
    font-weight: 900;
`;

export default function CampoLineWrapper({
  campo, children,
}) {
  return (
    <StyledRow>
      <StyledLabel>
        {campo.desc}
        {campo.isRequired && '(*)'}
        :
      </StyledLabel>
      {children}
    </StyledRow>
  );
}

CampoLineWrapper.propTypes = {
  campo: PropTypes.shape({
    desc: PropTypes.string.isRequired,
    help: PropTypes.string.isRequired,
    helpExample: PropTypes.string,
    isRequired: PropTypes.bool,
  }).isRequired,
  children: PropTypes.element.isRequired,
};
