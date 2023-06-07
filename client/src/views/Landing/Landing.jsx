import { NavLink } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
    return(
        <div className={style.background}>
            <NavLink to="/home">
                <button>
                    Home
                </button>
            </NavLink>
        </div>
    )
}

export default Landing;