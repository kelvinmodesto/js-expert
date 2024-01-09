import {
  NotImplementedException,
  NotValidException,
} from '../../util/exceptions.js';

export default class BaseBusiness {
  _validateFields(data) {
    throw new NotImplementedException(this._validateFields.name);
  }
  _create(data) {
    throw new NotImplementedException(this._create.name);
  }
  /*
    Padrao do Martin Fowler
    a proposta do padrao é garantir um fluxo de métodos, definindo uma sequencia a ser
    executada

    esse create é a implementação efetiva do Template Method
    */
  create(data) {
    const isValid = this._validateFields(data);
    if (!isValid) throw new NotValidException(this._validateFields.name);

    return this._create(data);
  }
}
