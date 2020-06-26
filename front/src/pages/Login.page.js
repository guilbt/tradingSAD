import React, { Component } from 'react';
import styled from 'styled-components';
import AutenticacaoController from '../controllers/Autenticacao.controller';
import {
  dispatchCustomWarning, dispatchCustomUnknownError, dispatchCustomWrongCredError, dispatchSuccessLoginWarning,
} from '../helpers/warningDispatcher';
import { colors, shadows } from '../styles';

import StyledButton from '../components/StyledButton';
import StyledInput from '../components/Input';

const StyledLoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 4px;
    width: 410px;
    background-color: ${colors.white};
    box-shadow: ${shadows.medium};
    padding: 50px;
    margin: 10px;
`;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'usuario@default.com',
      senha: 'pass',
    };
  }

    handleChangeEmail = e => {
      this.setState({ email: e.target.value });
    }

    handleChangePassword = e => {
      this.setState({ senha: e.target.value });
    }

    logar = () => {
      const { email, senha } = this.state;
      if (email === '' || senha === '') {
        dispatchCustomWarning('Preencha devidamente os campos');
        return;
      }
      AutenticacaoController.login(email, senha).then(
        () => {
          dispatchSuccessLoginWarning();
          this.props.history.push('/main');
        }
      ).catch(
        error => {
          if (error.response?.status === 400) {
            dispatchCustomWrongCredError();
          } else {
            dispatchCustomUnknownError();
          }
        }
      );
    }

    checkEnter = e => {
      if (e.keyCode === 13) {
        this.logar();
      }
    }

    render() {
      const { email, senha } = this.state;
      return (
        <StyledLoginContainer>
          <h1>Bem vindo a plataforma de Cadastro</h1>
          <StyledInput autoFocus type="email" placeholder="E-mail" onChange={this.handleChangeEmail} value={email} />
          <StyledInput onKeyDown={this.checkEnter} type="password" placeholder="Senha" onChange={this.handleChangePassword} value={senha} />
          <StyledButton id="btnLogin" onClick={this.logar}>Entrar</StyledButton>
        </StyledLoginContainer>
      );
    }
}
