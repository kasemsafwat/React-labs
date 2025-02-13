import { createContext, useState } from "react";


export let CounterContext = createContext();

export default function CounterContextProvider({ children }) {
    const [ counter, setCounter ] = useState(10);

    return <CounterContext.Provider value={{ counter, setCounter }}>
        {children}
    </CounterContext.Provider>
} 