import webservice from '../webservice';

const pessoasWebservice = props => webservice({ baseEndpoint: '/pessoas', ...props });
export default class PessoasController {
  static async postCriar(pessoa) {
    console.log(pessoa);
    return pessoasWebservice().post('', pessoa);
  }

}
