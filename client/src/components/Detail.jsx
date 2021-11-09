import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import { getDetailCountry } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import s from "./styles/fondoDetail.module.css"

export default function Detail(){
    const dispatch = useDispatch()
    const paramsCountry = useParams();

    useEffect(() =>{
        dispatch(getDetailCountry(paramsCountry.id))
    }, [])

    
    const {name, flags, continents, capital, area, region, population, activities } = useSelector((state) => state.detailCountry)
return (
    <div className={s.fondoDetail}>
        {
            name ?
            <div className={s.details}>
                <h1>{name}</h1>
                <img src={flags ? flags : flags} alt="" width="100px" height="100px"/>
                <h2>Capital: {capital}</h2>
                <h3>Continente: {continents}</h3>
                <p>Subregion:{region}</p>
                <p>Área: {area} {"\u33A2"}</p>
                <p>Población: {population}</p>
                <p>Actividad: {activities.map(e => (
                    <div>
                        <h4>{e.name}</h4>
                        <p>Dificultad: {e.difficulty}</p>
                        <p>Temporada: {e.season}</p>
                        <p>Duración en minutos: {e.duration || "No definida"}</p>
                        <p>Dificultad: {e.difficulty}</p>
                    </div>
                ))}</p>
            </div> : <p>Loading...</p>
        }
        
    <Link to="/countries">
        <button className={s.btnDetail}>Volver</button>
    </Link>
    

    </div>
)


}