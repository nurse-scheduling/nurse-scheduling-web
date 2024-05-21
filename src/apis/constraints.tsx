import {BASE_URL} from "./auth";
import {postFetch, useFetch} from "./utilities";
import {ConstraintType} from "../types/ConstraintType";

export function useFetchConstraint(credentials: string | null,department:string) {
    let url = `${BASE_URL}/api/constraint?department=${department}`;

    const { data, isLoading, error } = useFetch(url, credentials);

    let constraint: ConstraintType | undefined;
    console.log("DATA",data);

    if (data) {
        constraint = data as ConstraintType;
    }

    return { constraint, isLoading, error };
}

export const createConstraint = async (department: string, payload: number[],credentials : string|null) => {
    let url = `${BASE_URL}/api/constraint?department=${department}`;

    return await postFetch(url,payload,credentials);
}
