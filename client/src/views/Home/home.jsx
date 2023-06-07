import Searchbar from "../../Components/Searchbar/Searchbar";
import CardsContainer from "../../Components/CardsContainer/CardsContainer";
import { getAll, getTypes } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAll())
        dispatch(getTypes())
    }, []);

 return(
    <div>
        <Searchbar/>
        <CardsContainer/>
    </div>
 )
}

export default Home;