import CardsContainer from "../CardsContainer/CardsContainer";
import style from "./Paginated.module.css";

export default function Paginated({
  currentPage,
  pokemons,
  pokemonsPerPage,
  paginado,
}) {
  const pageNumbers = [];
  const totalPages = Math.ceil(pokemons / pokemonsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className={style.ul}>
        {currentPage > 1 && (
          <li className={style.li}>
            <a onClick={() => paginado(currentPage - 1)}>←</a>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li key={number} className={style.li}>
            <a
              onClick={() => paginado(number)}
              className={`${style.pageNumber} ${
                number === currentPage ? style[`colorNumber`] : ""
              }`}
            >
              {number}
            </a>
          </li>
        ))}
        {currentPage < totalPages && (
          <li className={style.li}>
            <a onClick={() => paginado(currentPage + 1)}>→</a>
          </li>
        )}
      </ul>
    </nav>
  );
}
// return(
//     <nav>
//         <ul className={style.ul}>
//         {currentPage > 1 && (
//             <li className={style.li}>
//             <a onClick={() => paginado(currentPage - 1)}>←</a>
//             </li>
//         )}
//         {pageNumbers.map((number) => (
//             <li key={number} className={style.li}>
//             <a
//                 onClick={() => paginado(number)}
//                 className={number === currentPage ? style.active : ""}
//             >
//                 {number}
//             </a>
//             </li>
//         ))}
//         {currentPage < totalPages && (
//             <li className={style.li}>
//             <a onClick={() => paginado(currentPage + 1)}>→</a>
//             </li>
//         )}
//         </ul>

//     </nav>

// )
