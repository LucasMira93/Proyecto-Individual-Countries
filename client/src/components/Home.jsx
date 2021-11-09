import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux" 
import { getCountries } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card"
import Paginado from "./Paginado";
import { order_countries, filterCountryByContinent, getActivity, filterByActivity } from "../actions";
import SearchBar from "./SearchBar";

import s from "./styles/home.module.css"

export default function Home(){
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries)
    const activities = useSelector((state) => state.activities)
    const [orden, setOrden] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(10)
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() =>{
        dispatch(getCountries())
        dispatch(getActivity())
    }, [dispatch])

    function handleClick(e){
        e.preventDefault()
        dispatch(getCountries());
    }


    function handleSort(e){
        e.preventDefault();
        dispatch(order_countries(e.target.value));
        setCurrentPage(1);
        setOrden(`ORDER_COUNTRIES ${e.target.value}`)
    }

    function handleFilterContinent(e){
        dispatch(filterCountryByContinent(e.target.value))
        setCurrentPage(1)
    }

    function handleActivity(e){
        dispatch(filterByActivity(e.target.value))
        setCurrentPage(1)
    }



    return (
        <div className={s.fondoCountries}>
            <Link to="/activity" className={s.buttonCrear}>Crear actividad</Link>
            <h1>Disfruta de todos los países</h1>
            <button onClick={e => {handleClick(e)}}  className={s.buttonCargar}>
                Volver a cargar todos los países
            </button>    
            
        <div>
                <select onChange={e => handleFilterContinent(e)}>
                    <option value="All">Todos los Continentes</option>
                    <option value="North America">América del Norte</option>
                    <option value="South America">América del Sur</option>
                    <option value="Europe">Europa</option>
                    <option value="Asia">Asia</option>
                    <option value="Africa">África</option>
                    <option value="Oceania">Oceanía</option>
                    <option value="Antarctica">Antártica</option>
                </select>

                <select onChange={e => handleSort(e)}>
                    <option value="alf-asc">A-Z</option>
                    <option value="alf-des">Z-A</option>
                    <option value="pob-">-Poblacion</option>
                    <option value="pob+">+Población</option>
                    </select>

                <select onChange={e => handleActivity(e)}>
                    <option value="All">Actividad turística</option>
                    {activities.map(e => <option key={e.id} value={e.name}>{e.name}</option>)}
                </select>

                <SearchBar/>

                <Paginado
                countriesPerPage={countriesPerPage}
                allCountries={allCountries.length}
                paginado={paginado}/>
                
                <div className={s.containerCard}>


{
   currentCountries?.map((e) =>{
       return(
            <div key={e.alpha3Code}>
                <Link to= {`/countries/${e.alpha3Code}`}>
                    <Card name={e.name} continents={e.continents} flags={e.flags ? e.flags : e.flags}/>
                </Link>
            </div>
         )
   })
}


</div>
    </div>
        </div>
    )
}