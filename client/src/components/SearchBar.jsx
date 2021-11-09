import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountries } from "../actions";
import s from "./styles/searchBarBtn.module.css"

export default function SearchBar(){
    const dispatch = useDispatch()
    const[name, setName] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameCountries(name))
    }

    return(
        <div>
            <input
            type="text"
            placeholder="Buscar..."
            onChange={(e) => handleInputChange(e)}
            />
            <button type="submit" onClick={(e) => handleSubmit(e)}  className={s.searchBarBtn}>Buscar</button>
        </div>
    )
}