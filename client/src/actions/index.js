import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES"
export const ORDER_COUNTRIES = "ORDER_COUNTRIES"
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT"
export const GET_DETAIL_COUNTRY = "GET_DETAIL_COUNTRY"
export const GET_ACTIVITY = "GET_ACTIVITY"
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY"
export const GET_NAME_COUNTRIES = "GET_NAME_COUNTRIES"


//conexión con todo el back
export function getCountries(){
    return async function(dispatch){
        var json = await axios("http://localhost:3001/countries")

        return dispatch({
            type: GET_COUNTRIES,
            payload: json.data,
        })
    }
}

export function order_countries(payload){
    return {
        type: ORDER_COUNTRIES,
        payload
    }
}

export function filterCountryByContinent(payload){
    return{
        type: FILTER_BY_CONTINENT,
        payload
    }
}

export function getDetailCountry(id){
    return async function(dispatch){
        try{
            var json= await axios.get("http://localhost:3001/countries/" + id);
            return dispatch({
                type: GET_DETAIL_COUNTRY,
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}

export function postActivity(data){
    return async function(){
        const response = await axios.post("http://localhost:3001/activity", data);
        return response;
    }
}

export function getActivity(){
    return async function(dispatch){
        const infoActivity = await axios.get("http://localhost:3001/activity");
        return dispatch({
            type: GET_ACTIVITY,
            payload: infoActivity.data
        })
    }

}

export function filterByActivity(payload){
    return{
        type: FILTER_BY_ACTIVITY,
        payload
    }
}

export function getNameCountries(name){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/countries?name=" + name)
            return dispatch({
                type: GET_NAME_COUNTRIES,
                payload: json.data
            })
        } catch(error){
            console.log(error)
        }
    }
}