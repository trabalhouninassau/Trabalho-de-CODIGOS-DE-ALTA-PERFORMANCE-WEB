function criarTime(nome, emoji) {
  return {
    nome,
    emoji,
    pontos: 0,
    golsMarcados: 0,
    golsSofridos: 0,
    cartoesAmarelos: 0,
    cartoesVermelhos: 0,
  };
}

const timeCasa = criarTime('Flamengo', '🔴');
const timeVisit = criarTime('Corinthians', '⚫');

const historicoPartidas = [];

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resetarTime(time) {
  time.pontos = 0;
  time.golsMarcados = 0;
  time.golsSofridos = 0;
  time.cartoesAmarelos = 0;
  time.cartoesVermelhos = 0;
}

function sortearGolsPorTempo() {
  return {
    primeiro: { casa: aleatorio(0, 3), visitante: aleatorio(0, 3) },
    segundo: { casa: aleatorio(0, 3), visitante: aleatorio(0, 3) },
  };
}

function sortearCartoes() {
  return {
    casa: { amarelos: aleatorio(0, 4), vermelhos: aleatorio(0, 2) },
    visitante: { amarelos: aleatorio(0, 4), vermelhos: aleatorio(0, 2) },
  };
}

function executarPartida(casa, visita, numero) {
  const gols = sortearGolsPorTempo();
  const cartoes = sortearCartoes();

  const golsCasa = gols.primeiro.casa + gols.segundo.casa;
  const golsVisit = gols.primeiro.visitante + gols.segundo.visitante;

  casa.golsMarcados += golsCasa;
  casa.golsSofridos += golsVisit;
  visita.golsMarcados += golsVisit;
  visita.golsSofridos += golsCasa;

  casa.cartoesAmarelos += cartoes.casa.amarelos;
  casa.cartoesVermelhos += cartoes.casa.vermelhos;
  visita.cartoesAmarelos += cartoes.visitante.amarelos;
  visita.cartoesVermelhos += cartoes.visitante.vermelhos;

  let vencedor = null;

  if (golsCasa > golsVisit) {
    casa.pontos += 3;
    vencedor = casa.nome;
  } else if (golsVisit > golsCasa) {
    visita.pontos += 3;
    vencedor = visita.nome;
  } else {
    casa.pontos += 1;
    visita.pontos += 1;
  }

  return {
    numero,
    golsCasa,
    golsVisit,
    gols,
    cartoes,
    vencedor,
    nomeCasa: casa.nome,
    nomeVisit: visita.nome,
  };
}

function renderizarCards(casa, visita, vencedorPartida) {
  function preencher(sufixo, time) {
    document.getElementById(`pts-${sufixo}`).textContent = time.pontos;
    document.getElementById(`gm-${sufixo}`).textContent = time.golsMarcados;
    document.getElementById(`gs-${sufixo}`).textContent = time.golsSofridos;
    document.getElementById(`sg-${sufixo}`).textContent =
      (time.golsMarcados - time.golsSofridos >= 0 ? '+' : '') +
      (time.golsMarcados - time.golsSofridos);
    document.getElementById(`am-${sufixo}`).textContent = `🟨 ${time.cartoesAmarelos}`;
    document.getElementById(`vm-${sufixo}`).textContent = `🟥 ${time.cartoesVermelhos}`;
  }

  preencher('casa', casa);
  preencher('visit', visita);

  const cardCasa = document.getElementById('card-casa');
  const cardVisit = document.getElementById('card-visit');

  cardCasa.classList.remove('winner');
  cardVisit.classList.remove('winner');

  if (vencedorPartida === casa.nome) cardCasa.classList.add('winner');
  if (vencedorPartida === visita.nome) cardVisit.classList.add('winner');
}

function renderizarPartida(resumo) {
  const feed = document.getElementById('feed-partidas');

  const placeholder = feed.querySelector('.feed-placeholder');
  if (placeholder) placeholder.remove();

  const casaGanhou = resumo.vencedor === resumo.nomeCasa;
  const visitGanhou = resumo.vencedor === resumo.nomeVisit;
  const empate = resumo.vencedor === null;

  const classCasa = casaGanhou ? 'ganhou' : visitGanhou ? 'perdeu' : '';
  const classVisit = visitGanhou ? 'ganhou' : casaGanhou ? 'perdeu' : '';

  const badgeHtml = empate
    ? `<span class="resultado-badge empate">🤝 Empate</span>`
    : `<span class="resultado-badge vitoria">🏆 ${resumo.vencedor}</span>`;

  const cardHtml = `
    <div class="partida-card">
      <div class="partida-num">Partida ${resumo.numero} de 5</div>

      <div class="partida-time left ${classCasa}">${resumo.nomeCasa}</div>
      <div class="partida-placar">
        <div class="placar-gols">${resumo.golsCasa} <span style="color:var(--text-muted)">×</span> ${resumo.golsVisit}</div>
        <div class="placar-detalhe">
          1ºT: ${resumo.gols.primeiro.casa}–${resumo.gols.primeiro.visitante}
          &nbsp;|&nbsp;
          2ºT: ${resumo.gols.segundo.casa}–${resumo.gols.segundo.visitante}
        </div>
      </div>
      <div class="partida-time right ${classVisit}">${resumo.nomeVisit}</div>

      <div class="partida-resultado">
        ${badgeHtml}
        <div class="partida-cartoes">
          🟨 ${resumo.cartoes.casa.amarelos + resumo.cartoes.visitante.amarelos}
          &nbsp;
          🟥 ${resumo.cartoes.casa.vermelhos + resumo.cartoes.visitante.vermelhos}
        </div>
      </div>
    </div>
  `;

  feed.insertAdjacentHTML('beforeend', cardHtml);
}

function renderizarTabela(times) {
  const tabela = times
    .map(t => ({ ...t, saldo: t.golsMarcados - t.golsSofridos }))
    .sort((a, b) =>
      b.pontos !== a.pontos ? b.pontos - a.pontos : b.saldo - a.saldo
    );

  const tbody = document.getElementById('tabela-body');
  tbody.innerHTML = '';

  tabela.forEach((t, i) => {
    const saldoClass = t.saldo >= 0 ? 'col-sg-pos' : 'col-sg-neg';
    const saldoStr = (t.saldo >= 0 ? '+' : '') + t.saldo;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${t.nome}</td>
      <td class="col-pts">${t.pontos}</td>
      <td>${t.golsMarcados}</td>
      <td>${t.golsSofridos}</td>
      <td class="${saldoClass}">${saldoStr}</td>
      <td>${t.cartoesAmarelos}</td>
      <td>${t.cartoesVermelhos}</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderizarCampeao(times) {
  const tabela = [...times].sort((a, b) => {
    const saldoA = a.golsMarcados - a.golsSofridos;
    const saldoB = b.golsMarcados - b.golsSofridos;
    return b.pontos !== a.pontos ? b.pontos - a.pontos : saldoB - saldoA;
  });

  const banner = document.getElementById('banner-campeao');
  const nomeEl = document.getElementById('campeao-nome');
  const subEl = document.getElementById('campeao-sub');

  const lider = tabela[0];
  const vice = tabela[1];

  const empate =
    lider.pontos === vice.pontos &&
    (lider.golsMarcados - lider.golsSofridos) ===
    (vice.golsMarcados - vice.golsSofridos);

  if (empate) {
    nomeEl.textContent = 'Empate!';
    subEl.textContent = `${lider.nome} e ${vice.nome} terminaram igualados.`;
  } else {
    const saldo = lider.golsMarcados - lider.golsSofridos;

    nomeEl.textContent = lider.nome;
    subEl.textContent =
      `${lider.pontos} pts · ${lider.golsMarcados} gols marcados · Saldo ${saldo >= 0 ? '+' : ''}${saldo}`;
  }

  banner.classList.remove('hidden');
  banner.style.animation = 'none';
  banner.offsetHeight;
  banner.style.animation = '';
}

function iniciarSimulacao() {
  resetarTime(timeCasa);
  resetarTime(timeVisit);
  historicoPartidas.length = 0;

  document.getElementById('feed-partidas').innerHTML =
    '<div class="feed-placeholder">Simulando...</div>';

  document.getElementById('tabela-body').innerHTML =
    '<tr class="tabela-vazia"><td colspan="8">Processando...</td></tr>';

  document.getElementById('banner-campeao').classList.add('hidden');

  document.getElementById('card-casa').classList.remove('winner');
  document.getElementById('card-visit').classList.remove('winner');

  const btn = document.getElementById('btn-simular');
  btn.disabled = true;

  const TOTAL_PARTIDAS = 5;
  let rodada = 1;

  document.getElementById('feed-partidas').innerHTML = '';

  function simularProxima() {
    if (rodada > TOTAL_PARTIDAS) {
      renderizarTabela([timeCasa, timeVisit]);
      renderizarCampeao([timeCasa, timeVisit]);
      btn.disabled = false;
      return;
    }

    const resumo = executarPartida(timeCasa, timeVisit, rodada);

    historicoPartidas.push(resumo);

    renderizarCards(timeCasa, timeVisit, resumo.vencedor);
    renderizarPartida(resumo);

    rodada++;

    setTimeout(simularProxima, 400);
  }

  simularProxima();
}