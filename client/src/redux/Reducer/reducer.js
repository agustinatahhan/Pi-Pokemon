import { 
    GET_ALL_POKEMONS
    
} from "../action-types/action-types";

let initialState = {
    pokemons: [],
    allPokemons : [],

}

const reducer = (state = initialState, {type, payload}) => {
    switch(type){
        case GET_ALL_POKEMONS: return{
            ...state,
            pokemons: payload,
            allPokemons: payload
        }

        default: return{
            ...state
        }
    }
}

export default reducer;