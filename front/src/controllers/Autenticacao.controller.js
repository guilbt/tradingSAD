import webservice from '../webservice';
import URL_PATTERNS from '../urlPatterns';

const autenticacaoWebservice = props => webservice({ baseEndpoint: '', ...props });
export default class AutenticacaoController {

  static async login(email, senha) {
    const form = new FormData();
    form.append('username', email);
    form.append('password', senha);
    return autenticacaoWebservice().post('/login', form);
  }

  static async logout() {
    window.location.href = (`/#${URL_PATTERNS.LOGIN}`);
    await autenticacaoWebservice().post('/logout');
  }
}
