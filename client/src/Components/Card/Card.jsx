import style from "./Card.module.css";
import { NavLink } from "react-router-dom";

const Card = (props) => {
  let types = props.types;

  if (Array.isArray(types)) {
    types = types.join(" ");
  }

  return (
    <NavLink to={`/details/${props.id}`} className={style.navlink}>
      <div className={style.container}>
        <div className={style.card}>
          <div className={style.img}>
            <img src={props.image} alt={props.name} />
          </div>
          <div className={style.content}>
            <div className={style.text}>
              <h3>{props.name}</h3>
            </div>
            <div className={style.types}>
              <h4>{types}</h4>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default Card;
