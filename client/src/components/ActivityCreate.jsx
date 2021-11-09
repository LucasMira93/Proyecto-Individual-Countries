import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getCountries, postActivity} from "../actions/index"

import s from "./styles/ActivityCreate.module.css"

function validate(input) {
  let errors = {};
  if (!input.name) {
    
    errors.name = "Please, we need a name";
  } else if (!input.season) {
   
    errors.season = "Please, we need the season";
  } else if (!input.duration) {
    
    errors.duration = "Please, we need the duration";
  } else if (!input.difficulty) {
   
    errors.difficulty = "Please, we need the difficulty";
  }

  return errors;
}

export default function ActivityCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const countriesFounded = useSelector((state) => state.countries);
  const [errors, setErrors] = useState({}); //objeto porque se llena con las propiedades.


  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        difficulty: e.target.value,
      });
    }
    setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
  }

  function handleSelect(e) {
    setInput({
      ...input,
      countries: [...input.countries, e.target.value],
    });
  }

  function handleSeason(e) {
    setInput({
      ...input,
      season: e.target.value,
    });
    setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postActivity(input))
    alert("Actividad creada");
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
    });
    history.push("/countries");
  }

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  function handleDelete(el) {
    setInput({
      ...input,
      countries: input.countries.filter((c) => c !== el),
    });
  }

  function handleBack(){
      history.push("/countries");
  }

  return (



    <div className={s.fondoCrear}>
        <button className={s.volver} onClick={handleBack}>Volver</button>
      <form onSubmit={(e) => handleSubmit(e)}  className={s.formCreate}>


        <div>
          <label>Nombre:</label>
          <input
            type="text"
            placeholder={" Introduce tu actividad..."}
            value={input.name}
            name="name"
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label className={s.lab}>Temporada:</label>
          <div>
            <label>
              <input
                type="checkbox"
                value="Spring"
                name="Spring"
                onChange={(e) => handleSeason(e)}
              />
              Primavera
            </label>
            <label>
              <input
                type="checkbox"
                value="Summer"
                name="Summer"
                onChange={(e) => handleSeason(e)}
              />
              Verano
            </label>
            <label>
              <input
                type="checkbox"
                value="Autumn"
                name="Autumn"
                onChange={(e) => handleSeason(e)}
              />
              Otoño
            </label>
            <label>
              <input
                type="checkbox"
                value="Winter"
                name="Winter"
                onChange={(e) => handleSeason(e)}
              />
              Invierno
            </label>
            {errors.season && <p>{errors.season}</p>}
          </div>
        </div>

        <div>
          <label>Duración:</label>
          <input
            placeholder={" Introduce la cantidad de minutos..."}
            type="text"
            value={input.duration}
            name="duration"
            onChange={handleChange}
            min="0"
            max="600"
          />
          {errors.duration && <p>{errors.duration}</p>}
        </div>


        <div>
          <label className={s.lab}>Dificultad:</label>
          <div>
            <label>
              <input
                type="radio"
                value="1"
                name="difficulty"
                onChange={(e) => handleCheck(e)}
              />
              1
            </label>
            <label>
              <input
                type="radio"
                value="2"
                name="difficulty"
                onChange={(e) => handleCheck(e)}
              />
              2
            </label>
            <label>
              <input
                type="radio"
                value="3"
                name="difficulty"
                onChange={(e) => handleCheck(e)}
              />
              3
            </label>
            <label>
              <input
                type="radio"
                value="4"
                name="difficulty"
                onChange={(e) => handleCheck(e)}
              />
              4
            </label>
            <label>
              <input
                type="radio"
                value="5"
                name="difficulty"
                onChange={(e) => handleCheck(e)}
              />
              5
            </label>
            {errors.difficulty && (
              <p>{errors.difficulty}</p>
            )}
          </div>
        </div>

        <div>
          <label>Countries:</label>
          <select onChange={(e) => handleSelect(e)}>
              <option disabled selected>Elegir país</option>
            {countriesFounded.map((c) => (
              <option value={c.name}>{c.name}</option>
            ))}
          </select>
        
        </div>
<div>

        {input.countries.map((c) => (
          <div>
            <p>{c}</p>
            <p onClick={() => { handleDelete(c)}}>
              X
            </p>
          </div>
        ))}
</div>


{(Object.keys(errors).length || !input.countries.length) ? <button className={s.btnDisable} disabled>
          CREATE YOUR ACTIVITY
        </button> : 
        <button className={s.btn}>
        CREATE YOUR ACTIVITY
      </button>}




      </form>
    </div>
  );
}