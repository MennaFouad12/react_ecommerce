import { createContext, useState } from "react";


export let counter = createContext(0)

export default function CounterContextProvider({children})
{
    let [myCounter,setCounter] = useState(0)
   
    function increase()
    {
        setCounter(myCounter+1)
    }

    return <counter.Provider value={{myCounter,increase}}>
         {children}
    </counter.Provider>
}