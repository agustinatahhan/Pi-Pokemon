import { getName } from "../../redux/actions/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import fondo from "../../Img/fondo1.JPG";
import style from "./Searchbar.module.css";

const Searchbar = ({ setCurrentPage }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);
    setTimeout(() => {
      dispatch(getName(name)).then(() => {
        setLoading(false);
      });

      setName("");
    }, 1000);
    setCurrentPage(1);
  };

  return (
    <div className={style.principal}>
      <div className={style.inputSearch}>
        <input
          type="text"
          placeholder="Search by name"
          value={name}
          onChange={handleChange}
        />
        <div
          type="submit"
          onClick={(event) => {
            handleSubmit(event);
            setName("");
          }}
          className={style.icon}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-search"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#000000"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>
        </div>
      </div>
      {loading && (
        <div>
          <span
            className={style.loader}
            style={{
              backgroundImage: `url(${fondo})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "100%",
              height: "100%",
            }}
          ></span>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
