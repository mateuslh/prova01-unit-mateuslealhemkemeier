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
});