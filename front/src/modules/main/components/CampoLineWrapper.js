import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Row from '../../../components/Row';
import colors from '../../../styles/colors';

const StyledRow = styled(Row)`
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 30px;
`;

const CampoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
`;

const StyledLabel = styled.label`
    text-align: end;
    color: ${colors.blueDark};
    word-wrap: break-word;
    margin-top: 10px;
    margin-right: 20px;
    font-size: 16px;
    font-weight: 900;
`;

export default function CampoLineWrapper({
  desc, children,
}) {
  return (
    <StyledRow>
      <StyledLabel>
        {desc}
      </StyledLabel>
      <CampoWrapper>
        {children}
      </CampoWrapper>
    </StyledRow>
  );
}

CampoLineWrapper.propTypes = {
  desc: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
