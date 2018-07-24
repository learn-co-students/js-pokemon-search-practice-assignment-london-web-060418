document.addEventListener("DOMContentLoaded", function() {
  const pokeContainer = document.getElementById('pokemon-container')
  const input = document.getElementById('pokemon-search-input')
  let searchTerm = () => input.value

  input.addEventListener('input', search)

  function search(e) {
    const searchPokemon = [...data.pokemons.filter( poke => poke.name.includes(searchTerm()) )]

    renderSearch(searchPokemon)
  }

  function renderSearch(searchResult) {
    clearContainer()

    for (let poke of searchResult) {
      createCard(data.pokemons.indexOf(poke))
    }
  }

  function clearContainer() {
    while (pokeContainer.hasChildNodes()) {
      pokeContainer.removeChild(pokeContainer.firstChild)
    }
  }

  function createCard(pokemonIndex) {
    const pokeInfo = data.pokemons[pokemonIndex]
    let newCard = document.createElement('div')

    newCard.className = "pokemon-container"
    newCard.innerHTML = `
    <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
      <h1 class="center-text">${pokeInfo.name}</h1>
      <div style="width:239px;margin:auto">
        <div style="width:96px;margin:auto">
          <img src=${pokeInfo.sprites.front}>
        </div>
      </div>
      <p style="padding:10px;" class="center-text flip-image" data-action="flip-image">flip card</p>
    </div>`

    newCard.querySelector('div p').addEventListener('click', flipCard)
    pokeContainer.append(newCard)
  }

  function flipCard(e) {
    const pokeInfo = findPokemonBy(e.target.parentNode.querySelector('h1').innerText)

    if (e.target.parentNode.querySelector('div div img').src === pokeInfo.sprites.front) {
      e.target.parentNode.querySelector('div div img').src = pokeInfo.sprites.back
    } else {
      e.target.parentNode.querySelector('div div img').src = pokeInfo.sprites.front
    }
  }

  function findPokemonBy(name) {
    return data.pokemons.find( poke => poke.name === name )
  }
})
