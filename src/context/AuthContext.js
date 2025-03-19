import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import trackerApi from '../api/tracker'
import { navigate } from "../utils/navigationRef";

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return {...state, errorMessage: action.payload}
        case "signup":
            return { token: action.payload, errorMessage: ""}
        case "signin":
            return {token: action.payload, errorMessage: ""}
        case "signout": 
            return {token: null, errorMessage: ""}
        default: state
    }
}

const signup = (dispatch) => {
    return async ({ email, password ,firstName, lastName, age, dob, gender, location, userType, squad}, callback) => {
      try {
        const response = await trackerApi.post("/signup", { email, password ,firstName, lastName, age, dob, gender, location, userType, squad});
        dispatch({ type: "signup" , payload: response.data.token})
        callback()
        await AsyncStorage.setItem('token', response.data.token)
      } catch (err) {
        dispatch({
          type: "add_error",
          payload: "Something went wrong with signup",
        });
        
        throw new Error("Registration Failed")
        
      }
    };
  };

const signin = (dispatch) => {
    return async ({ email, password }, callback) => {
        try {
          const response = await trackerApi.post("/signin", { email, password });
          await AsyncStorage.setItem('token', response.data.token)
          dispatch({ type: "sign_in" , payload: response.data.token})
          callback()
          navigate("Map")
        } catch (err) {
          console.log(err)
          dispatch({
            type: "add_error",
            payload: "Something went wrong with sign in",
          })
          throw new Error("Signin Failed")
        }
      };
}


const tryLocalSignin = (dispatch) => {
    return async () => {
        const token = await AsyncStorage.getItem('token')
        if(token) {
            dispatch({type: 'signin', payload: token})
            navigate('Map')
        }else {
            navigate('loginFlow')
        }
    }
}

const signout = (dispatch) => {
    return async (callback) => {
      await AsyncStorage.removeItem('token')
      dispatch({type: 'signout'})
      callback()
      navigate('loginFlow')
    }
}

export const {Provider, Context} = createDataContext(
    authReducer,
    {signin, signout, signup, tryLocalSignin},
    {token: null, errorMessage: ''}
)