import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../../redux/actions/actions";

const Form = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTypes())
    })

    return(
        <div>
            <form>
                <label>Name:</label>
                <input type="text" />
                <label>Attack:</label>
                <input type="number" />
                <label>Defense:</label>
                <input type="number" />
                <label>Speed:</label>
                <input type="number" />
                <label>Life:</label>
                <input type="number" />
                <label>Image url:</label>
                <input type="text" />

            </form>
        </div>
    )
}

export default Form;