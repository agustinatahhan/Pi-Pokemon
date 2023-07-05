import { NavLink } from "react-router-dom";
import style from "./Nav.module.css";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  return (
    <div id="home" className={style.navContainer}>
      <div onClick={() => navigate("/")} className={style.arrow}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-pokeball"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#ffffff"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M3 12h6" />
          <path d="M15 12h6" />
        </svg>
      </div>
      {/* <NavLink to="/home" className={style.navlink}>
        Home
      </NavLink> */}
      <NavLink to="/create" className={style.navlink}>
        Create a new Pokemon
      </NavLink>
      {/* <NavLink to="/" className={style.navlink}>
        Log Out
      </NavLink> */}
      {/* <NavLink to="/modify" className={style.navlink}>Update your Pokemon</NavLink> */}
    </div>
  );
};

export default Nav;
