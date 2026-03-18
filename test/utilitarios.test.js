const Utilitarios = require('../src/utilitarios');

describe('Testes da classe Utilitarios', () => {
    let utilitarios;

    beforeEach(() => {
        utilitarios = new Utilitarios();
    });

    test('Deve inverter uma string corretamente', () => {
        expect(utilitarios.inverterString('hello')).toBe('olleh');
    });

    test('Deve contar os caracteres de uma string corretamente', () => {
        expect(utilitarios.contarCaracteres('hello')).toBe(5);
    });

    test('Deve converter uma string para maiúsculas corretamente', () => {
        expect(utilitarios.paraMaiusculas('hello')).toBe('HELLO');
    });

    test('Deve converter uma string para minúsculas corretamente', () => {
        expect(utilitarios.paraMinusculas('HELLO')).toBe('hello');
    });

    test('Deve colocar a primeira letra de uma string em maiúscula corretamente', () => {
        expect(utilitarios.primeiraLetraMaiuscula('hello')).toBe('Hello');
    });

    test('Deve somar dois números corretamente', () => {
        expect(utilitarios.somar(2, 3)).toBe(5);
    });

    test('Deve subtrair dois números corretamente', () => {
        expect(utilitarios.subtrair(5, 2)).toBe(3);
    });

    test('Deve multiplicar dois números corretamente', () => {
        expect(utilitarios.multiplicar(2, 3)).toBe(6);
    });

    test('Deve dividir dois números corretamente', () => {
        expect(utilitarios.dividir(6, 2)).toBe(3);
    });

    test('Deve lançar um erro ao tentar dividir por zero', () => {
        expect(() => utilitarios.dividir(6, 0)).toThrow('Divisão por zero');
    });

    test('Deve verificar se um número é par corretamente', () => {
        expect(utilitarios.ehPar(4)).toBe(true);
        expect(utilitarios.ehPar(5)).toBe(false);
    });

    test('Deve retornar o primeiro elemento de um array corretamente', () => {
        expect(utilitarios.primeiroElemento([1, 2, 3])).toBe(1);
    });

    test('Deve retornar o último elemento de um array corretamente', () => {
        expect(utilitarios.ultimoElemento([1, 2, 3])).toBe(3);
    });

    test('Deve retornar o tamanho de um array corretamente', () => {
        expect(utilitarios.tamanhoArray([1, 2, 3])).toBe(3);
    });

    test('Deve ordenar um array corretamente', () => {
        expect(utilitarios.ordenarArray([3, 1, 2])).toEqual([1, 2, 3]);
    });

    test('Deve inverter um array corretamente', () => {
        expect(utilitarios.inverterArray([1, 2, 3])).toEqual([3, 2, 1]);
    });

    test('Deve gerar um número aleatório corretamente', () => {
        const random = utilitarios.gerarNumeroAleatorio();
        expect(random).toBeGreaterThanOrEqual(0);
        expect(random).toBeLessThan(100);
    });

    test('Deve verificar se um valor é número corretamente', () => {
        expect(utilitarios.ehNumero(42)).toBe(true);
        expect(utilitarios.ehNumero('hello')).toBe(false);
        expect(utilitarios.ehNumero(NaN)).toBe(false);
    });

    test('Deve remover espaços do início e fim de uma string', () => {
        expect(utilitarios.removerEspacos('  hello  ')).toBe('hello');
    });

    test('Deve repetir um texto corretamente', () => {
        expect(utilitarios.repetirTexto('ab', 3)).toBe('ababab');
    });

    test('Deve juntar um array com separador', () => {
        expect(utilitarios.juntarArray([1, 2, 3])).toBe('1,2,3');
        expect(utilitarios.juntarArray([1, 2, 3], '-')).toBe('1-2-3');
    });

    test('Deve contar palavras de uma string', () => {
        expect(utilitarios.contarPalavras('hello world foo')).toBe(3);
    });

    test('Deve calcular a média de um array', () => {
        expect(utilitarios.mediaArray([2, 4, 6])).toBe(4);
        expect(utilitarios.mediaArray([])).toBe(0);
    });

    test('Deve remover duplicados de um array', () => {
        expect(utilitarios.removerDuplicados([1, 2, 2, 3, 3])).toEqual([1, 2, 3]);
    });

    test('Deve verificar se uma string é palíndromo', () => {
        expect(utilitarios.ehPalindromo('arara')).toBe(true);
        expect(utilitarios.ehPalindromo('hello')).toBe(false);
    });

    test('Deve mesclar dois objetos corretamente', () => {
        expect(utilitarios.mesclarObjetos({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
    });

});