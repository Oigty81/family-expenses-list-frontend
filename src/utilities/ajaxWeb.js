import axios from "axios";

import { useUserStore  } from '@/stores/user';

export const ajaxWebRequestForLogin = (username, password) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: import.meta.env.VITE_LOCAL_REQUEST_BASE + import.meta.env.VITE_LOCAL_REQUEST_BASE_VERSION + "/user/auth",
            params: {
                username: username,
                password: password
            }
        })
        .then((response) => {
            resolve(response);
        })
        .catch((response) => {
            if(response.response.status >= 500) {
                reject({
                    status: response.response.status,
                    text: "Server Error"
                });
            } else {
                reject(response.response.data);
            }
        });
    });
};

export const ajaxWebRequestAuthWithParams = (route, method = 'get', params = {}) => {
    const userStore = useUserStore();

    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: import.meta.env.VITE_LOCAL_REQUEST_BASE + import.meta.env.VITE_LOCAL_REQUEST_BASE_VERSION + route,
            headers: {
                "Authorization" : "Bearer " + sessionStorage.getItem('accessToken')
            },
            params: params
        })
        .then((response) => {
            resolve(response);
        })
        .catch((response) => {
            if(response.response.status >= 500) {
                reject({
                    status: response.response.status,
                    text: "Server Error"
                });
            } else {
                if(response.response.status === 401 || response.response.status === 403) {
                    userStore.logout();
                    window.location.href = "/";
                }
                reject({
                    status: response.response.status,
                    text: "Client Error",
                    data: response.response
                });
            }
        });
    });
};

export const ajaxWebRequestAuthWithData = (route, method = 'post', data = {}) => {
    const userStore = useUserStore();

    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: import.meta.env.VITE_LOCAL_REQUEST_BASE + import.meta.env.VITE_LOCAL_REQUEST_BASE_VERSION + route,
            headers: {
                "Authorization" : "Bearer " + sessionStorage.getItem('accessToken')
            },
            data: data
        })
        .then((response) => {
            resolve(response);
        })
        .catch((response) => {
            if(response.response.status >= 500) {
                reject({
                    status: response.response.status,
                    text: "Server Error"
                });
            } else {
                if(response.response.status === 401 || response.response.status === 403) {
                    userStore.logout();
                    window.location.href = "/";
                }
                reject({
                    status: response.response.status,
                    text: "Client Error",
                    data: response.response
                });
            }
        });
    });
};