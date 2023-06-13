import './App.css';
import { Routes, Route } from "react-router-dom";
import Form from './views/Form/Form';
import Landing from './views/Landing/Landing';
import Home from './views/Home/home';
import Details from './views/Details/Details';
import Nav from './Components/Nav/Nav';
import { useLocation } from 'react-router-dom';

function App() {

  const location = useLocation();
  

  return (
    <div className="App">
     {location.pathname !== "/" && <Nav/>}
     <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/create' element={<Form/>}/>
      <Route path='/details/:id' element={<Details/>}/>
     </Routes>
  
    </div>
  );
}

export default App;
