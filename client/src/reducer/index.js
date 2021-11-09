import {GET_COUNTRIES, GET_DETAIL_COUNTRY, ORDER_COUNTRIES, FILTER_BY_CONTINENT, GET_ACTIVITY, FILTER_BY_ACTIVITY, GET_NAME_COUNTRIES} from "../actions/index"

const initialState ={
    countries : [],
    allCountries: [],
	detailCountry: {},
	activities: [],
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_COUNTRIES:
            return{
                ...state,
                countries: action.payload,
                allCountries: action.payload

            }
            case ORDER_COUNTRIES:
                let sortCountry;

				
			if (action.payload === 'alf-asc') {
				sortCountry = state.countries.sort(function (a, b) {
					if (a.name > b.name) {
						return 1;
					}
					if (a.name < b.name) {
						return -1;
					}
					return 0;
				});
			}
			if (action.payload === 'alf-des') {
				sortCountry = state.countries.sort(function (a, b) {
					if (a.name > b.name) {
						return -1;
					}
					if (a.name < b.name) {
						return 1;
					}
					return 0;
				});
			}
			if (action.payload === 'pob+') {
				sortCountry = state.countries.sort(function (a, b) {
					if (a.population > b.population) {
						return -1;
					}
					if (a.population < b.population) {
						return 1;
					}
					return 0;
				});
			}
			if (action.payload === 'pob-') {
				sortCountry = state.countries.sort(function (a, b) {
					if (a.population > b.population) {
						return 1;
					}
					if (a.population < b.population) {
						return -1;
					}
					return 0;
				});
			}
                return{
                    ...state,
                    countries: sortCountry
                }

                case FILTER_BY_CONTINENT:
                    const allCountries = state.allCountries
                    const continentsFiltered = action.payload === "All" ? allCountries : allCountries.filter(e => e.continents === action.payload)
                return{
                    ...state,
                    countries: continentsFiltered
                }

                case GET_DETAIL_COUNTRY:{
                    return{
                        ...state,
						detailCountry: action.payload
                    }
				}
				case GET_ACTIVITY:{
					return{
						...state,
						activities: action.payload
					}
				}

				case FILTER_BY_ACTIVITY:
                    const allCountries2 = state.allCountries
                    const continentsFiltered2 = action.payload === "All" ? allCountries2 : allCountries2.filter(e => e.activities.find(e => e.name === action.payload))
                return{
                    ...state,
                    countries: continentsFiltered2
                }

				case GET_NAME_COUNTRIES:
					return{
						...state,
						countries: action.payload
					}

            default:
                return state;
    }
}

export default rootReducer;