import NotImplementedException from '../util/notImplementedException';

export default class IObserver {
  // importante lembrar que o [update] é responsável por gerenciar seus erros/exceptions
  // nao deve-se ter await no notify porque a responsabilidade do notify é só emitir eventos
  // só notificar todo mundo
  update({ id, userName }) {
    throw new NotImplementedException(this.update.name);
  }
}
