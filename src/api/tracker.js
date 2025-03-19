import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";

const trackerApi = axios.create({
    baseURL: 'https://geosquad-api.vercel.app'
})

trackerApi.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token'); // Or wherever you store the token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default trackerApi