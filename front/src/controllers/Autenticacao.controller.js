import webservice from '../webservice';
import URL_PATTERNS from '../urlPatterns';

const autenticacaoWebservice = () => webservice();
export default class AutenticacaoController {

  static async login(email, senha) {
    const form = new FormData();
    form.append('username', email);
    form.append('password', senha);
    return autenticacaoWebservice().post('/login', form);
  }

  static async getEmail() {
    return autenticacaoWebservice().get('/email');
  }

  static async logout() {
    window.location.href = (`/#${URL_PATTERNS.LOGIN}`);
    await autenticacaoWebservice().post('/logout');
  }
}
