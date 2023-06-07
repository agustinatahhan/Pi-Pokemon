import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetails, cleanDetails } from "../../redux/actions/actions";

const Details = () => {

    const { id } = useParams(); 

    const details = useSelector(state => state.pokemonDetails);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetails(id));
        return () => dispatch(cleanDetails())
    }, [id])

    const { name, speed, attack, defense, life, types, height, weight, image} = details;

    // if (Array.isArray(types)) {
    //     types = types.join(" "); // join array elements with a space separator
    // }

    return(
        <div>
            <h2>{name}</h2>
            <img src={image} alt={name}/>
            {speed && <h4>Speed: <span>{speed}</span></h4>}
            {height && <h4>Speed: <span>{height}</span></h4>}
            {weight && <h4>Speed: <span>{weight}</span></h4>}
            <h4>Attack: <span>{attack}</span></h4>
            <h4>Defense: <span>{defense}</span></h4>
            <h4>Life: <span>{life}</span></h4>
            <h4>Type: {types}</h4>
            
        </div>
    )
}

export default Details;