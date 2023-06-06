import { NavLink } from "react-router-dom";

const Nav = () => {

    return(
        <div>
            <NavLink to="/create">
                <button>Create a new Pokemon</button>
            </NavLink>
            <NavLink to="/home">
                <button>
                    Home
                </button>
            </NavLink>
        </div>
    )
}

export default Nav;