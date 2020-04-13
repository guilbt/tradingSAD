import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AutenticacaoController from '../../controllers/Autenticacao.controller';
import URL_PATTERNS from '../../urlPatterns';
import SubHeader from './components/SubHeader';
import MAIN_URL_PATTERNS from './mainUrlPatterns';
import EscolhaPagina from './pages/EscolhaPagina.page';
import CadastroPessoas from './pages/CadastroPessoas.page';

class MainRouter extends React.Component {
    state = {
      email: null,
    };

    componentDidMount() {
      AutenticacaoController.getEmail()
        .then(
          response => {
            this.setState({
              email: response.data,
            });
          }
        );
    }

    render() {
      const { email } = this.state;
      return (
        <>
          <SubHeader email={email} />
          <Switch>
            <Route
              path={MAIN_URL_PATTERNS.CADASTRO}
              component={CadastroPessoas}
            />
            {/* <Route
              path={MAIN_URL_PATTERNS.CADASTRO}
              component={AtualizarLimiteCliente}
            /> */}
            <Route
              path={URL_PATTERNS.BASE}
              component={EscolhaPagina}
            />
          </Switch>
        </>
      );
    }
}

export default MainRouter;
