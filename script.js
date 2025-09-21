const cardsContainer = document.getElementById("cards");
const buttons = document.querySelectorAll(".profile__options button");
let period = "weekly"; // padrão

// Função para carregar dados
async function loadData() {
  const res = await fetch("data.json");
  const data = await res.json();
  renderCards(data);
}

// Renderiza os cards
function renderCards(data) {
  cardsContainer.innerHTML = "";
  data.forEach(item => {
    const { title, color, icon, timeframes } = item;
    const current = timeframes[period].current;
    const previous = timeframes[period].previous;

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card__bg" style="background:${color} url(${icon}) no-repeat right 20px top -10px;"></div>
      <div class="card__content">
        <div class="card__header">
          <h2>${title}</h2>
          <img src="images/icon-ellipsis.svg" alt="Menu">
        </div>
        <p class="card__hours">${current}hrs</p>
        <p class="card__previous">Last Week - ${previous}hrs</p>
      </div>
    `;
    cardsContainer.appendChild(card);
  });
}

// Alternar período
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    period = btn.dataset.period;
    loadData();
  });
});

// Inicia carregamento
loadData();