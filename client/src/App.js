import "./App.css";
import { Routes, Route } from "react-router-dom";
import Form from "./views/Form/Form";
import Landing from "./views/Landing/Landing";
import Home from "./views/Home/home";
import Details from "./views/Details/Details";
import Nav from "./Components/Nav/Nav";
import Modify from "./views/Modify/Modify";
import NotFound from "./views/NotFound/NotFound";
import Login from "./views/Login/Login";
import Account from "./views/Account/Account";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <Nav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Form />} />
        <Route path="/modify" element={<Modify />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/account" element={<Account/>}/>
      </Routes>
    </div>
  );
}

export default App;
