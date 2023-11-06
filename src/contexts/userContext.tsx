import React, {createContext, useState} from "react"

const UserContext = createContext({} as any)

export const UserProvider = ({children}: any) => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const value: any = {authenticated, setAuthenticated}

    return (
        <UserContext.Provider value={value}> {children} </UserContext.Provider>
    )
}

export default UserContext;