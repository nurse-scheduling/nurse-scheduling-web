import {BASE_URL} from "./auth";
import {useFetch, patchFetch} from "./utilities";
import {ShiftType} from "../types/ShiftType";

export function useFetchShiftsByNurseId(id: string,credentials: string | null,month:string,year:string) {

    let url = `${BASE_URL}/api/nurses/${id}/shifts?month=${month}&year=${year}`;


    const {data,isLoading} = useFetch(url, credentials);

    let shifts: ShiftType[] | undefined;

    if (data) {
        shifts = data as ShiftType[];
    }

    return {shifts,isLoading};
}

export const exchangeShifts = async (firstNurseId: string, secondNurseId: string, firstShiftId: string, secondShiftId: string, credentials: string | null) => {

    const payload = {
        firstNurseId: firstNurseId,
        secondNurseId: secondNurseId,
        firstShiftId: firstShiftId,
        secondShiftId: secondShiftId
    }
    const url = `${BASE_URL}/api/shifts/exchange`;

    return await patchFetch(url, payload, credentials);

}

export function useFetchAllShits(month:string,year:string,credentials: string | null,id?:string) {
    let url;
    if(id){
         url = `${BASE_URL}/api/nurses/${id}/shifts?month=${month}&year=${year}`;
    }else{
        url = `${BASE_URL}/api/shifts?month=${month}&year=${year}`;
    }


    const {data,isLoading} = useFetch(url, credentials);

    let shifts: ShiftType[] | undefined;

    if (data) {
        shifts = data as ShiftType[];
    }

    return {shifts,isLoading};
}
