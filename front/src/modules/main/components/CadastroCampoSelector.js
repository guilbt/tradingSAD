import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { camposDefaultPropTypes } from '../util/camposDefaultPropTypes';
import { colors } from '../../../styles';
import CadastroInput from './CadastroInput';
import CadastroCheckGroup from './CadastroCheckGroup';

const CampoWrapper = styled.div`
  flex: 2 0 150px;
  display: flex;
  flex-direction: column;
  height: fit-content;
`;

const CampoError = styled.p`
  color: ${colors.red};
  margin-top: 0px;
  margin-bottom: 0px;
  text-align: left;
`;

const camposPorTipo = {
  input: CadastroInput,
  checkgroup: CadastroCheckGroup,
};

function CampoSelector({ inputType, error, ...otherProps }) {
  const ComponentByType = camposPorTipo[inputType];
  return (
    <CampoWrapper>
      <ComponentByType {...otherProps} />
      { error && (
      <CampoError>
        {' '}
        {error}
        {' '}
      </CampoError>
      ) }
    </CampoWrapper>
  );
}

CampoSelector.propTypes = {
  ...camposDefaultPropTypes,
  inputType: PropTypes.oneOf(Object.keys(camposPorTipo)).isRequired,
};

export default CampoSelector;
