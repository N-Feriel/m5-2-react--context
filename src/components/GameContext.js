import React from 'react';
import usePersistedState from '../hooks/usePersistedState';
import {items} from '../data';
import useInterval from "../hooks/use-interval.hook";

export const GameContext = React.createContext(null);

const handleCloseTab = (ev) =>{
    localStorage.setItem("stopTime", JSON.stringify(Date.now()));
}

export const GameProvider = ({ children }) => {

    //const usePersistedState = createPersistedState('persited');
    
    const [numCookies, setNumCookies] = usePersistedState(1000, "num-cookies");
    
    
    const [purchasedItems, setPurchasedItems] = usePersistedState({
            cursor: 0,
            grandma: 0,
            farm: 0,
    }, "purchasedItems");
        
        
    const calculateCookiesPerSecond = (purchasedItems) => {
            
            /* logic */
        return Object.keys(purchasedItems).reduce((acc, itemId) => {
            const numOwned = purchasedItems[itemId];
            const item = items.find((item) => item.id === itemId);
            const value = item.value;
            
            return acc + value * numOwned;
        }, 0);
    };
        
    useInterval(() => {
        const numOfGeneratedCookies = calculateCookiesPerSecond(purchasedItems);
        setNumCookies(numCookies + numOfGeneratedCookies);
    }, 1000);
        
        
    React.useEffect(() =>{

        const stopTime = JSON.parse(localStorage.getItem('stopTime'))
    
        const timeDiff =  Date.now() - stopTime ;

        //console.log(timeDiff, 'timeDiff')

        setNumCookies(numCookies + (Math.floor(timeDiff / 1000)* calculateCookiesPerSecond(purchasedItems)));

        //console.log(numCookies, 'cookies')

        window.addEventListener('beforeunload', handleCloseTab); 
    
        return () => {
            window.removeEventListener('beforeunload', handleCloseTab);
        };
    
    }, [])

    


    return <GameContext.Provider 
                value={{
                    numCookies,
                    setNumCookies,
                    purchasedItems,
                    setPurchasedItems,
                    cookiesPerSecond: calculateCookiesPerSecond(purchasedItems)
                }}
            >
                {children}
            </GameContext.Provider>;
};