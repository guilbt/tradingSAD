import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AutenticacaoController from '../../controllers/Autenticacao.controller';
import URL_PATTERNS from '../../urlPatterns';
import CarteiraController from '../../controllers/Carteira.controller';
import { StyledLoadingLogo } from '../../components/StyledLoadingLogo';
import SubHeader from './components/SubHeader';
import MAIN_URL_PATTERNS from './mainUrlPatterns';
import EscolhaPagina from './pages/EscolhaPagina.page';
import InserirFundos from './pages/InserirFundos.page';
import BuscaAtivos from './pages/BuscaAtivos.page';
import Carteira from './pages/Carteira.page';

class MainRouter extends React.Component {
    state = {
      email: null,
      fundos: 0,
      isLoading: true,
    };

    componentDidMount = () => {
      CarteiraController.getInfos()
        .then(
          response => {
            this.setState({
              email: response.data.email,
              fundos: response.data.fundos,
              isLoading: false,
            });
          }
        );
    }

    setFundos = fundos => this.setState({
      fundos,
    })

    render() {
      const { email, fundos, isLoading } = this.state;
      return (
        <>
          <SubHeader email={email} fundos={fundos} />
          {
            isLoading
              ? (
                <div>
                  <h1> Tentando conectar com o servidor... </h1>
                  <StyledLoadingLogo />
                </div>
              )
              : (
                <Switch>
                  <Route
                    path={MAIN_URL_PATTERNS.INSERIR_FUNDOS}
                    render={props => <InserirFundos {...props} setFundos={this.setFundos} />}
                  />
                  <Route
                    path={MAIN_URL_PATTERNS.BUSCA_ATIVOS}
                    render={props => <BuscaAtivos {...props} fundos={fundos} setFundos={this.setFundos} />}
                  />
                  <Route
                    path={MAIN_URL_PATTERNS.CARTEIRA}
                    component={Carteira}
                  />
                  <Route
                    path={URL_PATTERNS.BASE}
                    component={EscolhaPagina}
                  />
                </Switch>
              )
          }

        </>
      );
    }
}

export default MainRouter;
