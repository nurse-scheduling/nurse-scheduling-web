import {BASE_URL} from "./auth";
import {useFetch, patchFetch} from "./utilities";
import {ShiftType} from "../types/ShiftType";

export function useFetchShiftsByNurseId(id: string,credentials: string | null) {

    let url = `${BASE_URL}/api/nurses/${id}/shifts`;

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

export function useFetchAllShits(credentials: string | null) {

    const url = `${BASE_URL}/api/shifts`;

    const {data,isLoading} = useFetch(url, credentials);

    let shifts: ShiftType[] | undefined;

    if (data) {
        shifts = data as ShiftType[];
    }

    return {shifts,isLoading};
}
