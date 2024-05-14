import { createContext,useState } from "react";

const TeamContext = createContext()


const TeamContextProvider = ({children}) => {
    
    const [teamName,setTeamName] = useState();
    const [answers,setAnswers] = useState([]);

    return <TeamContext.Provider value={{teamName,setTeamName,answers,setAnswers}}>
        {children}
    </TeamContext.Provider>

}

export {TeamContext,TeamContextProvider}

