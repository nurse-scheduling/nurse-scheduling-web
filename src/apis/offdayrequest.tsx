import {BASE_URL} from "./auth";
import {patchFetch, useFetch} from "./utilities";
import {OffDayType} from "../types/OffDayType";

export function useFetchOffDays(page: number, size: number, credentials: string | null, status: string, sort?: string, order?: string) {
    let url = `${BASE_URL}/api/off-days?status=${status}&page=${page}&size=${size}`;
    if (sort && order) {
        url += `&sort=${sort},${order}`;
    }
    const {data, isLoading, error} = useFetch(url, credentials);

    let offDays: OffDayType[] | undefined;

    if (data && data.content) {
        offDays = data.content as OffDayType[];
    }

    return {offDays, isLoading, error};
}

export const updateOffDayStatus= async (id: string, status: string, credentials: string | null)=> {
    const url = `${BASE_URL}/api/off-days/${id}?status=${status}`;
    return await patchFetch(url, null, credentials);
}
