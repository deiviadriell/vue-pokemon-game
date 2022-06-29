<template>
<h1 v-if="!pokemon">Espere por favor...</h1>
<div v-else>

    <h1>¿Quién es este pokémon?</h1>

  <PokemonPicture 
    :pokemonId="pokemon.id" 
    :showPokemon="showPokemon" 
  />
    
    <PokemonOptions 
      :pokemons="pokemonArr"
      @selection-pokemon="checkAnswer"
      />
<template v-if="showAnswer">
    <h2 class="fade-in">{{message}}</h2>
    <button @click="newGame">
        Nuevo Juego
     </button>

</template>

      
</div>

</template>

<script>
import PokemonOptions from '@/components/PokemonOptions.vue'
import PokemonPicture from '@/components/PokemonPicture.vue'
import getPokemonOptions from '@/helpers/getPokemonOptions.js'


export default {
    
  components: { PokemonOptions,PokemonPicture },
  data(){
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: ''
    }
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonOptions()

      const rndInt = Math.floor(Math.random() * 4 )
      this.pokemon = this.pokemonArr[rndInt]
    },
    checkAnswer( selectedId){
      this.showPokemon = true
      this.showAnswer = true
      
      this.message = (selectedId == this.pokemon.id)? this.message = `Correcto, ${this.pokemon.name}`:this.message = `Oops, era ${this.pokemon.name}`
      
    },
    newGame() {      
      
      this.showPokemon =  false
      this.showAnswer =  false
      this.message = ''
      this.pokemon = null
      this.mixPokemonArray()


    }
  },
  mounted(){
    this.mixPokemonArray()
  }

}
</script>
