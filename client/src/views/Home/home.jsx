// import Searchbar from "../../Components/Searchbar/Searchbar";
import CardsContainer from "../../Components/CardsContainer/CardsContainer";
import { getAll, getTypes } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import fondo from "../../Img/fondo1.JPG";
import style from "./Home.module.css";

const Home = () => {
    
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        dispatch(getTypes())
       
    }, []);
    
    useEffect(() => {
        const timer = setTimeout(() => {
          dispatch(getAll()).then(() => {
            setIsLoading(false);
          });
        }, 800);
    
        return () => clearTimeout(timer);

      }, [dispatch]);
    
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
    <div>
        <div>
            {/* <Searchbar/> */}
            <CardsContainer/>
            <a href="#home" className={style.btn} >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-big-up"
                width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" 
                strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M9 20v-8h-3.586a1 1 0 0 1 -.707 -1.707l6.586 -6.586a1 1 0 0 1 1.414 0l6.586 6.586a1 1 0 0 1 -.707 1.707h-3.586v8a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                </svg>
            </a>
        </div>
        
    </div>
 )
}

export default Home;