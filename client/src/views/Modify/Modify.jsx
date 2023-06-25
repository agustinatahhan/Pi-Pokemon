import { useState } from "react";
import styles from "../../views/Modify/Modify.module.css";
import axios from "axios";
import { getTypes } from "../../redux/actions/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "../Form/Form.module.css";
import validation from "../../Components/Validation/validation";

const Modify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const details = useSelector((state) => state.pokemonDetails);

  const [formModify, setFormModify] = useState({
    id: details.id,
    name: details.name,
    life: details.life,
    attack: details.attack,
    defense: details.defense,
    speed: details.speed,
    height: details.height,
    weight: details.weight,
    image: details.image,
    types: [],
  });

  const [errors, setErrors] = useState({
    id: "",
    name: "",
    image: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  });

  const changeHandlerModify = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    console.log(value + "handlertype");
    console.log(property + "pro");

    setFormModify({
      ...formModify,
      [property]: value,
    });
    setErrors(
      validation({
        ...formModify,
        [event.target.name]: event.target.value,
      })
    );
  };

  const changeHandlerType = (event) => {
    const value = event.target.value;

    if (!formModify.types.includes(value)) {
      setFormModify({ ...formModify, types: [...formModify.types, value] });
    }
    setErrors(
      validation({
        ...formModify,
        [event.target.name]: event.target.value,
      })
    );
  };

  const submitHandlerModify = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:3001/pokemon", formModify)
      .then((res) => {
        alert("Pokemon updated!");
        setFormModify({
          id: "",
          name: "",
          life: "",
          attack: "",
          defense: "",
          speed: "",
          height: "",
          weight: "",
          image: "",
          types: [],
        });
        navigate("/home");
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const typess = useSelector((state) => state.allTypes);
  const name = (type) => {
    return typess.map((objeto) => objeto.id == type && objeto.name);
  };

  const removeType = (event, index) => {
    event.preventDefault();
    const newType = [...formModify.types];
    newType.splice(index, 1);
    setFormModify({ ...formModify, types: newType });
  };

  return (
    <div>
      <div className={styles.container}>
        <form
          className={style.form}
          onSubmit={(event) => submitHandlerModify(event)}
        >
          <h1>Modify</h1>

          <div className={style.inputText}>
            <label>Name: </label>
            <input
              type="text"
              value={formModify.name}
              onChange={changeHandlerModify}
              name="name"
            ></input>
          </div>

          <div className={style.inputNumber}>
            <label>Health:</label>
            <input
              type="range"
              min={1}
              max={100}
              name="life"
              value={formModify.life}
              onChange={(event) => changeHandlerModify(event)}
              className={style.bar}
            />
            <span>{formModify.life}</span>
          </div>

          <div className={style.inputNumber}>
            <label>Attack:</label>
            <input
              type="range"
              min={1}
              max={100}
              name="attack"
              value={formModify.attack}
              onChange={(event) => changeHandlerModify(event)}
              className={style.bar}
            />
            <span>{formModify.attack}</span>
          </div>

          <div className={style.inputNumber}>
            <label>Defense:</label>
            <input
              type="range"
              min={1}
              max={100}
              name="defense"
              value={formModify.defense}
              onChange={(event) => changeHandlerModify(event)}
              className={style.bar}
            />
            <span>{formModify.defense}</span>
          </div>

          <div className={style.inputNumber}>
            <label>Speed:</label>
            <input
              type="range"
              min={1}
              max={100}
              name="speed"
              value={formModify.speed}
              onChange={(event) => changeHandlerModify(event)}
              className={style.bar}
            />
            <span>{formModify.speed}</span>
          </div>

          <div className={style.inputNumber}>
            <label>Height:</label>
            <input
              type="range"
              min={1}
              max={100}
              name="height"
              value={formModify.height}
              onChange={(event) => changeHandlerModify(event)}
              className={style.bar}
            />
            <span>{formModify.height}</span>
          </div>

          <div className={style.inputNumber}>
            <label>Weight:</label>
            <input
              type="range"
              min={1}
              max={100}
              name="weight"
              value={formModify.weight}
              onChange={(event) => changeHandlerModify(event)}
              className={style.bar}
            />
            <span>{formModify.weight}</span>
          </div>

          <div className={style.inputText}>
            <label>Image:</label>
            <input
              type="text"
              name="image"
              value={formModify.image}
              onChange={(event) => changeHandlerModify(event)}
              placeholder="url"
            />
          </div>

          <div className={style.inputText}>
            <label>Types:</label>
            <select name="types" onChange={(event) => changeHandlerType(event)}>
              <option value="" disabled selected>
                Choose type
              </option>
              {typess.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            {/* {errors.types && <p>{errors.types}</p>} */}
          </div>

          <div className={style.inputDelete}>
            {formModify.types.map((type, index) => (
              <div key={index} className={style.inputDel}>
                <button onClick={(event) => removeType(event, index)}>x</button>
                <h5>{name(type)}</h5>
              </div>
            ))}
          </div>
          <div></div>
          <div>
            <button
              type="submit"
              className={style.btn}
              // disabled={errors.name || errors.image || errors.speed || errors.weight || errors.height
              // || errors.attack || errors.defense || errors.life || !formModify.name || !formModify.speed || !formModify.weight
              // || !formModify.height || !formModify.attack || !formModify.defense || !formModify.image || !formModify.life || !formModify.types.length}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modify;
