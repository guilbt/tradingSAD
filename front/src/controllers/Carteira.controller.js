import webservice from '../webservice';

const carteiraWebservice = props => webservice({ baseEndpoint: '/carteira', ...props });
export default class CarteiraController {
  static async putFundos(valor) {
    return carteiraWebservice().put('/fundos', valor);
  }

  static async getInfos() {
    return carteiraWebservice().get('/infos');
  }

  static async get() {
    return carteiraWebservice().get('');
  }
}
