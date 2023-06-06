import { NavLink } from "react-router-dom";

const Landing = () => {
    return(
        <div>
            <NavLink to="/home">
                <button>
                    Home
                </button>
            </NavLink>
        </div>
    )
}

export default Landing;