import { getName } from "../../redux/actions/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import style from "./Searchbar.module.css";

const Searchbar = () => {

    const dispatch = useDispatch();

    const [name, setName] = useState("");

    const handleChange = (event) => {
        event.preventDefault();
        setName(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(getName(name))
    }

    return(
        <div className={style.principal}>
            <div className={style.inputSearch}>
                <input type="text" placeholder="Search by name" value={name} onChange={handleChange}/>
                <div type="submit" onClick={(event) => handleSubmit(event)} className={style.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                    <path d="M21 21l-6 -6" />
                    </svg>
                </div>

            </div>
            
        </div>
    )
}

export default Searchbar;