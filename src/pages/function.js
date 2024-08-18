import Cookies from 'js-cookie';
import fetchData from 'data-fetch-ts';
import { configApi } from '../libs/configApi';

const token = Cookies.get('authToken');
const endpoint = `${configApi.api}get-singel-user`;
export const func = async() =>{
        const res = await fetchData({ endpoint, token });
        console.log('response',res);
}

