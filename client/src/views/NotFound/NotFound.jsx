import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";
import { useState } from "react";
import { useEffect } from "react";
import fondo from "../../Img/fondo1.JPG";

const NotFound = () => {
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div>
        <span
          className={styles.loader}
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

  return (
    <div>
      <div className={styles.content}>
        <div>
          <p className={styles.p}>Oops! Error 404</p>
          <h1 className={styles.h1}> Page not found.</h1>
        </div>
        <div className={styles.contentButton}>
          <Link to="/home">
            <button className={styles.btnPrimary}>Back Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;