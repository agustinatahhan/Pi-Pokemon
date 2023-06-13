import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDetails, cleanDetails } from "../../redux/actions/actions";
import style from "./Details.module.css";

const Details = () => {

    const { id } = useParams(); 

    const details = useSelector(state => state.pokemonDetails);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getDetails(id));
        return () => dispatch(cleanDetails())
    }, [id])

    const { name, speed, attack, defense, life, types, height, weight, image} = details;

    return(
        <div>
            <button onClick={(() => navigate("/home"))}>Back</button>
            <div className={style.containerCard}>
                <div>
                    <h2>{name}</h2>
                    <img src={image} alt={name}/>
                    {speed && <h4>Speed: <span>{speed}</span></h4>}
                    {height && <h4>Speed: <span>{height} cm</span></h4>}
                    {weight && <h4>Speed: <span>{weight} kg</span></h4>}
                    <h4>Attack: <span>{attack}</span></h4>
                    <h4>Defense: <span>{defense}</span></h4>
                    <h4>Life: <span>{life}%</span></h4>
                    <h4>Type: {types}</h4>
                </div>
            </div>
            
        </div>
    )
}

export default Details;