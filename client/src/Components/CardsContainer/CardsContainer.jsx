import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { filterName, filterByAttack } from "../../redux/actions/actions";

const CardsContainer = () => {

    const dispatch = useDispatch();

    const pokemons = useSelector(state => state.pokemons);
   
    const [orden, setOrden] = useState("");

    const filterNameAd = (event) => {
        event.preventDefault();
        dispatch(filterName(event.target.value));
        setOrden(event.target.value)
    }

    const filterAttack = (event) => {
        event.preventDefault();
        dispatch(filterByAttack(event.target.value));
        setOrden(event.target.value)
    }

    return(
        <div>
            <div>
                <select onChange={(event) => filterNameAd(event)}>
                    <option value="ascendent">Ascendent</option>
                    <option value="descendent">Descendent</option>
                </select>

                <select onChange={(event) => filterAttack(event)}>
                    <option value="best">Best Attack</option>
                    <option value="worst">Worst Attack</option>
                </select>

            </div>
            <div className={style.container}>
                {
                    pokemons?.map(({id, name, speed, height, weight, attack, defense, types, life, image}) => {
                        
                        return(
                            <Card
                                key={id}
                                id={id}
                                name={name}
                                speed={speed}
                                height={height}
                                weight={weight}
                                attack={attack}
                                defense={defense}
                                types={types?.map((v) => v.name).join(' / ')}
                                life={life}
                                image={image}
                            />
                        )
                    })
                }

            </div>

           
        </div>
    )
}

export default CardsContainer;