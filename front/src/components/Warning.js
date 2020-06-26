import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../styles';
import StyledParagraph from './Paragraph';

const StyledWrapperDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-left: 17px;
    padding-right: 17px;
    padding-top: 24px;
    padding-bottom: 24px;
    position: fixed;
    z-index: 11;
    right: 0px;
    background-color: ${({ backgroundColor }) => backgroundColor};
    color: ${colors.white};
    max-width: 50%;
    border-radius: 15px;
    transition: visibility 0.4s, opacity 0.4s linear, bottom 0.6s linear;
    visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
    opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
    bottom: ${({ isVisible }) => (isVisible ? '100px' : '0px')};
    
`;

const StyledHelpParagraph = styled(StyledParagraph)`
  color: ${colors.white};
  font-weight: 300i;
  font-size: 14px;
  margin-top: 0px;
  margin-bottom: 0px;
  line-height: 19px;
  letter-spacing: 0.29px;
  text-align: justify;
`;

const StyledHelpParagraphTitle = styled(StyledHelpParagraph)`
  font-weight: 600;
  letter-spacing: 0.81px;
  padding-right: 20px;
`;

const colorsByType = {
  error: colors.redLight,
  warning: colors.yellowLight,
  success: colors.greenLight,
};

export default function ErrorWarning({
  id, type, message, name, close, timeout,
}) {
  const [isVisible, setVisible] = useState(false);
  const [isStarted, setStarted] = useState(false);

  if (isVisible) {
    setTimeout(() => setVisible(false), timeout);
    setTimeout(() => close(id), (timeout + 600));
  } else if (!isStarted) {
    setTimeout(() => {
      setStarted(true);
      setVisible(true);
    }, 50);
  }

  const backgroundColor = colorsByType[type];
  return (
    <StyledWrapperDiv
      isVisible={isVisible}
      backgroundColor={backgroundColor}
    >
      <StyledHelpParagraphTitle>
        {name}
      </StyledHelpParagraphTitle>
      <StyledHelpParagraph>
        {message}
      </StyledHelpParagraph>

    </StyledWrapperDiv>
  );
}

ErrorWarning.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['error', 'warning', 'success']).isRequired,
  message: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  timeout: PropTypes.number,
};

ErrorWarning.defaultProps = {
  timeout: 2000,
};
