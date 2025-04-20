import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { STORE_ID } from "@/template-config";

interface StoreContextType {
    id: string | null,
    setId: (_id: string) => void
}

const StoreContext = createContext<StoreContextType>({
    id: null,
    setId: () => { },
})

export const useStore = () => {
    const context = useContext(StoreContext)
    if (!context) {
        throw new Error('useStore must be used within a StoreProvider')
    }

    return context
}

export function StoreProvider({ children }: { children: ReactNode }) {
    const [id, setId] = useState<string | null>(null);

    // ON mount retrieve the ID for the store
    useEffect(() => {
        setId(STORE_ID)
    }, [])
    return (
        <StoreContext.Provider value={{ id, setId }}>
            {children}
        </StoreContext.Provider>
    );
}