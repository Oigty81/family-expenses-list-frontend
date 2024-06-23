
import { useCategoriesDataStore } from '@stores/categoriesData.js';
import { useExpensesDataStore  } from '@stores/expensesData.js';

import { ajaxRequestForLogin } from '@/utilities/ajax';

import { jwtDecode } from "jwt-decode";

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('userStore', () => {

    const categoriesDataStore  = useCategoriesDataStore();
    const expensesDataStore  = useExpensesDataStore();

    const isAuthenticated = ref (false);
    const userData = ref(undefined);
    const isLoginRequest = ref (false);

    const getUserData = computed(() => {
        if(userData.value === undefined || userData.value === null) {
            return {
                userName: "",
                userId: 0,
                displayName: ""
            };
        } else {
            return userData.value;
        }
    });

    const login = async (username, password) => {
        isLoginRequest.value = true;

        return new Promise((resolve, reject) => {
            ajaxRequestForLogin(username, password)
            .then((response) => {
                const decode = jwtDecode(response.data.token);
                userData.value = decode.data;
                sessionStorage.setItem('accessToken', response.data.token);
                isAuthenticated.value = true;
                isLoginRequest.value = false;
                resolve();
            })
            .catch((err)=> {
                isAuthenticated.value = false;
                isLoginRequest.value = false;
                reject(err);
            });
        });
    };

    const logout = async () => {
        isAuthenticated.value = false;
        sessionStorage.removeItem('accessToken');
        categoriesDataStore.categoriesData = {
            categories : [],
            categoryCompositions: []
        };
        expensesDataStore.expensesData = [];
    };

    const setUserIsAuthenticatedWhenTokenIsAvailableAndValid = async () => {
        if(
            sessionStorage.getItem('accessToken') !== undefined &&
            sessionStorage.getItem('accessToken') !== null &&
            sessionStorage.getItem('accessToken') !== ""
            ) {
                let dateNow = new Date();
                const tokenData = jwtDecode(sessionStorage.getItem('accessToken'));
                console.log('decode', tokenData.exp, dateNow.getTime() / 1000);
                if(tokenData.exp < (dateNow.getTime() / 1000)) {
                    isAuthenticated.value = false;
                    sessionStorage.removeItem('accessToken');
                }  else {
                    isAuthenticated.value = true;
                    userData.value = tokenData.data;
                }
        } else {
            isAuthenticated.value = false;
        }
    };

    return {
        isAuthenticated, getUserData, isLoginRequest,
        login, logout, setUserIsAuthenticatedWhenTokenIsAvailableAndValid
    };
});

