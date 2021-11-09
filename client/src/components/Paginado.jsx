import React from "react";
import styles from "./styles/paginado.module.css"


export default function Paginado({countriesPerPage, allCountries, paginado}){
    const pageNumbers = []

    for(let i=0; i<=Math.floor(allCountries/countriesPerPage); i++){
        pageNumbers.push(i+1)
    }

    return (
        <nav>
            <ul className={`${styles.paginado}`}>
                {pageNumbers && pageNumbers.map(number =>(
                    <div className="num" key={number}>
                    <div onClick = {() => paginado(number)}>{number}</div>
                    </div>
                ))}
                </ul>
        </nav>
    )
}