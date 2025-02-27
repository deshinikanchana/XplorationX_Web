import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        console.log("AxiosInstance Access Token : ",accessToken);
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                console.log("Refresh Token axios line 35 : ",refreshToken);
                if (refreshToken) {
                    const response = await api.post('/auth/refresh-token', {},{
                        headers: {
                            'Authorization': `Bearer ${refreshToken}`
                        }
                    });
                    const { accessToken, refreshToken: newRefreshToken } = response.data;
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', newRefreshToken);

                    return axios(error.config);
                }
            } catch (refreshError) {
                console.log('Refresh token failed:', refreshError);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/signin';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
