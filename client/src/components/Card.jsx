import React from "react";
import s from "./styles/card.module.css"

export default function Card({flags, continents, name}){
    return (
        <div className={s.card}>
            <h1>{name}</h1>
            <h5>{continents}</h5>
            <img className={s.imageCard} src={flags} alt="img not found" width="400px" height="250px"/>
        </div>
    )
}
