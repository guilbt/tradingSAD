import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../../styles';

const CadastroCheckButtonWrapper = styled.li`
  display: flex;
  align-items: center;
`;

const CadastroCheckButtonLabel = styled.span`
  font-size: 16px;
  color: ${colors.black};
  margin-left: 6px;
`;

const CadastroCheckButtonPressableWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    // padding: px;
    background-color: ${colors.white};
    border-radius: 7px;
    :hover {
        box-shadow: 0px 3px 6px #00000029;
        > div {
          opacity: 1;
        }
    }

`;

const CadastroCheckButtonPressable = styled.div`
    width: 20px;
    height: 20px;
    opacity: 0;
    margin: 0px;
    transition: opacity .4s;
    border-radius: 6px;
    cursor: pointer;
    background-color: ${colors.grayDark3};
`;

const CadastroCheckButtonPressableChecked = styled(CadastroCheckButtonPressable)`
    background-color: ${colors.blueDark};
    opacity: 1;
`;

export default function CadastroCheckButton({ value, selectedValue, onClick }) {
  const ComponenteCheckButtonPressable = (
    (value === selectedValue) ? CadastroCheckButtonPressableChecked : CadastroCheckButtonPressable
  );
  return (
    <CadastroCheckButtonWrapper onClick={onClick}>
      <CadastroCheckButtonPressableWrapper>
        <ComponenteCheckButtonPressable />
      </CadastroCheckButtonPressableWrapper>
      <CadastroCheckButtonLabel>
        {value}
      </CadastroCheckButtonLabel>
    </CadastroCheckButtonWrapper>
  );
}

CadastroCheckButton.propTypes = {
  value: PropTypes.string.isRequired,
  selectedValue: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

CadastroCheckButton.defaultProps = {
  selectedValue: '',
};
