import pokemonApi from '@/api/pokemonApi'

describe('pokemonApi', () => {

    test('axios debe estár configurado con el API de axios', ()=> {
        expect (pokemonApi.defaults.baseURL).toBe('https://pokeapi.co/api/v2/pokemon')
        
    })    
})