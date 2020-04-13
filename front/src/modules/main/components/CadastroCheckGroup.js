import React from 'react';
import styled from 'styled-components';
import { camposDefaultPropTypes } from '../util/camposDefaultPropTypes';
import CadastroCheckButton from './CadastroCheckButton';

const CheckGroupWrapper = styled.ul`
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin: 0px;
    margin-top: 10px;
    padding-left: 0px;
    & > * {
        margin-right: 30px;
        margin-bottom: 0px;
    }
    & > :last-child {
        margin-right: 0px;
    }
`;

export default function CadastroCheckGroup({
  options, value, setValue, id,
}) {
  return (
    <CheckGroupWrapper>
      {options.map(
        option => (
          <CadastroCheckButton
            key={`cadastro-checkbutton-${option}`}
            value={option}
            selectedValue={value}
            onClick={() => setValue(option, id)}
          />
        )
      )}
    </CheckGroupWrapper>
  );
}

CadastroCheckGroup.propTypes = camposDefaultPropTypes;
