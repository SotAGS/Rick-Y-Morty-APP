const results = document.getElementById("results");
const allBtn = document.getElementById("allBtn");
const filterBtn = document.getElementById("filterBtn");

const API_URL = "https://rickandmortyapi.com/api/character/";

function createCard(character) {
  return `
    <div class="card">
      <img src="${character.image}" alt="${character.name}">
      <h3>${character.name}</h3>
      <p>Status: ${character.status}</p>
      <p>Species: ${character.species}</p>
      <p>Gender: ${character.gender}</p>
    </div>
  `;
}

function renderCharacters(characters) {
  results.innerHTML = characters.map(createCard).join("");
}

function showError(error) {
  results.innerHTML = `<p style="color:red;">Error: ${error}</p>`;
}

async function fetchCharacters(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Request fallida");
    const data = await response.json();
    renderCharacters(data.results);
  } catch (error) {
    showError(error.message);
  }
}

function getFilterURL() {
  const name = document.getElementById("name").value;
  const status = document.getElementById("status").value;
  const species = document.getElementById("species").value;
  const type = document.getElementById("type").value;
  const gender = document.getElementById("gender").value;

  const params = new URLSearchParams();

  if (name) params.append("name", name);
  if (status) params.append("status", status);
  if (species) params.append("species", species);
  if (type) params.append("type", type);
  if (gender) params.append("gender", gender);

  return `${API_URL}?${params.toString()}`;
}

allBtn.addEventListener("click", () => {
  fetchCharacters(API_URL);
});

filterBtn.addEventListener("click", () => {
  const url = getFilterURL();
  fetchCharacters(url);
});
