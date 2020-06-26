import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import './App.css';
import WarningFactory from './components/WarningFactory';
import BaseRouter from './BaseRouter';
import { colors } from './styles';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  justify-content: center;
  align-items: flex-start;
  padding-top: 70px;
  margin-bottom: 70px;
  background-color: ${colors.grayLight2};
`;

const StyledAppDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 1262px;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <Container>
      <StyledAppDiv>
        <BrowserRouter key="browser" basename="/#">
          <Route key="base" component={BaseRouter} path="/" />
        </BrowserRouter>
      </StyledAppDiv>
      <WarningFactory />
    </Container>
  );
}

export default App;
