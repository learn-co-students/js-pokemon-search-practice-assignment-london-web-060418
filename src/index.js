document.addEventListener("DOMContentLoaded", function() {
  let allPokemon = []

  class Pokemon {
    constructor(name, frontImage, backImage) {
      this.name = name
      this.frontImage = frontImage
      this.backImage = backImage
      allPokemon.push(this)
    }

    render () {
      let newPokeDiv = document.createElement('div')
      newPokeDiv.innerHTML = `<h1 class='center-text'>${this.name} </h1>`
      let newImgDiv = document.createElement('div')
      newImgDiv.style = 'width:100px;margin:auto'
      newImgDiv.innerHTML = `<img src=${this.frontImage}>`
      let newPDiv = document.createElement('div')
      newPDiv.innerHTML = `<p class="center-text flip-image" data-pokename=${this.name} data-action="flip-image">flip card</p>`
      let newDiv = document.createElement('div')
      newDiv.className = 'pokemon-container'
      newDiv.style = 'width:200px;margin:5px;background:#fecd2f;color:#2d72fc'
      let mainDiv = document.getElementById('pokemon-container')
      mainDiv.addEventListener('click', function(e) {
        if(e.target.dataset.action === 'flip-image') {
          for (let i = 0; i < allPokemon.length; i++) {
            if (e.target.dataset.pokename === allPokemon[i].name) {
              let image = e.target.parentElement.parentElement.children[1].children[0];
              if (image.src === allPokemon[i].frontImage) {
                image.src = allPokemon[i].backImage;
              } else {
                image.src = allPokemon[i].frontImage;
              }
            }
          }
        }
      })
      newDiv.append(newPokeDiv)
      newDiv.append(newImgDiv)
      newDiv.append(newPDiv)
      mainDiv.append(newDiv)
    }
  }
  const input = document.getElementById('pokemon-search-input')
  input.addEventListener('keyup', function(e) {
    document.getElementById('pokemon-container').innerHTML = ''
    if (isNaN(input.value)) {
      for (let i = 0; i < data['pokemons'].length; i++) {
        if (data['pokemons'][i]['name'].includes(input.value)) {
          let newGuy = new Pokemon(data['pokemons'][i]['name'], data['pokemons'][i]['sprites']['front'], data['pokemons'][i]['sprites']['back'])
          newGuy.render()
        }
      }
    };
  })
})
