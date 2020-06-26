import webservice from '../webservice';

const ativosWebservice = props => webservice({ baseEndpoint: '/ativos', ...props });
export default class AtivosController {
  static async postInvestir(ativoId, valor) {
    return ativosWebservice().post(`/${ativoId}/investir`, valor);
  }

  static async getPorValor(valor) {
    return ativosWebservice().get(`?valor=${valor}`);
  }

  static async getInformacoesPorSimbolo(simbolo) {
    return ativosWebservice().get(`/simbolo/${simbolo}`);
  }
}
