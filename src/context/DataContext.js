import createDataContext from "./createDataContext";
import trackerApi from '../api/tracker'

const dataReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return {...state, errorMessage: action.payload}
        case 'fetchData':
            return {user: action.payload.user, squad: action.payload.squad, errorMessage: "", entries: action.payload.entries}
        case 'fetchEntries':
            return {...state, entries: action.payload.entries, errorMessage: ""}
        case 'signout':
            return {user: null, squad: null, errorMessage: '', entries: []}
        case 'addEntry': 
            return {...state, entries: [...state.entries, action.payload]}
        case 'removeEntry': 
            return {
              ...state,
              entries: state.entries.filter((entry) => entry.id !== action.payload),
            };
        default: state
    }
}

const fetchData = (dispatch) => {
    return async () => {
        try {
            const userResponse = await trackerApi.get("/user");  
            const squadResponse = await trackerApi.get("/squad", {
                params: { squadName: userResponse.data.squad },
            });
            const mapResponse = await trackerApi.get("/markers", {
                params: { squadName: userResponse.data.squad },
            });
            dispatch({ type: "fetchData", payload: {user: userResponse.data, squad: squadResponse.data, entries: mapResponse.data}})
        } catch (err) {
            dispatch({
                type: "add_error",
                payload: "Something went wrong with fetching",
            });
        }
    };
};

const fetchEntries = (dispatch) => {
    
    return async () => {
        try {
            const userResponse = await trackerApi.get("/user");
            const response = await trackerApi.get("/markers", {
                params: { squadName: userResponse.data.squad },
            });
            dispatch({ type: "fetchEntries", payload: {entries: response.data}})
        }catch (err) {
            dispatch({
                type: "add_error",
                payload: "Something went wrong with fetching",
            });
        }
    }
}

const addEntry = (dispatch) => {
    return async ({type, latitude, longitude}) => {
        
        const id = Math.random().toString(36).substr(2, 9);
        try {
            const userResponse = await trackerApi.get("/user");
            const creatorID = userResponse.data._id
            const creator = userResponse.data.firstName + " " + userResponse.data.lastName
            const entry = {id: id, type: type, latitude: latitude, longitude: longitude, creator: creator, creatorID: creatorID,date: new Date().toISOString().split('T')[0]}
            const response = await trackerApi.patch("/add_entry", {
                entry: entry
              });
            dispatch({ type: "addEntry", payload: entry})
        }catch(err) {
            console.log(err)
            dispatch({
                type: "add_error",
                payload: "Something went wrong with fetching",
            });
        }
    }
}

const removeEntry = (dispatch) => {
    return async ({id}) => {
        try {
            await trackerApi.patch("/remove_entry", {id: id})
            dispatch({ type: "removeEntry", payload: id})
        }catch(err) {
            console.log(err)
            dispatch({
                type: "add_error",
                payload: "Something went wrong with removing",
            });
        }
    }
}

const clear = (dispatch) => {
    return () => {
        dispatch({type: 'signout'})
    }
}



export const {Provider, Context} = createDataContext(
    dataReducer,
    {fetchData, addEntry, fetchEntries, clear, removeEntry},
    {user: null, squad: null, errorMessage: '', entries: []}
)