var results = document.getElementById("results");
var allBtn = document.getElementById("allBtn");
var filterBtn = document.getElementById("filterBtn");

var API_URL = "https://rickandmortyapi.com/api/character/";

function createCard(character) {
  return '<div class="card">' +
    '<img src="' + character.image + '" alt="' + character.name + '">' +
    '<h3>' + character.name + '</h3>' +
    '<p>Status: ' + character.status + '</p>' +
    '<p>Species: ' + character.species + '</p>' +
    '<p>Gender: ' + character.gender + '</p>' +
  '</div>';
}

function renderCharacters(characters) {
  var html = "";
  for (var i = 0; i < characters.length; i++) {
    html += createCard(characters[i]);
  }
  results.innerHTML = html;
}

function showError(message) {
  results.innerHTML = '<p style="color:red;">Error: ' + message + '</p>';
}

function fetchCharacters(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        renderCharacters(response.results);
      } else {
        showError("No se pudo obtener la información");
      }
    }
  };
  xhr.send();
}

function getFilterURL() {
  var name = document.getElementById("name").value;
  var status = document.getElementById("status").value;
  var species = document.getElementById("species").value;
  var type = document.getElementById("type").value;
  var gender = document.getElementById("gender").value;

  var params = [];
  if (name) params.push("name=" + encodeURIComponent(name));
  if (status) params.push("status=" + encodeURIComponent(status));
  if (species) params.push("species=" + encodeURIComponent(species));
  if (type) params.push("type=" + encodeURIComponent(type));
  if (gender) params.push("gender=" + encodeURIComponent(gender));

  return API_URL + "?" + params.join("&");
}

allBtn.addEventListener("click", function () {
  fetchCharacters(API_URL);
});

filterBtn.addEventListener("click", function () {
  var url = getFilterURL();
  fetchCharacters(url);
});
