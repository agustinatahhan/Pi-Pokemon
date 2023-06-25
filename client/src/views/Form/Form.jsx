import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTypes, postPokemon } from "../../redux/actions/actions";
import validation from "../../Components/Validation/validation";
import style from "./Form.module.css";
import axios from "axios";

const Form = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const types = useSelector((state) => state.allTypes);
  const pokemons = useSelector((state) => state.pokemons);

  const [input, setInput] = useState({
    name: "",
    image: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
    tender: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
    tender: "",
  });

  const name = (type) => {
    return types.map((objeto) => objeto.id == type && objeto.name);
  };

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validation({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSelect = (event) => {
    setInput({
      ...input,
      types: [...input.types, event.target.value],
    });
    setErrors(
      validation({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(postPokemon(input))
      .then((response) => {
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
          types: [],
          tender: "",
        });
        navigate("/home");
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.error);
        } else {
          alert(error.message);
        }
      });
  };

  const removeType = (event, index) => {
    event.preventDefault();
    const newType = [...input.types];
    newType.splice(index, 1);
    setInput({ ...input, types: newType });
  };

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={(event) => handleSubmit(event)}>
        <h2>Create your own Pokémon!</h2>

        <div className={style.grid}>
          <div className={style.text}>
            <div className={style.inputText}>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={(event) => handleInputChange(event)}
                placeholder="name"
              />
              {errors.name && <p>{errors.name}</p>}
            </div>

            <div className={style.inputText}>
              <label>Image:</label>
              <input
                type="text"
                name="image"
                value={input.image}
                onChange={(event) => handleInputChange(event)}
                placeholder="url"
              />
              {errors.image && <p>{errors.image}</p>}
            </div>
          </div>

          <div className={style.barsContainer}>
            <div className={style.inputNumber}>
              <label>Height:</label>
              <input
                type="range"
                min={1}
                max={100}
                name="height"
                value={input.height}
                onChange={(event) => handleInputChange(event)}
                className={style.bar}
              />
              <span>{input.height}</span>
              {errors.height && <p>{errors.height}</p>}
            </div>

            <div className={style.inputNumber}>
              <label>Attack:</label>
              <input
                type="range"
                min={1}
                max={100}
                name="attack"
                value={input.attack}
                onChange={(event) => handleInputChange(event)}
                className={style.bar}
              />
              <span>{input.attack}</span>
              {errors.attack && <p>{errors.attack}</p>}
            </div>

            <div className={style.inputNumber}>
              <label>Weight:</label>
              <input
                type="range"
                min={1}
                max={100}
                name="weight"
                value={input.weight}
                onChange={(event) => handleInputChange(event)}
                className={style.bar}
              />
              <span>{input.weight}</span>
              {errors.weight && <p>{errors.weight}</p>}
            </div>

            <div className={style.inputNumber}>
              <label>Defense:</label>
              <input
                type="range"
                min={1}
                max={100}
                name="defense"
                value={input.defense}
                onChange={(event) => handleInputChange(event)}
                className={style.bar}
              />
              <span>{input.defense}</span>
              {errors.defense && <p>{errors.defense}</p>}
            </div>

            <div className={style.inputNumber}>
              <label>Health:</label>
              <input
                type="range"
                min={1}
                max={100}
                name="life"
                value={input.life}
                onChange={(event) => handleInputChange(event)}
                className={style.bar}
              />
              <span>{input.life}</span>
              {errors.life && <p>{errors.life}</p>}
            </div>

            <div className={style.inputNumber}>
              <label>Speed:</label>
              <input
                type="range"
                min={1}
                max={100}
                name="speed"
                value={input.speed}
                onChange={(event) => handleInputChange(event)}
                className={style.bar}
              />
              <span>{input.speed}</span>
              {errors.speed && <p>{errors.speed}</p>}
            </div>

            <div className={style.inputNumber}>
              <label>Ternura:</label>
              <input
                type="range"
                min={1}
                max={100}
                name="tender"
                value={input.tender}
                onChange={(event) => handleInputChange(event)}
                className={style.bar}
              />
              <span>{input.tender}</span>
              {errors.tender && <p>{errors.tender}</p>}
            </div>
          </div>

          <div className={style.inputText}>
            <label>Types:</label>
            <select name="types" onChange={(event) => handleSelect(event)}>
              <option value="" disabled selected>
                Choose type
              </option>
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            {errors.types && <p>{errors.types}</p>}
          </div>
          <div className={style.inputDelete}>
            {input.types.map((type, index) => (
              <div key={index} className={style.inputDel}>
                <button onClick={(event) => removeType(event, index)}>x</button>
                <h5>{name(type)}</h5>
              </div>
            ))}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className={style.btn}
            disabled={
              errors.name ||
              errors.image ||
              errors.speed ||
              errors.weight ||
              errors.height ||
              errors.attack ||
              errors.defense ||
              errors.life ||
              !input.name ||
              !input.speed ||
              !input.weight ||
              !input.height ||
              !input.attack ||
              !input.defense ||
              !input.image ||
              !input.life ||
              !input.types.length
            }
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
