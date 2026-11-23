const test = require('node:test');
const assert = require('node:assert/strict');
const { BatalhaNaval } = require('./BatalhaNaval');

function criarJogoCompleto() {
    const jogo = new BatalhaNaval();

    jogo.colocarNavio('Porta-aviões', 5, [0, 0]);
    jogo.colocarNavio('Encouraçado', 4, [2, 0]);
    jogo.colocarNavio('Submarino', 3, [4, 0]);
    jogo.colocarNavio('Destroier', 2, [6, 0]);

    return jogo;
}

// CASOS DE TESTE - POSICIONAMENTO

test('CT01 - Posicionar porta-aviões com 5 espaços', () => {
    const jogo = new BatalhaNaval();
    const navio = jogo.colocarNavio('Porta-aviões', 5, [0, 0]);

    assert.equal(navio.tamanho, 5);
});

test('CT02 - Posicionar encouraçado com 4 espaços', () => {
    const jogo = new BatalhaNaval();
    const navio = jogo.colocarNavio('Encouraçado', 4, [0, 0]);

    assert.equal(navio.tamanho, 4);
});

test('CT03 - Posicionar submarino com 3 espaços', () => {
    const jogo = new BatalhaNaval();
    const navio = jogo.colocarNavio('Submarino', 3, [0, 0]);

    assert.equal(navio.tamanho, 3);
});

test('CT04 - Posicionar destroier com 2 espaços', () => {
    const jogo = new BatalhaNaval();
    const navio = jogo.colocarNavio('Destroier', 2, [0, 0]);

    assert.equal(navio.tamanho, 2);
});

test('CT05 - Posicionar navio na vertical', () => {
    const jogo = new BatalhaNaval();
    const navio = jogo.colocarNavio('Submarino', 3, [0, 0], 'vertical');

    assert.equal(navio.casas.length, 3);
});

test('CT06 - Posicionar navio próximo ao limite do tabuleiro', () => {
    const jogo = new BatalhaNaval();

    assert.doesNotThrow(() => {
        jogo.colocarNavio('Submarino', 3, [5, 8], 'vertical');
    });
});

test('CT07 - Impedir navio que ultrapassa o limite horizontal', () => {
    const jogo = new BatalhaNaval();

    assert.throws(() => {
        jogo.colocarNavio('Porta-aviões', 5, [0, 7]);
    });
});

test('CT08 - Impedir navio que ultrapassa o limite vertical', () => {
    const jogo = new BatalhaNaval();

    assert.throws(() => {
        jogo.colocarNavio('Porta-aviões', 5, [7, 0], 'vertical');
    });
});

test('CT09 - Impedir sobreposição entre navios', () => {
    const jogo = new BatalhaNaval();

    jogo.colocarNavio('Submarino', 3, [0, 0]);

    assert.throws(() => {
        jogo.colocarNavio('Destroier', 2, [0, 2]);
    });
});

test('CT10 - Posicionar os quatro navios na mesma partida', () => {
    const jogo = criarJogoCompleto();

    assert.equal(jogo.navios.length, 4);
});

// CASOS DE TESTE - ATAQUES

test('CT11 - Acertar uma posição ocupada por um navio', () => {
    const jogo = criarJogoCompleto();

    assert.equal(jogo.atirar(0, 0), 'acerto');
});

test('CT12 - Atirar em uma posição sem navio', () => {
    const jogo = criarJogoCompleto();

    assert.equal(jogo.atirar(9, 9), 'agua');
});

test('CT13 - Afundar um navio após acertar todas as suas posições', () => {
    const jogo = criarJogoCompleto();

    jogo.atirar(0, 0);
    jogo.atirar(0, 1);
    jogo.atirar(0, 2);
    jogo.atirar(0, 3);

    assert.equal(jogo.atirar(0, 4), 'afundado');
});

test('CT14 - Impedir dois ataques na mesma posição', () => {
    const jogo = criarJogoCompleto();

    jogo.atirar(0, 0);

    assert.throws(() => {
        jogo.atirar(0, 0);
    });
});

test('CT15 - Impedir ataque com coordenadas inválidas', () => {
    const jogo = criarJogoCompleto();

    assert.throws(() => {
        jogo.atirar(2.5, 3);
    });
});

test('CT16 - Impedir ataque fora dos limites do tabuleiro', () => {
    const jogo = criarJogoCompleto();

    assert.throws(() => {
        jogo.atirar(10, 10);
    });
});

test('CT17 - Permitir ataque na primeira posição do tabuleiro', () => {
    const jogo = criarJogoCompleto();

    assert.equal(jogo.atirar(0, 0), 'acerto');
});

test('CT18 - Permitir ataque na última posição do tabuleiro', () => {
    const jogo = criarJogoCompleto();

    assert.equal(jogo.atirar(9, 9), 'agua');
});

// CASOS DE TESTE - REGRAS DO JOGO

test('CT19 - Afundar o porta-aviões', () => {
    const jogo = criarJogoCompleto();

    for (let coluna = 0; coluna < 5; coluna++) {
        var resultado = jogo.atirar(0, coluna);
    }

    assert.equal(resultado, 'afundado');
});

test('CT20 - Afundar o encouraçado', () => {
    const jogo = criarJogoCompleto();

    for (let coluna = 0; coluna < 4; coluna++) {
        var resultado = jogo.atirar(2, coluna);
    }

    assert.equal(resultado, 'afundado');
});

test('CT21 - Afundar o submarino', () => {
    const jogo = criarJogoCompleto();

    for (let coluna = 0; coluna < 3; coluna++) {
        var resultado = jogo.atirar(4, coluna);
    }

    assert.equal(resultado, 'afundado');
});

test('CT22 - Afundar o destroier', () => {
    const jogo = criarJogoCompleto();

    for (let coluna = 0; coluna < 2; coluna++) {
        var resultado = jogo.atirar(6, coluna);
    }

    assert.equal(resultado, 'afundado');
});

test('CT23 - Continuar a partida enquanto existirem navios', () => {
    const jogo = criarJogoCompleto();

    for (let coluna = 0; coluna < 5; coluna++) {
        jogo.atirar(0, coluna);
    }

    assert.equal(jogo.todosAfundados(), false);
});

test('CT24 - Encerrar a partida após afundar todos os navios', () => {
    const jogo = criarJogoCompleto();

    for (let coluna = 0; coluna < 5; coluna++) {
        jogo.atirar(0, coluna);
    }

    for (let coluna = 0; coluna < 4; coluna++) {
        jogo.atirar(2, coluna);
    }

    for (let coluna = 0; coluna < 3; coluna++) {
        jogo.atirar(4, coluna);
    }

    for (let coluna = 0; coluna < 2; coluna++) {
        jogo.atirar(6, coluna);
    }

    assert.equal(jogo.todosAfundados(), true);
});

test('CT25 - Continuar a partida após acertar água', () => {
    const jogo = criarJogoCompleto();

    jogo.atirar(9, 9);

    assert.equal(jogo.todosAfundados(), false);
});

// CASOS DE TESTE - TABULEIRO

test('CT26 - Verificar se o tabuleiro possui tamanho 10', () => {
    const jogo = new BatalhaNaval();

    assert.equal(jogo.tamanho, 10);
});

test('CT27 - Impedir posicionamento fora de um tabuleiro 10x10', () => {
    const jogo = new BatalhaNaval();

    assert.throws(() => {
        jogo.colocarNavio('Destroier', 2, [10, 0]);
    });
});

test('CT28 - Aceitar posições dentro dos limites do tabuleiro', () => {
    const jogo = new BatalhaNaval();

    assert.doesNotThrow(() => {
        jogo.colocarNavio('Destroier', 2, [8, 8]);
    });
});

test('CT29 - Verificar os tamanhos dos quatro navios', () => {
    const jogo = criarJogoCompleto();

    assert.deepEqual(
        jogo.navios.map(navio => navio.tamanho),
        [5, 4, 3, 2]
    );
});

test('CT30 - Verificar se existem exatamente quatro navios posicionados', () => {
    const jogo = criarJogoCompleto();

    assert.equal(jogo.navios.length, 4);
});
