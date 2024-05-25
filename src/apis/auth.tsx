import {postFetch} from "./utilities";


export const BASE_URL = 'https://nurse-scheduling-server-latest.onrender.com';
export const login = async (tcno: string, password: string) => {
    const url=`${BASE_URL}/auth/charge-nurse/login`;
    const payload = {
        tcKimlikNo:tcno,
        password:password
    }
    return await postFetch(url,payload);
}
