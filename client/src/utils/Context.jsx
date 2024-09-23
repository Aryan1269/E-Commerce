import { createContext, useState } from "react";

export const userContext = createContext();

const initial = {
    isAuth : '',
    user :'',
}

const MyProvider = ({ children }) => {
   const [user,setUser] = useState(initial);

   
   return (
    <userContext.Provider value={{user,setUser}} >
        {children}
    </userContext.Provider>
   )
};


export default MyProvider;
