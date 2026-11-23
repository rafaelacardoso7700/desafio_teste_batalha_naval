**Rafaela Tanaka Cardoso 24062611-2**

**Vitor Hugo da Costa 23234248-2**

# Batalha Naval - Casos de Teste

## Concepção do Desafio

O desafio consiste na criação de casos de teste para o jogo Batalha Naval, utilizando JavaScript e o framework Jest.

A ideia é testar as principais regras do jogo, considerando um tabuleiro de 10x10 e quatro tipos de navios:

- Porta-aviões: ocupa 5 casas.
- Encouraçado: ocupa 4 casas.
- Submarino: ocupa 3 casas.
- Destroier: ocupa 2 casas.

Os testes foram pensados para verificar se os navios podem ser posicionados corretamente, se os ataques funcionam como esperado e se as regras do jogo são respeitadas. Também foram considerados alguns erros que podem acontecer durante uma partida, como posicionar navios fora do tabuleiro ou tentar atacar uma posição que já foi atacada.

## Funcionamento dos Casos de Teste

Os casos de teste foram separados por funcionalidades para facilitar a organização e a identificação do que está sendo verificado.

Primeiro, são testados o tamanho do tabuleiro e o posicionamento dos navios, verificando se cada um ocupa a quantidade correta de casas e se não ultrapassa os limites ou fica sobreposto a outro navio.

Depois, são realizados testes relacionados aos ataques, verificando situações em que o jogador acerta um navio, atinge uma casa vazia ou tenta atacar uma posição inválida ou já utilizada.

Também são testadas as regras do jogo, como a identificação de navios afundados e a condição para finalizar a partida, que acontece quando todos os navios adversários são afundados.

Por fim, os testes automatizados com Jest servem para verificar cada uma dessas situações, comparando o resultado esperado com o resultado apresentado pelo sistema. Assim, é possível identificar se alguma regra não está funcionando corretamente.

## Casos de Teste

### 1. Posicionamento dos Navios

| Código | Caso de teste | Resultado esperado |
|---|---|---|
| CT01 | Posicionar porta-aviões com 5 espaços. | Navio posicionado corretamente. |
| CT02 | Posicionar encouraçado com 4 espaços. | Navio posicionado corretamente. |
| CT03 | Posicionar submarino com 3 espaços. | Navio posicionado corretamente. |
| CT04 | Posicionar destroier com 2 espaços. | Navio posicionado corretamente. |
| CT05 | Posicionar navio na vertical. | Navio posicionado corretamente na vertical. |
| CT06 | Posicionar navio próximo ao limite do tabuleiro. | Posicionamento aceito se permanecer dentro dos limites. |
| CT07 | Posicionar navio ultrapassando o limite horizontal. | Posicionamento recusado. |
| CT08 | Posicionar navio ultrapassando o limite vertical. | Posicionamento recusado. |
| CT09 | Posicionar dois navios ocupando as mesmas casas. | Sobreposição recusada. |
| CT10 | Posicionar os quatro navios na mesma partida. | Os quatro navios são posicionados corretamente. |

### 2. Ataques

| Código | Caso de teste | Resultado esperado |
|---|---|---|
| CT11 | Atirar em uma posição ocupada por um navio. | Retornar acerto. |
| CT12 | Atirar em uma posição sem navio. | Retornar água. |
| CT13 | Acertar todas as posições de um navio. | Retornar que o navio foi afundado. |
| CT14 | Atirar duas vezes na mesma posição. | Segundo ataque recusado. |
| CT15 | Atacar utilizando coordenadas inválidas. | Ataque recusado. |
| CT16 | Atacar fora dos limites do tabuleiro. | Ataque recusado. |
| CT17 | Atacar a primeira posição do tabuleiro (0,0). | Ataque permitido e resultado correspondente à posição. |
| CT18 | Atacar a última posição do tabuleiro (9,9). | Ataque permitido e resultado correspondente à posição. |

### 3. Regras do Jogo

| Código | Caso de teste | Resultado esperado |
|---|---|---|
| CT19 | Afundar o porta-aviões. | Navio identificado como afundado. |
| CT20 | Afundar o encouraçado. | Navio identificado como afundado. |
| CT21 | Afundar o submarino. | Navio identificado como afundado. |
| CT22 | Afundar o destroier. | Navio identificado como afundado. |
| CT23 | Afundar apenas um navio. | Partida continua, pois ainda existem navios. |
| CT24 | Afundar todos os navios. | Partida identificada como finalizada. |
| CT25 | Errar um ataque, atingindo uma casa vazia. | Partida continua. |

### 4. Tabuleiro

| Código | Caso de teste | Resultado esperado |
|---|---|---|
| CT26 | Verificar o tamanho do tabuleiro. | Tabuleiro possui tamanho 10x10. |
| CT27 | Tentar posicionar um navio fora do tabuleiro. | Posicionamento recusado. |
| CT28 | Posicionar navio em uma posição dentro dos limites do tabuleiro. | Posicionamento aceito. |
| CT29 | Verificar os tamanhos dos quatro navios. | Tamanhos correspondem a 5, 4, 3 e 2 casas. |
| CT30 | Verificar a quantidade de navios posicionados. | Existem exatamente quatro navios. |

## Resumo dos Testes

Foram elaborados 30 casos de teste, divididos em quatro grupos:

- **Posicionamento dos Navios:** 10 casos.
- **Ataques:** 8 casos.
- **Regras do Jogo:** 7 casos.
- **Tabuleiro:** 5 casos.

Os testes verificam situações válidas e inválidas, buscando garantir que as principais regras do Batalha Naval sejam respeitadas.
