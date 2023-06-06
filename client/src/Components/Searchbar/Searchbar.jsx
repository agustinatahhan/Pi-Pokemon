import { getName } from "../../redux/actions/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";


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
        <div>
            <input type="text" placeholder="Search by name" value={name} onChange={handleChange}/>
            <button type="submit" onClick={(event) => handleSubmit(event)}>Search</button>
            {/* <NavLink to="/home">
                <button>Back</button>
            </NavLink> */}
        </div>
    )
}

export default Searchbar;