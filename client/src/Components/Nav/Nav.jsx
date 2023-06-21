import { NavLink } from "react-router-dom";
import style from "./Nav.module.css";

const Nav = () => {

    return(
        <div  id="home" className={style.navContainer}>
            <NavLink to="/home" className={style.navlink}>Home</NavLink>
            <NavLink to="/create" className={style.navlink}>Create a new Pokemon</NavLink>
            {/* <NavLink to="/modify" className={style.navlink}>Update your Pokemon</NavLink> */}

        </div>
    )
}

export default Nav;