import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./Landing.module.css";

const Landing = () => {
 
    return(
        <div className={style.background}>
            <NavLink to="/home" className={style.navlink}>
                <button className={style.btn}>
                    Home
                </button>
            </NavLink>
        </div>
    )
}

export default Landing;