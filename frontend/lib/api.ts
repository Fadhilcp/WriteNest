import axios from "axios";
import { store } from "@/redux/store";
import { clearCredentials, setCredentials } from "@/redux/authSlice";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.accessToken;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    Promise.reject
);

let isRefreshing = false;

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response?.status === 403 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                if (!isRefreshing) {
                    isRefreshing = true;
                    const response = await api.post("/auth/refresh");

                    store.dispatch(
                        setCredentials({
                            accessToken: response.data.accessToken,
                            user: response.data.user,
                        })
                    );
                    isRefreshing = false;
                }

                const token = store.getState().auth.accessToken;
                originalRequest.headers.Authorization = `Bearer ${token}`;

                return api(originalRequest);
            } catch (error) {
                store.dispatch(clearCredentials());
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default api;