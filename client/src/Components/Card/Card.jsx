import style from "./Card.module.css";
import { NavLink } from "react-router-dom";

const Card = (props) => {
    return(
        <NavLink to={`/details/${props.id}`} className={style.navlink}>
            <div className={style.container}>

                <h3>{props.name}</h3>
                <img src={props.image} alt={props.name}/>
                <h4>Type: <span>{props.types}</span></h4>
                
            </div>
        </NavLink>
    )
}

export default Card;