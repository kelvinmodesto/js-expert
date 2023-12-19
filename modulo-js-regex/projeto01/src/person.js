const { verifySafety } = require('./utils');

class Person {
  constructor([
    name,
    nationality,
    maritalState,
    documentID,
    address,
    number,
    neighborhood,
    state,
  ]) {
    // ^ -> começo da string
    //  + -> um ou mais ocorrencias
    // (\w{1}) -> pega só a primeira letra e deixa em um grupo
    // (a-zA-Z) encontra letras maiusculas ou minusculas, adicionamos o + pra ele pegar todas até o caracter especial
    // g -> todas as ocorrencias que encontrar
    const firstLetterExp = verifySafety(/^(\w{1})([a-zA-Z]+$)/g);
    const formatFirstLetter = (prop) => {
      return prop.replace(
        firstLetterExp,
        (fullMatch, group1, group2, index) => {
          return `${group1.toUpperCase()}${group2.toLowerCase()}`;
        }
      );
    };
    this.name = name;
    this.nationality = formatFirstLetter(nationality);
    this.maritalState = formatFirstLetter(maritalState);
    // tudo que nao for digito vira vazio
    // /g serve para remover todas as ocorrencias que encontrar
    this.documentID = documentID.replace(verifySafety(/\D/g), '');
    // começa a procurar depois do " a " e pega tudo que tem a frente
    // (?<= faz com que ignore tudo que tiver antes desse match)
    // conhecido como positive lookBehind
    this.address = address.match(verifySafety(/(?<=\sa\s).*$/)).join();
    this.number = number;
    this.neighborhood = neighborhood.match(verifySafety(/(?<=\s).*$/)).join();
    this.state = state.replace(verifySafety(/\.$/), '');
  }
}

module.exports = Person;
