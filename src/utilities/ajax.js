import { ajaxWebRequestForLogin, ajaxWebRequestAuthWithParams, ajaxWebRequestAuthWithData } from '@/utilities/ajaxWeb';
import { ajaxAppRequestForLogin, ajaxAppRequestAuthWithParams, ajaxAppRequestAuthWithData } from '@/utilities/ajaxApp';

export const ajaxRequestForLogin = (username, password) => {
    if(
        import.meta.env.VITE_LOCAL_USE_FOR === null ||
        import.meta.env.VITE_LOCAL_USE_FOR === undefined ||
        import.meta.env.VITE_LOCAL_USE_FOR.toLowerCase() === "web"
        ) {
            return ajaxWebRequestForLogin(username, password);
      } else if(import.meta.env.VITE_LOCAL_USE_FOR.toLowerCase() === "app"){
        return ajaxAppRequestForLogin(username, password);
      } else {
        return null;
      }
   
};

export const ajaxRequestAuthWithParams = (route, method = 'GET', params = {}) => {
    if(
        import.meta.env.VITE_LOCAL_USE_FOR === null ||
        import.meta.env.VITE_LOCAL_USE_FOR === undefined ||
        import.meta.env.VITE_LOCAL_USE_FOR.toLowerCase() === "web"
        ) {
            return ajaxWebRequestAuthWithParams(route, method, params);
      } else if(import.meta.env.VITE_LOCAL_USE_FOR.toLowerCase() === "app"){
        return ajaxAppRequestAuthWithParams(route, method, params);
      } else {
        return null;
      }
   
};

export const ajaxRequestAuthWithData = (route, method = 'POST', data = {}) => {
    if(
        import.meta.env.VITE_LOCAL_USE_FOR === null ||
        import.meta.env.VITE_LOCAL_USE_FOR === undefined ||
        import.meta.env.VITE_LOCAL_USE_FOR.toLowerCase() === "web"
        ) {
            return ajaxWebRequestAuthWithData(route, method, data);
      } else if(import.meta.env.VITE_LOCAL_USE_FOR.toLowerCase() === "app"){
        return ajaxAppRequestAuthWithData(route, method, data);
      } else {
        return null;
      }
};