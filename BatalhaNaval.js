
class BatalhaNaval {
    constructor() {
        this.tamanho = 10;
        this.navios = [];
        this.tiros = new Set();
    }

    colocarNavio(nome, tamanho, inicio, direcao = 'horizontal') {
        const tamanhosPermitidos = [5, 4, 3, 2];

        if (!tamanhosPermitidos.includes(tamanho)) {
            throw new Error('Tamanho de navio inválido.');
        }

        const [linha, coluna] = inicio;

        if (!Number.isInteger(linha) || !Number.isInteger(coluna)) {
            throw new Error('Posição inicial inválida.');
        }

        if (direcao !== 'horizontal' && direcao !== 'vertical') {
            throw new Error('Direção inválida.');
        }

        const casas = [];

        for (let i = 0; i < tamanho; i++) {
            let novaLinha = linha;
            let novaColuna = coluna;

            if (direcao === 'horizontal') {
                novaColuna += i;
            } else {
                novaLinha += i;
            }

            if (
                novaLinha < 0 ||
                novaLinha >= this.tamanho ||
                novaColuna < 0 ||
                novaColuna >= this.tamanho
            ) {
                throw new Error('Navio fora do tabuleiro.');
            }

            casas.push(`${novaLinha},${novaColuna}`);
        }

        for (const casa of casas) {
            for (const navio of this.navios) {
                if (navio.casas.includes(casa)) {
                    throw new Error('Navios não podem se sobrepor.');
                }
            }
        }

        const novoNavio = {
            nome,
            tamanho,
            casas,
            atingidas: new Set()
        };

        this.navios.push(novoNavio);

        return novoNavio;
    }

    atirar(linha, coluna) {
        if (
            !Number.isInteger(linha) ||
            !Number.isInteger(coluna) ||
            linha < 0 ||
            linha >= this.tamanho ||
            coluna < 0 ||
            coluna >= this.tamanho
        ) {
            throw new Error('Posição inválida.');
        }

        const posicao = `${linha},${coluna}`;

        if (this.tiros.has(posicao)) {
            throw new Error('Essa posição já foi atingida.');
        }

        this.tiros.add(posicao);

        for (const navio of this.navios) {
            if (navio.casas.includes(posicao)) {
                navio.atingidas.add(posicao);

                if (navio.atingidas.size === navio.tamanho) {
                    return 'afundado';
                }

                return 'acerto';
            }
        }

        return 'agua';
    }

    todosAfundados() {
        return this.navios.length === 4 &&
            this.navios.every(navio => navio.atingidas.size === navio.tamanho);
    }
}

module.exports = { BatalhaNaval };
