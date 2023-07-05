import {
  GET_ALL_POKEMONS,
  GET_NAME,
  GET_DETAILS,
  CLEAN_DETAILS,
  GET_TYPES,
  POST_POKEMON,
  FILTER_NAME,
  FILTER_ATTACK,
  FILTER_CREATED,
  FILTER_TYPES,
  DELETE_POKEMON,
  CREATE_USER,
  MODIFY_POKEMON,
  LOGIN
} from "../action-types/action-types";

let initialState = {
  pokemons: [],
  allPokemons: [],
  pokemonDetails: {},
  allTypes: [],
  filteredPokemons: [],
  errorsMessage: "",
  modifyItem: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        pokemons: payload,
        allPokemons: payload,
      };

    case GET_NAME:
      return {
        ...state,
        pokemons: payload,
      };

    case GET_DETAILS:
      return {
        ...state,
        pokemonDetails: payload,
      };

    case CLEAN_DETAILS:
      return {
        ...state,
        pokemonDetails: {},
      };

    case GET_TYPES:
      return {
        ...state,
        allTypes: payload,
      };

    case POST_POKEMON:
      return {
        ...state,
      };

    case CREATE_USER:
      return{
        ...state
      }
    
    case LOGIN:
      return{
        ...state
      }

    case FILTER_NAME:
      let filtered =
        payload === "ascendent"
          ? state.pokemons.sort((prev, next) => {
              if (prev.name > next.name) return 1;
              if (prev.name < next.name) return -1;
              return 0;
            })
          : state.pokemons.sort((prev, next) => {
              if (prev.name > next.name) return -1;
              if (prev.name < next.name) return 1;
              return 0;
            });
      return {
        ...state,
        allPokemons: filtered,
      };

    case FILTER_ATTACK:
      let filteredAttack =
        payload === "worst"
          ? state.pokemons.sort((prev, next) => {
              if (prev.attack > next.attack) return 1;
              if (prev.attack < next.attack) return -1;
              return 0;
            })
          : state.pokemons.sort((prev, next) => {
              if (prev.attack > next.attack) return -1;
              if (prev.attack < next.attack) return 1;
              return 0;
            });
      console.log(filteredAttack);
      return {
        ...state,
        allPokemons: filteredAttack,
      };

    case FILTER_CREATED:
      const allPokemons = state.allPokemons;
      const filterCreated =
        payload === "created"
          ? allPokemons.filter((element) => element.createdInDb)
          : allPokemons.filter((element) => !element.createdInDb);
      return {
        ...state,
        pokemons: payload === "all" ? state.allPokemons : filterCreated,
      };

    case FILTER_TYPES:
      const allTypes = state.allPokemons;
      const filteredTypes =
        payload === "all"
          ? allTypes
          : allTypes.filter((el) => el.types.includes(payload));
      return {
        ...state,
        pokemons: filteredTypes,
      };

    case DELETE_POKEMON:
      return {
        ...state,
        pokemons: payload,
        filteredPokemons: payload,
      };

    // case MODIFY_POKEMON: return{
    //     ...state,
    //     pokemons: payload,

    // }

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
