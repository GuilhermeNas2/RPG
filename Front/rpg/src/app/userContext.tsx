'use client'
import { useContext, createContext, useState } from "react";

const UserContext = createContext<any>({});

export function UserProvider({children}:any) {
    const [user, setUser] = useState('')

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
} 

export function useUser() {
    return useContext(UserContext)
}