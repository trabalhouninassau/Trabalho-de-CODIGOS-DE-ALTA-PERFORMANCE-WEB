# Simulador de Campeonato ⚽

Projeto desenvolvido em JavaScript para simular um campeonato entre dois times de futebol. O sistema realiza partidas automaticamente, gera resultados aleatórios, contabiliza cartões, atualiza estatísticas e exibe a classificação final do torneio com o campeão.

## Integrantes do Grupo

* Nicolas França Amaral Sampaio - 01784117
* Giovanni Alves Bezerra da Silva - 01810252
* Matheus Ribeiro Lima Alves - 01802678
* Heytor Nascimento de Santana - 01792787

## Turma

Ciência da Computação — Manhã — 3º Período

## Projeto Desenvolvido

Projeto baseado no tema sugerido **Futebol**, consistindo em um simulador de campeonato entre dois times, com geração aleatória de resultados, cartões e classificação final.

## Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* Node.js

## Funcionalidades Implementadas

* Simulação automática de 5 partidas.
* Geração aleatória de gols por tempo.
* Sorteio de cartões amarelos e vermelhos.
* Atualização de estatísticas dos times.
* Tabela de classificação final.
* Exibição do campeão do torneio.
* Interface responsiva utilizando HTML, CSS e JavaScript puro.

## Estrutura do Projeto

```text
├── index.html
├── style.css
├── script.js
├── index.js
└── package.json
```

## Instruções de Instalação e Execução

### Versão Web

1. Baixe ou clone o projeto.
2. Abra o arquivo `index.html` em qualquer navegador moderno.
3. Clique em **Simular Campeonato** para iniciar a simulação.

### Versão Terminal (Node.js)

Certifique-se de possuir o Node.js instalado.

```bash
node index.js
```

## Regras da Simulação

* São disputadas 5 partidas entre os dois times.
* Os gols de cada tempo são gerados aleatoriamente.
* Cartões amarelos e vermelhos também são sorteados.
* Vitória vale 3 pontos.
* Empate vale 1 ponto para cada equipe.
* O campeão é definido por pontos e, em caso de empate, pelo saldo de gols.

## Estatísticas Exibidas

* Pontos
* Gols Marcados (GM)
* Gols Sofridos (GS)
* Saldo de Gols (SG)
* Cartões Amarelos
* Cartões Vermelhos

## Desafios Extras Implementados

* Interface web responsiva utilizando HTML, CSS e JavaScript.
* Sistema de cartões amarelos e vermelhos.
* Critério de desempate por saldo de gols.
* Exibição detalhada das partidas por tempo de jogo.
* Relatório de disciplina com contagem total de cartões por equipe.
* Identificação automática do time mais disciplinado.
* Exibição visual da tabela final e do campeão do torneio.

## Exemplo de Saída Esperada no Console

```text
████████████████████████████████████████████████████
  🏟️  CAMPEONATO SIMULADO  |  5 Partidas
  Flamengo  vs  Corinthians
████████████████████████████████████████████████████

════════════════════════════════════════════════════
  ⚽ PARTIDA 1  |  Flamengo vs Corinthians
════════════════════════════════════════════════════
  1º Tempo → Flamengo 1 x 2 Corinthians
  2º Tempo → Flamengo 3 x 1 Corinthians
────────────────────────────────────────────────────
  PLACAR FINAL: Flamengo 4 x 3 Corinthians
  🏆 Vencedor: Flamengo

  🟨 Cartões Amarelos  → Flamengo: 1  |  Corinthians: 4
  🟥 Cartões Vermelhos → Flamengo: 0  |  Corinthians: 2

(...)

════════════════════════════════════════════════════
  📊 TABELA DE CLASSIFICAÇÃO FINAL
════════════════════════════════════════════════════
  Time          Pts   GM    GS    SG
────────────────────────────────────────────────────
  🥇 Flamengo    10    13    13    0
  🥈 Corinthians 4     13    13    0

████████████████████████████████████████████████████

  🏆  CAMPEÃO DO TORNEIO: FLAMENGO!
      10 pontos | Saldo de gols: 0

████████████████████████████████████████████████████
```

## Possíveis Melhorias Futuras

* Cadastro de times personalizado.
* Mais equipes no campeonato.
* Sistema de mata-mata.
* Persistência de resultados em arquivo JSON.
* Histórico completo de campeonatos.
* Estatísticas avançadas dos jogadores.



Desenvolvido para fins acadêmicos e prática de conceitos de JavaScript, lógica de programação, manipulação de objetos e simulação esportiva.
