import {BASE_URL} from "./auth";
import {useFetch, patchFetch} from "./utilities";
import {ShiftType} from "../types/ShiftType";

export function useFetchShiftsByNurseId(id: string,credentials: string | null,month:string,year:string) {

    let url = `${BASE_URL}/api/shifts/${id}/${month}/${year}`;


    const {data,isLoading} = useFetch(url, credentials);

    let shifts: ShiftType[] | undefined;

    if (data) {
        shifts = data as ShiftType[];
    }

    return {shifts,isLoading};
}
export function useFetchAvailableShiftsByNurseIdAndShift(id: string,credentials: string | null,month:string,year:string,shiftId:string) {

    let url = `${BASE_URL}/api/shifts/${shiftId}/${id}?month=${month}&year=${year}`;


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

export function useFetchAllShifts(month:string,year:string,credentials: string | null,id?:string) {
    let url;
    console.log(month)
    if(id){
         url = `${BASE_URL}/api/shifts/${id}/${month}/${year}`;
    }else{
        let numberMonth = parseInt(month);
        numberMonth--;
        url = `${BASE_URL}/api/shifts?month=${numberMonth}&year=${year}`;
    }


    const {data,isLoading} = useFetch(url, credentials);

    let shifts: ShiftType[] | undefined;

    if (data) {
        shifts = data as ShiftType[];
    }

    return {shifts,isLoading};
}
