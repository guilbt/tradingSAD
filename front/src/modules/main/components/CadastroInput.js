import React from 'react';
import styled from 'styled-components';
import Input from '../../../components/Input';
import { colors } from '../../../styles';
import { camposDefaultPropTypes } from '../util/camposDefaultPropTypes';

const StyledCadastroInput = styled(Input)`
    // width: 100%;
    height: 50px;
    font-size: 16px;
    color: ${colors.blackish};
`;

const CadastroInput = ({
  setValue, id, value, ...otherProps
}) => {
  const onChangeValue = event => setValue(event.target.value, id);
  return (<StyledCadastroInput {...otherProps} onChange={onChangeValue} value={value} />);
};

CadastroInput.propTypes = camposDefaultPropTypes;

export default CadastroInput;
