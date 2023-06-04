import { GET_ALL_POKEMONS } from "../action-types/action-types";
import axios from "axios";

export const getAll = () => {
    return async function(dispatch){
        const api = await axios.get("http://localhost:3001/pokemon");
        const data = api.data;
        
        dispatch({type: GET_ALL_POKEMONS, payload: data});
    }
}