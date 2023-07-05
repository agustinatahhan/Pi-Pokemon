import {
  GET_ALL_POKEMONS,
  GET_NAME,
  GET_DETAILS,
  GET_TYPES,
  CLEAN_DETAILS,
  FILTER_NAME,
  FILTER_ATTACK,
  FILTER_CREATED,
  FILTER_TYPES,
  DELETE_POKEMON,
  CREATE_USER,
  MODIFY_POKEMON,
} from "../action-types/action-types";
import axios from "axios";

export const getAll = () => {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/pokemon");
    const data = response.data;
    dispatch({ type: GET_ALL_POKEMONS, payload: data });
  };
};

export const getName = (name) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/pokemon?name=${name}`
      );
      const data = response.data;
      if (data.length === 0) throw Error("Pokémon not found");
      dispatch({ type: GET_NAME, payload: data });
    } catch (error) {
      alert("Pokémon not found, try again.");
    }
  };
};

export const getDetails = (id) => {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/pokemon/${id}`);
    const data = response.data;
    dispatch({ type: GET_DETAILS, payload: data });
  };
};

export const cleanDetails = () => {
  return { type: CLEAN_DETAILS };
};

export const getTypes = () => {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/type");
    const data = response.data;
    // const map = data.map(element => element.name);
    const map = data.map((element) => element);
    dispatch({ type: GET_TYPES, payload: map });
  };
};

export const postPokemon = (input) => {
  return async function () {
    const response = await axios.post("http://localhost:3001/pokemon", input);
    return response;
  };
};

export const filterName = (payload) => {
  return {
    type: FILTER_NAME,
    payload,
  };
};

export const filterByAttack = (payload) => {
  return {
    type: FILTER_ATTACK,
    payload,
  };
};

export const filterCreated = (payload) => {
  return {
    type: FILTER_CREATED,
    payload,
  };
};

export const filterTypes = (payload) => {
  return {
    type: FILTER_TYPES,
    payload,
  };
};

export const deletePokemon = (id) => {
  return async function (dispatch) {
    const response = await axios.delete(`http://localhost:3001/pokemon/${id}`);
    const data = response.data;
    dispatch({ type: DELETE_POKEMON, payload: data });
  };
};

export const createUser = (user) => {
  return async function () {
    const response = await axios.post(
      "http://localhost:3001/user/register", user);
    return response;
  };
};

// export const login = () => {
//   return async function() {
//     const response = await axios.post("http://localhost:3001/user/login", );
//     return response
//   }
// }
export const login = (user) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("http://localhost:3001/user/login", user);
      const homeURL = response.data.homeURL;

      // Redirigir al usuario al home si se recibe la URL del home en la respuesta
      if (homeURL) {
        window.location.href = homeURL;
      }

      return response;
    } catch (error) {
      throw error;
    }
  };
};







// export const getModifyPokemons = (formModify) => {

//     return async function(dispatch){
//         const response = await axios.put("http://localhost:3001/pokemon", formModify);
//         const data = response.data;
//         dispatch({type: MODIFY_POKEMON, payload: data})
//     }
// }
