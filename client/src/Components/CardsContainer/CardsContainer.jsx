import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Card from "../Card/Card";
import Searchbar from "../Searchbar/Searchbar";
import Paginated from "../../Components/Paginated/Paginated";
import style from "./CardsContainer.module.css";
import { filterName, filterByAttack, filterCreated, filterTypes, getAll } from "../../redux/actions/actions";


const CardsContainer = () => {

    const dispatch = useDispatch();

    const pokemons = useSelector(state => state.pokemons);
    const types = useSelector(state => state.allTypes);
    
    const [orden, setOrden] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const filterNameAd = (event) => {
        event.preventDefault();
        dispatch(filterName(event.target.value));
        setOrden(event.target.value)
        // setCurrentPage(1);
    }

    const filterAttack = (event) => {
        event.preventDefault();
        dispatch(filterByAttack(event.target.value));
        setOrden(event.target.value)
        // setCurrentPage(1);
    }

    const filterByCreated = (event) => {
        if(currentPage !== 1){
            setCurrentPage(1)
        }
        event.preventDefault();
        dispatch(filterCreated(event.target.value));
        setOrden(event.target.value)
        setCurrentPage(1);
    }

    const filterByTypes = (event) => {
        event.preventDefault();
        dispatch(filterTypes(event.target.value));
        setOrden(event.target.value);
        setCurrentPage(1);
    }

    const resetInput = () => { 
        const selects = document.querySelectorAll(".resetSelect");
            selects.forEach((select) => (select.selectedIndex = 0)); 
    }      

    return(
        <div>
            <div className={style.nav}>
                <div className={style.filtersContainer}>
                    <div className={style.search}>
                        <Searchbar setCurrentPage={setCurrentPage}/>
                    </div>
                    <div className={style.filters}>
                        <select onChange={(event) => filterNameAd(event)}>
                            <option value="" disabled selected hidden>Order</option>
                            <option value="ascendent">A - Z</option>
                            <option value="descendent">Z - A</option>
                        </select>
                    </div>
                    <div className={style.filters}>
                        <select onChange={(event) => filterAttack(event)}>
                            <option value="" disabled selected hidden>Attack</option>
                            <option value="best">Best Attack</option>
                            <option value="worst">Worst Attack</option>
                        </select>
                    </div>
                    <div className={style.filters}>
                        <select onChange={(event) => filterByCreated(event)}>
                            <option value="" disabled selected hidden>Origin</option>
                            <option value="all">All</option>
                            <option value="created">Created</option>
                            <option value="api">Api</option>
                        </select>
                    </div>
                    <div className={style.filters}>
                        <select onChange={(event) => filterByTypes(event)}>
                            <option value="" disabled selected hidden>Select Type</option>
                            <option value="all">All</option>
                            {types.map((type) => (
                                <option key={type.id} value={type.name}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className={style.btn} onClick={() => {
                         setCurrentPage(1)
                         dispatch(getAll())
                         resetInput()
                    }}>Reset Filters</button>
                </div>
            </div>                    

                <div className={style.container}>
                    {
                        currentPokemons?.map(({id, name, speed, height, weight, attack, defense, types, life, image}) => {
                            
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
                <div>
                    <Paginated
                        pokemonsPerPage={pokemonsPerPage}
                        pokemons={pokemons.length}
                        currentPage={currentPage}
                        paginado={paginado}
                    />
                </div>
                
            </div>
    )
}

export default CardsContainer;