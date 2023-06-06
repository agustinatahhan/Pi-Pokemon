import style from "./Card.module.css";
import { NavLink } from "react-router-dom";

const Card = ({id, name, types, image}) => {
    
    return(
        <NavLink to={`/details/${id}`} className={style.navlink}>
            <div className={style.container}>

                <h3>{name}</h3>
                <img src={image} alt={name}/>
                <h4>Type: {types}</h4>
             
            </div>
        </NavLink>
    )
}

export default Card;