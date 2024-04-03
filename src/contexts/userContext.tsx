import React, {createContext, useState} from "react"
import {NurseType} from "../types/NurseType";

const UserContext = createContext({} as any)
export const UserProvider = ({children}: any) => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<NurseType>();
    const [basicAuth, setBasicAuth] = useState<string>("");
    const value: any = {authenticated, setAuthenticated, user, setUser,basicAuth, setBasicAuth}

    return (
        <UserContext.Provider value={value}> {children} </UserContext.Provider>
    )
}

export default UserContext;
