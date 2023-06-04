import { useSelector, useDispatch } from "react-redux";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";

const CardsContainer = () => {

    const pokemons = useSelector(state => state.pokemons);

    return(
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
                            types={types}
                            life={life}
                            image={image}
                        />
                    )
                })
            }
        </div>
    )
}

export default CardsContainer;