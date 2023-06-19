import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDetails, cleanDetails, deletePokemon } from "../../redux/actions/actions";
import fondo from "../../Img/fondo1.JPG";
import style from "./Details.module.css";

const Details = () => {

    const { id } = useParams(); 

    const details = useSelector(state => state.pokemonDetails);

    const dispatch = useDispatch();

    const navigate = useNavigate();
    
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleDelete = () => {
        if (showConfirmation) {
          dispatch(deletePokemon(id));
          setShowConfirmation(false);
          navigate("/home")
        } else {
          setShowConfirmation(true);
        }
      };
    
    // useEffect(() => {
    //     dispatch(getDetails(id));
    //     return () => dispatch(cleanDetails())
    // }, [id])
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(getDetails(id)).then(() => {
            setIsLoading(false);
          });
        }, 100);
    
        return () => dispatch(cleanDetails())
      }, [id]);

    const { name, speed, attack, defense, life, types, height, weight, image} = details;
    
    if (isLoading) {
        return (
          <div>
            <span
              className={style.loader}
              style={{  
                backgroundImage: `url(${fondo})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                width: '100%',
                height: '100%',}}
            ></span>
          </div>
        );
    }

    return(
        <section className={style.container}>
            
                <div className={style.item}>
                    <div onClick={() => navigate("/home")} className={style.arrow}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-left" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#9e9e9e" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M5 12l14 0" />
                        <path d="M5 12l4 4" />
                        <path d="M5 12l4 -4" />
                        </svg>
                    </div>

                    <img src={image} alt={name}/>
                    <div className="header">
                        <h2>{name}</h2>
                        <h3>{types}</h3>   
                    </div>

                    <div className={style.content}>
                        {speed && <h4>{speed}<span>Speed</span></h4>}
                        {height && <h4>{height}cm<span>Height</span></h4>}
                        {weight && <h4>{weight}<span>Weight</span></h4>}
                        <h4>{attack}<span>Attack</span></h4>
                        <h4>{defense}<span>Defense </span></h4>
                        <h4>{life}<span>HP</span></h4>
                    </div>
                    
                    <div className={style.btnContainer}>
                        {isNaN(id) ? (
                            <button onClick={() => navigate("/modify")} className={style.btnDelete}>
                                Modify
                            </button>
                        ) : null}
                        {isNaN(id) ? (
                           <button onClick={handleDelete} className={style.btnDelete}>
                            {showConfirmation ? 'Confirm Delete' : 'Delete'}
                            </button>
                        ) : null}
                    </div>
                    
                </div>
        </section>
    )
}

export default Details;