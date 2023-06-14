import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTypes, postPokemon } from "../../redux/actions/actions";
import validation from "../../Components/Validation/validation";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import style from "./Form.module.css";

const Form = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const types = useSelector(state => state.allTypes);

    const [input, setInput] = useState({
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

    const [errors, setErrors] = useState({
        name: ""
    })
      
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
    }

    const handleSelect = (event) => {
        setInput({
            ...input,
            types: [...input.types, event.target.value]
        })
    }

    const handleSliderChange = (name, value) => {
        setInput((prevState) => ({
          ...prevState,
          [name]: value
        }));
      };

    const handleSubmit = (event) => {
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
        <div>
            <h2>Create your own Pokemon!</h2>
            <form className={style.container} onSubmit={(event) => handleSubmit(event)}>
                <div>
                    <label>Name:</label>
                    <input type="text" placeholder="Insert name" name="name" value={input.name} onChange={(event) => handleInputChange(event)}/>
                    {errors.name && <p>{errors.name}</p>}
                </div>

                <div className={style.sliderContainer}>
                    <label>Speed:</label>
                    <Slider
                    className={style.slider}
                    min={0}
                    max={100}
                    value={input.speed}
                    onChange={(value) => handleSliderChange('speed', value)}
                    />
                    <span>{input.speed} km/h</span>
                </div>

                <div className={style.sliderContainer}>
                    <label>Weight:</label>
                    <Slider
                    className={style.slider}
                    min={0}
                    max={100}
                    value={input.weight}
                    onChange={(value) => handleSliderChange('weight', value)}
                    />
                    <span>{input.weight} kg</span>
                </div>

                <div className={style.sliderContainer}>
                    <label>Height:</label>
                    <Slider
                    className={style.slider}
                    min={0}
                    max={100}
                    value={input.height}
                    onChange={(value) => handleSliderChange('height', value)}
                    />
                    <span>{input.height} cm</span>
                </div>

                <div className={style.sliderContainer}>
                    <label>Attack:</label>
                    <Slider
                    className={style.slider}
                    min={0}
                    max={100}
                    value={input.attack}
                    onChange={(value) => handleSliderChange('attack', value)}
                    />
                    <span>{input.attack} %</span>
                </div>

                <div className={style.sliderContainer}>
                    <label>Defense:</label>
                    <Slider
                    className={style.slider}
                    min={0}
                    max={100}
                    value={input.defense}
                    onChange={(value) => handleSliderChange('defense', value)}
                    />
                    <span>{input.defense} %</span>
                </div>

                <div className={style.sliderContainer}>
                    <label>Health:</label>
                    <Slider
                    className={style.slider}
                    min={0}
                    max={100}
                    value={input.life}
                    onChange={(value) => handleSliderChange('life', value)}
                    />
                    <span>{input.life} %</span>
                </div>

                <div>
                    <label>Image url:</label>
                    <input type="text" placeholder="Insert url" name="image" value={input.image} onChange={(event) => handleInputChange(event)}/>
                </div>
                
                <div>
                    <label>Types:</label>
                    <select onChange={(event) => handleSelect(event)}>
                        {types.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                    <div>
                    {input.types.map((types, index) => (
                        <div key={index}>
                        <p>{types}</p>
                        <button onClick={(event) => removeType(event, index)}>x</button>
                        </div>
                    ))}
                </div>
                </div>

                <div>
                    <button 
                    type="submit" 
                    disabled={!input.name || !input.speed || !input.weight || !input.height || !input.life 
                    || !input.attack || !input.defense || !input.image || errors.name }
                    >Submit</button>
                </div>

            </form>
            
        </div>
    )
}

export default Form;