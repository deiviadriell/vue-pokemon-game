import { shallowMount, mount } from "@vue/test-utils";
import PokemonPage from "@/pages/PokemonPage";
import { pokemons } from "../mocks/pokemons.mock";
describe('PokemonPage Component', () => {

    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(PokemonPage)
    })

    test('debe de llamar mixPokemonArray al montar', () => {


        const mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray')
        const wrapper = shallowMount(PokemonPage)
        expect(mixPokemonArraySpy).toHaveBeenCalled()

    })

    test('debe de hacer match con el snapshot cuando cargan los pokemons', () => {

        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        expect( wrapper.html()).toMatchSnapshot()
    })

    test('debe de mostrar los componentes de PokemonPicture y PokemonOptions', () => {

        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })       
        
        expect(wrapper.find('pokemon-picture-stub').exists()).toBeTruthy()
        expect(wrapper.find('pokemon-options-stub').exists()).toBeTruthy()
        expect(wrapper.find('pokemon-picture-stub').attributes('pokemonid')).toBe('1')
        expect(wrapper.find('pokemon-options-stub').attributes('pokemons')).toBeTruthy()

    })

    test('pruebas con checkAnswer', async () => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })     

        //Propiedades reactivas que hacen cambios en el VD, await para esperar que termine de renderizar todo
        await wrapper.vm.checkAnswer(1)
        expect(wrapper.find('h2').exists()).toBeTruthy()

        expect(wrapper.vm.showPokemon).toBe(true)

        expect(wrapper.find('h2').text()).toBe(`Correcto, ${pokemons[0].name}`)

        await wrapper.vm.checkAnswer(10)

        //expect(wrapper.find('h2').text()).toBe(`Oops, era ${pokemons[0].name}`)

        expect(wrapper.vm.message).toBe(`Oops, era ${pokemons[0].name}`)


          
    })
})