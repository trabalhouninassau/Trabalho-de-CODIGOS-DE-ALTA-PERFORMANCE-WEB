
function criarTime(nome) {
  return {
    nome,
    pontos: 0,
    golsMarcados: 0,
    golsSofridos: 0,
    cartoesAmarelos: 0,
    cartoesVermelhos: 0,
  };
}

const timeCasa = criarTime("Flamengo");
const timeVisit = criarTime("Corinthians");


function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function linha(char = "─", tamanho = 52) {
  return char.repeat(tamanho);
}


function sortearGolsPorTempo() {
  return {
    primeiro: {
      casa: aleatorio(0, 3),
      visitante: aleatorio(0, 3),
    },
    segundo: {
      casa: aleatorio(0, 3),
      visitante: aleatorio(0, 3),
    },
  };
}


function sortearCartoes() {
  return {
    casa: {
      amarelos: aleatorio(0, 4),
      vermelhos: aleatorio(0, 2),
    },
    visitante: {
      amarelos: aleatorio(0, 4),
      vermelhos: aleatorio(0, 2),
    },
  };
}


function executarPartida(timeCasa, timeVisit, numeroDaPartida) {
  const gols = sortearGolsPorTempo();
  const cartoes = sortearCartoes();


  const golsCasa =
    gols.primeiro.casa + gols.segundo.casa;
  const golsVisit =
    gols.primeiro.visitante + gols.segundo.visitante;

  
  timeCasa.golsMarcados += golsCasa;
  timeCasa.golsSofridos += golsVisit;
  timeVisit.golsMarcados += golsVisit;
  timeVisit.golsSofridos += golsCasa;


  timeCasa.cartoesAmarelos  += cartoes.casa.amarelos;
  timeCasa.cartoesVermelhos += cartoes.casa.vermelhos;
  timeVisit.cartoesAmarelos  += cartoes.visitante.amarelos;
  timeVisit.cartoesVermelhos += cartoes.visitante.vermelhos;


  let resultado;
  if (golsCasa > golsVisit) {
    timeCasa.pontos += 3;
    resultado = `🏆 Vencedor: ${timeCasa.nome}`;
  } else if (golsVisit > golsCasa) {
    timeVisit.pontos += 3;
    resultado = `🏆 Vencedor: ${timeVisit.nome}`;
  } else {
    timeCasa.pontos += 1;
    timeVisit.pontos += 1;
    resultado = "🤝 Empate!";
  }

  console.log(`\n${linha("═")}`);
  console.log(`  ⚽ PARTIDA ${numeroDaPartida}  |  ${timeCasa.nome} vs ${timeVisit.nome}`);
  console.log(linha("═"));

  console.log(`  1º Tempo → ${timeCasa.nome} ${gols.primeiro.casa} x ${gols.primeiro.visitante} ${timeVisit.nome}`);
  console.log(`  2º Tempo → ${timeCasa.nome} ${gols.segundo.casa} x ${gols.segundo.visitante} ${timeVisit.nome}`);
  console.log(linha());
  console.log(`  PLACAR FINAL: ${timeCasa.nome} ${golsCasa} x ${golsVisit} ${timeVisit.nome}`);
  console.log(`  ${resultado}`);

  console.log(`\n  🟨 Cartões Amarelos  → ${timeCasa.nome}: ${cartoes.casa.amarelos}  |  ${timeVisit.nome}: ${cartoes.visitante.amarelos}`);
  console.log(`  🟥 Cartões Vermelhos → ${timeCasa.nome}: ${cartoes.casa.vermelhos}  |  ${timeVisit.nome}: ${cartoes.visitante.vermelhos}`);
}


const totalPartidas = 5;

console.log(`\n${"█".repeat(52)}`);
console.log(`  🏟️  CAMPEONATO SIMULADO  |  ${totalPartidas} Partidas`);
console.log(`  ${timeCasa.nome}  vs  ${timeVisit.nome}`);
console.log(`${"█".repeat(52)}`);

for (let i = 1; i <= totalPartidas; i++) {
  executarPartida(timeCasa, timeVisit, i);
}


const times = [timeCasa, timeVisit];


const tabela = times
  .map((t) => ({
    ...t,
    saldoGols: t.golsMarcados - t.golsSofridos,
  }))
  .sort((a, b) =>
    b.pontos !== a.pontos
      ? b.pontos - a.pontos
      : b.saldoGols - a.saldoGols
  );

console.log(`\n\n${"═".repeat(52)}`);
console.log("  📊 TABELA DE CLASSIFICAÇÃO FINAL");
console.log("═".repeat(52));
console.log(
  "  " +
    "Time".padEnd(14) +
    "Pts".padEnd(6) +
    "GM".padEnd(6) +
    "GS".padEnd(6) +
    "SG".padEnd(6)
);
console.log("─".repeat(52));

tabela.forEach((t, idx) => {
  const pos = idx === 0 ? "🥇" : "🥈";
  console.log(
    `  ${pos} ${t.nome.padEnd(12)}` +
      String(t.pontos).padEnd(6) +
      String(t.golsMarcados).padEnd(6) +
      String(t.golsSofridos).padEnd(6) +
      String(t.saldoGols).padEnd(6)
  );
});


console.log(`\n${"═".repeat(52)}`);
console.log("  🟨🟥 DISCIPLINA — CARTÕES POR TIME");
console.log("═".repeat(52));

times.forEach((t) => {
  const totalCartoes = t.cartoesAmarelos + t.cartoesVermelhos;
  console.log(`\n  ${t.nome}`);
  console.log(`    Amarelos : ${t.cartoesAmarelos}`);
  console.log(`    Vermelhos: ${t.cartoesVermelhos}`);
  console.log(`    Total    : ${totalCartoes}`);
});


const maisDisciplinado = times.reduce((melhor, t) => {
  const totalMelhor = melhor.cartoesAmarelos + melhor.cartoesVermelhos;
  const totalAtual  = t.cartoesAmarelos + t.cartoesVermelhos;
  return totalAtual < totalMelhor ? t : melhor;
});

console.log(`\n  ✅ Time mais disciplinado: ${maisDisciplinado.nome}`);


const campeao = tabela[0];
const vice    = tabela[1];

console.log(`\n${"█".repeat(52)}`);

if (campeao.pontos > vice.pontos || campeao.saldoGols > vice.saldoGols) {
  console.log(`\n  🏆  CAMPEÃO DO TORNEIO: ${campeao.nome.toUpperCase()}!`);
  console.log(`      ${campeao.pontos} pontos | Saldo de gols: ${campeao.saldoGols}`);
} else {
   
  console.log("  🤝  EMPATE TÉCNICO NO TORNEIO!");
  console.log(`      ${timeCasa.nome} e ${timeVisit.nome} terminaram igualados.`);
}

console.log(`\n${"█".repeat(52)}\n`);
