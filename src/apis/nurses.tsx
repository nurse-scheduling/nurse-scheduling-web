import {BASE_URL} from "./auth";
import {useFetch} from "./utilities";
import {NurseType} from "../types/NurseType";

export function useFetchNurses(page: number, size: number, credentials: string | null,department:string, sort?: string, order?: string) {
    let url = `${BASE_URL}/api/nurses?page=${page}&size=${size}&department=${department}`;
    if (sort && order) {
        url += `&sort=${sort},${order}`;
    }
    const { data, isLoading, error } = useFetch(url, credentials);

    let nurses: NurseType[] | undefined;

    if (data && data.content) {
        nurses = data.content as NurseType[];
    }

    return { nurses, isLoading, error };
}

export function useFetchNursesList(credentials: string | null,department:string) {
    let url = `${BASE_URL}/api/nurses?department=${department}`;

    const { data, isLoading, error } = useFetch(url, credentials);

    let nurses: NurseType[] | undefined;

    if (data && data.content) {
        nurses = data.content as NurseType[];
    }

    return { nurses, isLoading, error };
}

export function useFetchNurse(id: string, credentials: string | null) {
    const url = `${BASE_URL}/api/nurses/${id}`;
    const { data, isLoading, error } = useFetch(url, credentials);
    let nurse: NurseType | undefined;

    if (data) {
        nurse = data as NurseType;
    }

    return { nurse, isLoading, error };
}



