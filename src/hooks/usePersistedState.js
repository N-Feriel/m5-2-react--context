import {useState, useEffect} from "react";

const usePersistedState = (defaultValue, localStorageId) => {
    const [persistedState, setPersistedState ]= useState(() =>{
        const localStorageData = localStorage.getItem(localStorageId)
        return localStorageData ? JSON.parse(localStorageData) : defaultValue
    });

    useEffect(() => {
        localStorage.setItem(localStorageId, JSON.stringify(persistedState))
    }, [persistedState, localStorageId]);
    return  [persistedState, setPersistedState];
}

export default usePersistedState;