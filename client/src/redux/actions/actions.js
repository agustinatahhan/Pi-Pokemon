import { 
    GET_ALL_POKEMONS,
    GET_NAME,
    GET_DETAILS,
    GET_TYPES,
    CLEAN_DETAILS,
    FILTER_NAME,
    FILTER_ATTACK,
    FILTER_CREATED,
    FILTER_TYPES
} from "../action-types/action-types";
import axios from "axios";

export const getAll = () => {
    return async function(dispatch){
        const response = await axios.get("http://localhost:3001/pokemon");
        const data = response.data;
        dispatch({type: GET_ALL_POKEMONS, payload: data});
    }
}

export const getName = (name) => {
    return async function(dispatch){
        const response = await axios.get(`http://localhost:3001/pokemon?name=${name}`);
        const data = response.data;
        dispatch({type: GET_NAME, payload: data})
    }
}

export const getDetails = (id) => {
    return async function(dispatch){
        const response = await axios.get(`http://localhost:3001/pokemon/${id}`);
        const data = response.data;
        dispatch({type: GET_DETAILS, payload: data})
    }
}

export const cleanDetails = () => {
    return {type: CLEAN_DETAILS}
}

export const getTypes = () => {
    return async function(dispatch){
        const response = await axios.get("http://localhost:3001/type");
        const data = response.data;
        const map = data.map(element => element.name);
        dispatch({type: GET_TYPES, payload: map})
    }
}

export const filterName = (payload) => {
    return{
        type: FILTER_NAME,
        payload
    }
}

export const filterByAttack = (payload) => {
    return{
        type: FILTER_ATTACK,
        payload
    }
}

export const filterCreated = (payload) => {
    return{
        type: FILTER_CREATED,
        payload
    }
}

export const filterTypes = (payload) => {
    return{
        type: FILTER_TYPES,
        payload
    }
}