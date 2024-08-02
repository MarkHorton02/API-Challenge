import { useState, useEffect } from "react";
import "./Modal.css";
import logo from "./assets/StudioGhibli.png";

export const Modal = () => {
  const [allFilms, setAllFilms] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [modal, setModal] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("https://ghibliapi.vercel.app/films");
      console.log(response);

      if (!response.ok) {
        throw new Error("Something has gone wrong!");
      }

      const filmsData = await response.json();
      setAllFilms(filmsData);
      setErrorMsg("");
    } catch (error) {
      console.log(error.message);
      setErrorMsg(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (film) => {
    setSelectedFilm(film);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setSelectedFilm("");
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div className="container">
      <div className="header">
        <img className="mainLogo" src={logo}/>
        <p>Click on a film poster to learn more!</p>
      </div>

      {errorMsg !== "" && <p>{errorMsg}</p>}

      <div className="films-grid">
        {allFilms.map((film, index) => (
          <img key={index} src={film.image} alt={film.title} onClick={() => openModal(film)} className="filmImages"/>
        ))}
      </div>

      {modal && selectedFilm && (
        <div className="modal">
          <div className="overlay" onClick={closeModal}></div>
          <div className="modal-content">
            <h2 className="filmTitle">{selectedFilm.title}</h2>
            <h3 className="jp">{selectedFilm.original_title} | {selectedFilm.release_date}</h3>
            <p className="desc">{selectedFilm.description}</p>
            <button className="close-modal" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};