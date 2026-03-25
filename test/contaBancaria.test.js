const ContaBancaria = require('../src/contaBancaria');

describe('Testes da classe ContaBancaria', () => {
    let contaBancaria;
    let contaDados;

    beforeEach(() => {
        contaDados = {
            id: 1,
            titular: 'João Silva',
            saldo: 1000,
            limite: 500,
            status: 'ativa',
            atualizadaEm: null,
        };
        contaBancaria = new ContaBancaria(contaDados);
    });

    describe('obterSaldo', () => {
        test('Deve retornar o saldo atual da conta', () => {
            const saldo = contaBancaria.obterSaldo();

            expect(saldo).toBe(1000);
        });
    });

    describe('obterTitular', () => {
        test('Deve retornar o titular da conta', () => {
            const titular = contaBancaria.obterTitular();

            expect(titular).toBe('João Silva');
        });
    });

    describe('obterStatus', () => {
        test('Deve retornar o status da conta', () => {
            const status = contaBancaria.obterStatus();

            expect(status).toBe('ativa');
        });
    });

    describe('estaAtiva', () => {
        test('Deve retornar true quando a conta estiver ativa', () => {
            const resultado = contaBancaria.estaAtiva();

            expect(resultado).toBe(true);
        });

        test('Deve retornar false quando a conta estiver bloqueada', () => {
            contaDados.status = 'bloqueada';

            const resultado = contaBancaria.estaAtiva();

            expect(resultado).toBe(false);
        });
    });

    describe('obterLimite', () => {
        test('Deve retornar o limite da conta', () => {
            const limite = contaBancaria.obterLimite();

            expect(limite).toBe(500);
        });
    });

    describe('depositar', () => {
        test('Deve depositar valor positivo e atualizar saldo', () => {
            const valorDeposito = 200;

            const resultado = contaBancaria.depositar(valorDeposito);

            expect(resultado).toBe(true);
            expect(contaBancaria.obterSaldo()).toBe(1200);
        });

        test('Deve atualizar a data ao depositar com sucesso', () => {
            const antes = contaDados.atualizadaEm;

            contaBancaria.depositar(100);

            expect(contaDados.atualizadaEm).not.toBe(antes);
            expect(contaDados.atualizadaEm).toBeInstanceOf(Date);
        });

        test('Deve retornar false ao tentar depositar valor zero', () => {
            const valorDeposito = 0;

            const resultado = contaBancaria.depositar(valorDeposito);

            expect(resultado).toBe(false);
            expect(contaBancaria.obterSaldo()).toBe(1000);
        });

        test('Deve retornar false ao tentar depositar valor negativo', () => {
            const valorDeposito = -50;

            const resultado = contaBancaria.depositar(valorDeposito);

            expect(resultado).toBe(false);
            expect(contaBancaria.obterSaldo()).toBe(1000);
        });
    });

    describe('sacar', () => {
        test('Deve sacar valor dentro do saldo disponivel', () => {
            const valorSaque = 500;

            const resultado = contaBancaria.sacar(valorSaque);

            expect(resultado).toBe(true);
            expect(contaBancaria.obterSaldo()).toBe(500);
        });

        test('Deve permitir saque usando o limite', () => {
            const valorSaque = 1300;

            const resultado = contaBancaria.sacar(valorSaque);

            expect(resultado).toBe(true);
            expect(contaBancaria.obterSaldo()).toBe(-300);
        });

        test('Deve atualizar a data ao sacar com sucesso', () => {
            const antes = contaDados.atualizadaEm;

            contaBancaria.sacar(100);

            expect(contaDados.atualizadaEm).not.toBe(antes);
            expect(contaDados.atualizadaEm).toBeInstanceOf(Date);
        });

        test('Deve retornar false quando valor excede saldo + limite', () => {
            const valorSaque = 1600;

            const resultado = contaBancaria.sacar(valorSaque);

            expect(resultado).toBe(false);
            expect(contaBancaria.obterSaldo()).toBe(1000);
        });

        test('Deve retornar false ao tentar sacar valor zero', () => {
            const valorSaque = 0;

            const resultado = contaBancaria.sacar(valorSaque);

            expect(resultado).toBe(false);
        });

        test('Deve retornar false ao tentar sacar valor negativo', () => {
            const valorSaque = -100;

            const resultado = contaBancaria.sacar(valorSaque);

            expect(resultado).toBe(false);
        });
    });

    describe('alterarTitular', () => {
        test('Deve alterar o titular com valor valido', () => {
            const novoTitular = 'Maria Souza';

            const resultado = contaBancaria.alterarTitular(novoTitular);

            expect(resultado).toBe(true);
            expect(contaBancaria.obterTitular()).toBe('Maria Souza');
        });

        test('Deve retornar false ao passar titular vazio', () => {
            const novoTitular = '';

            const resultado = contaBancaria.alterarTitular(novoTitular);

            expect(resultado).toBe(false);
            expect(contaBancaria.obterTitular()).toBe('João Silva');
        });

        test('Deve retornar false ao passar titular null', () => {
            const novoTitular = null;

            const resultado = contaBancaria.alterarTitular(novoTitular);

            expect(resultado).toBe(false);
        });
    });

    describe('bloquearConta', () => {
        test('Deve bloquear uma conta ativa', () => {
            const resultado = contaBancaria.bloquearConta();

            expect(resultado).toBe(true);
            expect(contaBancaria.obterStatus()).toBe('bloqueada');
        });

        test('Deve retornar false ao tentar bloquear conta ja bloqueada', () => {
            contaBancaria.bloquearConta();

            const resultado = contaBancaria.bloquearConta();

            expect(resultado).toBe(false);
        });
    });

    describe('ativarConta', () => {
        test('Deve ativar uma conta bloqueada', () => {
            contaBancaria.bloquearConta();

            const resultado = contaBancaria.ativarConta();

            expect(resultado).toBe(true);
            expect(contaBancaria.obterStatus()).toBe('ativa');
        });

        test('Deve retornar false ao tentar ativar conta ja ativa', () => {
            const resultado = contaBancaria.ativarConta();

            expect(resultado).toBe(false);
        });
    });

    describe('encerrarConta', () => {
        test('Deve encerrar conta com saldo zero', () => {
            contaDados.saldo = 0;

            const resultado = contaBancaria.encerrarConta();

            expect(resultado).toBe(true);
            expect(contaBancaria.obterStatus()).toBe('encerrada');
        });

        test('Deve retornar false ao encerrar conta com saldo positivo', () => {
            const resultado = contaBancaria.encerrarConta();

            expect(resultado).toBe(false);
            expect(contaBancaria.obterStatus()).not.toBe('encerrada');
        });

        test('Deve retornar false ao encerrar conta com saldo negativo', () => {
            contaDados.saldo = -200;

            const resultado = contaBancaria.encerrarConta();

            expect(resultado).toBe(false);
        });
    });

    describe('podeSacar', () => {
        test('Deve retornar true quando valor esta dentro do disponivel', () => {
            const valor = 1500;

            const resultado = contaBancaria.podeSacar(valor);

            expect(resultado).toBe(true);
        });

        test('Deve retornar false quando valor excede o disponivel', () => {
            const valor = 1501;

            const resultado = contaBancaria.podeSacar(valor);

            expect(resultado).toBe(false);
        });

        test('Deve retornar false para valor zero', () => {
            const valor = 0;

            const resultado = contaBancaria.podeSacar(valor);

            expect(resultado).toBe(false);
        });

        test('Deve retornar false para valor negativo', () => {
            const valor = -100;

            const resultado = contaBancaria.podeSacar(valor);

            expect(resultado).toBe(false);
        });
    });

    describe('aplicarTarifa', () => {
        test('Deve aplicar tarifa e reduzir o saldo', () => {
            const tarifa = 50;

            const resultado = contaBancaria.aplicarTarifa(tarifa);

            expect(resultado).toBe(true);
            expect(contaBancaria.obterSaldo()).toBe(950);
        });

        test('Deve retornar false para tarifa zero', () => {
            const tarifa = 0;

            const resultado = contaBancaria.aplicarTarifa(tarifa);

            expect(resultado).toBe(false);
            expect(contaBancaria.obterSaldo()).toBe(1000);
        });

        test('Deve retornar false para tarifa negativa', () => {
            const tarifa = -10;

            const resultado = contaBancaria.aplicarTarifa(tarifa);

            expect(resultado).toBe(false);
        });
    });

    describe('ajustarLimite', () => {
        test('Deve ajustar o limite para um valor valido', () => {
            const novoLimite = 1000;

            const resultado = contaBancaria.ajustarLimite(novoLimite);

            expect(resultado).toBe(true);
            expect(contaBancaria.obterLimite()).toBe(1000);
        });

        test('Deve permitir ajustar limite para zero', () => {
            const novoLimite = 0;

            const resultado = contaBancaria.ajustarLimite(novoLimite);

            expect(resultado).toBe(true);
            expect(contaBancaria.obterLimite()).toBe(0);
        });

        test('Deve retornar false para limite negativo', () => {
            const novoLimite = -100;

            const resultado = contaBancaria.ajustarLimite(novoLimite);

            expect(resultado).toBe(false);
            expect(contaBancaria.obterLimite()).toBe(500);
        });
    });

    describe('saldoNegativo', () => {
        test('Deve retornar true quando saldo for negativo', () => {
            contaDados.saldo = -100;

            const resultado = contaBancaria.saldoNegativo();

            expect(resultado).toBe(true);
        });

        test('Deve retornar false quando saldo for positivo', () => {
            const resultado = contaBancaria.saldoNegativo();

            expect(resultado).toBe(false);
        });

        test('Deve retornar false quando saldo for zero', () => {
            contaDados.saldo = 0;

            const resultado = contaBancaria.saldoNegativo();

            expect(resultado).toBe(false);
        });
    });

    describe('transferir', () => {
        let contaDestino;

        beforeEach(() => {
            contaDestino = new ContaBancaria({
                id: 2,
                titular: 'Ana Costa',
                saldo: 500,
                limite: 200,
                status: 'ativa',
                atualizadaEm: null,
            });
        });

        test('Deve transferir valor entre contas com sucesso', () => {
            const valorTransferencia = 300;

            const resultado = contaBancaria.transferir(valorTransferencia, contaDestino);

            expect(resultado).toBe(true);
            expect(contaBancaria.obterSaldo()).toBe(700);
            expect(contaDestino.obterSaldo()).toBe(800);
        });

        test('Deve permitir transferencia usando limite', () => {
            const valorTransferencia = 1400;

            const resultado = contaBancaria.transferir(valorTransferencia, contaDestino);

            expect(resultado).toBe(true);
            expect(contaBancaria.obterSaldo()).toBe(-400);
            expect(contaDestino.obterSaldo()).toBe(1900);
        });

        test('Deve retornar false quando valor excede saldo disponivel', () => {
            const valorTransferencia = 1600;

            const resultado = contaBancaria.transferir(valorTransferencia, contaDestino);

            expect(resultado).toBe(false);
            expect(contaBancaria.obterSaldo()).toBe(1000);
            expect(contaDestino.obterSaldo()).toBe(500);
        });

        test('Deve retornar false para valor zero', () => {
            const valorTransferencia = 0;

            const resultado = contaBancaria.transferir(valorTransferencia, contaDestino);

            expect(resultado).toBe(false);
        });
    });

    describe('calcularSaldoDisponivel', () => {
        test('Deve retornar saldo + limite', () => {
            const disponivel = contaBancaria.calcularSaldoDisponivel();

            expect(disponivel).toBe(1500);
        });

        test('Deve considerar saldo negativo no calculo', () => {
            contaDados.saldo = -200;

            const disponivel = contaBancaria.calcularSaldoDisponivel();

            expect(disponivel).toBe(300);
        });
    });

    describe('gerarResumo', () => {
        test('Deve retornar objeto com todos os dados da conta', () => {
            const resumo = contaBancaria.gerarResumo();

            expect(resumo).toEqual({
                titular: 'João Silva',
                saldo: 1000,
                limite: 500,
                disponivel: 1500,
                status: 'ativa',
            });
        });

        test('Deve refletir alteracoes no resumo', () => {
            contaBancaria.sacar(300);
            contaBancaria.ajustarLimite(1000);

            const resumo = contaBancaria.gerarResumo();

            expect(resumo.saldo).toBe(700);
            expect(resumo.limite).toBe(1000);
            expect(resumo.disponivel).toBe(1700);
        });
    });

    describe('validarConta', () => {
        test('Deve retornar true para conta valida', () => {
            const resultado = contaBancaria.validarConta();

            expect(resultado).toBe(true);
        });

        test('Deve retornar false quando id estiver ausente', () => {
            contaDados.id = null;

            const resultado = contaBancaria.validarConta();

            expect(resultado).toBe(false);
        });

        test('Deve retornar false quando titular estiver ausente', () => {
            contaDados.titular = '';

            const resultado = contaBancaria.validarConta();

            expect(resultado).toBe(false);
        });

        test('Deve retornar false quando saldo nao for numero', () => {
            contaDados.saldo = 'mil';

            const resultado = contaBancaria.validarConta();

            expect(resultado).toBe(false);
        });

        test('Deve retornar false quando limite for negativo', () => {
            contaDados.limite = -1;

            const resultado = contaBancaria.validarConta();

            expect(resultado).toBe(false);
        });

        test('Deve retornar false quando status for invalido', () => {
            contaDados.status = 'suspensa';

            const resultado = contaBancaria.validarConta();

            expect(resultado).toBe(false);
        });
    });

    describe('resetarConta', () => {
        test('Deve zerar saldo, limite e reativar a conta', () => {
            contaDados.saldo = 500;
            contaDados.limite = 1000;
            contaDados.status = 'bloqueada';

            contaBancaria.resetarConta();

            expect(contaBancaria.obterSaldo()).toBe(0);
            expect(contaBancaria.obterLimite()).toBe(0);
            expect(contaBancaria.obterStatus()).toBe('ativa');
            expect(contaDados.atualizadaEm).toBeInstanceOf(Date);
        });
    });
});
