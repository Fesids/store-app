import axios from "axios";
import { mainURI } from "../../constants/uri";


const axiosInstance = axios.create({
    baseURL: mainURI,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default axiosInstance;