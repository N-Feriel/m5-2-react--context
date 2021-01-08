import React  from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import createPersistedState from 'use-persisted-state';

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";

function App(props) {
  const [numCookies, setNumCookies] = React.useState(1000);
  const usePersistedState = createPersistedState('persited')

  const [purchasedItems, setPurchasedItems] = usePersistedState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game  numCookies={numCookies} 
          setNumCookies={setNumCookies}
          purchasedItems={purchasedItems}
          setPurchasedItems={setPurchasedItems}
          />
        </Route>
      </Router>
    </>
  );
}

export default App;
