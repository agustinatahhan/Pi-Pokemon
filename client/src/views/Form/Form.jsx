import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTypes, postPokemon } from "../../redux/actions/actions";
import validation from "../../Components/Validation/validation";
import style from "./Form.module.css";

const Form = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const types = useSelector(state => state.allTypes);

    const [input, setInput] = useState({
        name: "",
        image: "",
        life: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: []
    })

    const [errors, setErrors] = useState({
        name: "",
        image: "",
        life: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: []
        
    })

    const [touched, setTouched] = useState({ 
        name: false,
        life: false,
        attack: false,
        defense: false,
        speed: false,
        image: false,
        height: false,
        weight: false,
        image: false,
        types: false
    });
      
    useEffect(() => {
        dispatch(getTypes())
    }, [])


    const handleInputChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
        setErrors(validation({
            ...input,
            [event.target.name]: event.target.value
        }))
        setTouched({
            ...touched,
            [event.target.name]: true
          });
    }

    const handleSelect = (event) => {
        setInput({
            ...input,
            types: [...input.types, event.target.value]
        })
    }

    const handleSubmit = (event) => {
        console.log(event.target.value)
        event.preventDefault();
        dispatch(postPokemon(input));
        alert("Created");
        setInput({
            name: "",
            life: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            image: "",
            height: 0,
            weight: 0,
            types: []
        })
        navigate("/home");
    }
    
    const removeType = (event, index) => {
        event.preventDefault();
        const newType = [...input.types];
        newType.splice(index, 1);
        setInput({ ...input, types: newType });
    };
    
     
    return(
        <div className={style.container}>
            <form className={style.form} onSubmit={(event) => handleSubmit(event)}>
                    <h2>Create your own Pokémon!</h2>

                        <div className={style.grid}>

                                <div className={style.inputText}>
                                    <label>Name:</label>
                                    <input type="text" name="name" value={input.name}
                                    onChange={(event) => handleInputChange(event)}/>
                                    {touched.name && errors.name && <p>{errors.name}</p>}
                                </div>

                                <div className={style.inputText}>
                                    <label>Image url:</label>
                                    <input type="text" name="image" value={input.image}
                                    onChange={(event) => handleInputChange(event)}/>
                                    {touched.image && errors.image && <p>{errors.image}</p>}
                                </div>

                                <div >
                                    <label>Speed:</label>
                                    <input type="range" min={1} max={100} name="speed" value={input.speed}
                                    onChange={(event) => handleInputChange(event)} 
                                    />
                                    <span>{input.speed}</span>
                                    {touched.speed && errors.speed && <p>{errors.speed}</p>}

                                </div>

                                <div className={style.inputNumber}>
                                    <label>Attack:</label>
                                    <input type="range" min={1} max={100} name="attack" value={input.attack}
                                    onChange={(event) => handleInputChange(event)} 
                                    />
                                    <span>{input.attack}</span>
                                    {touched.attack && errors.attack && <p>{errors.attack}</p>}
                                </div>

                                <div className={style.inputNumber}>
                                    <label>Defense:</label>
                                    <input type="range" min={1} max={100} name="defense" value={input.defense}
                                    onChange={(event) => handleInputChange(event)} 
                                    />
                                    <span>{input.defense}</span>
                                    {touched.defense && errors.defense && <p>{errors.defense}</p>}
                                </div>

                                <div className={style.inputNumber}>
                                    <label>Height:</label>
                                    <input type="range" min={1} max={100} name="height" value={input.height}
                                    onChange={(event) => handleInputChange(event)} 
                                    />
                                    <span>{input.height}</span>
                                    {touched.height && errors.height && <p>{errors.height}</p>}
                                </div>

                                <div className={style.inputNumber}>
                                    <label>Weight:</label>
                                    <input type="range" min={1} max={100} name="weight" value={input.weight}
                                    onChange={(event) => handleInputChange(event)} 
                                    />
                                     <span>{input.weight}</span>
                                    {touched.weight && errors.weight && <p>{errors.weight}</p>}
                                </div>

                                <div className={style.inputNumber}>
                                    <label>Health:</label>
                                    <input type="range" min={1} max={100} name="life" value={input.life}
                                    onChange={(event) => handleInputChange(event)} 
                                    />
                                    <span>{input.life}</span>
                                    {touched.life && errors.life && <p>{errors.life}</p>} 
                                </div>

                                <div className={style.inputText}>
                                    <label>Types:</label>
                                        <select onChange={(event) => handleSelect(event)} >
                                            <option value="" disabled selected>Choose type</option>
                                            {types.map((type) => (
                                                <option key={type.id} value={type.id}>
                                                    {type.name}
                                                </option>
                                            ))}
                                        </select>
                                </div>
                                <div>
                                    {input.types.map((types, index) => (
                                        <div key={index} className={style.inputDelete}>
                                        <button onClick={(event) => removeType(event, index)}>x</button>
                                        <h5>{types}</h5>
                                        </div>
                                    ))}
                                </div>
                            </div>                       

                    <div>
                        <button 
                        type="submit" 
                        className={style.btn}
                        disabled={errors.name || errors.image || errors.types || errors.speed || errors.weight || errors.height 
                        || errors.attack || errors.defense || errors.life || !input.name || !input.speed || !input.weight
                        || !input.height || !input.attack || !input.defense || !input.image || !input.life || input.types === undefined }
                        >Submit</button>
                    </div>

            </form>
            
        </div>
    )
}

export default Form;