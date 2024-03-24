
const {main_url}=process.env;
import axios from "axios";
// import { useDispatch, useSelector} from "react-redux";
import { getCookie } from "cookies-next";
const api_base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
const axiosClient = axios.create({
    baseURL: `${api_base_url}/api/`,
});
axiosClient.interceptors.request.use((config) => {
     const token =   getCookie('authToken');
    // const token =   "kazi";
    config.headers.Authorization ="Bearer "+token;
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        try {
            const { response } = error;
            if (response.status === 401) {
                //    401 Unauthorized;
                localStorage.removeItem("ACCESS_TOKEN");
            }

            if (response.status === 405) {
                alert("Method Not Allowed");
            }

            return response;
        } catch (e) {
            console.error(e);
        }

        throw error;
    }
);

export default axiosClient;