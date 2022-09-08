import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import InfiniteCrosswordApp from './apps/InfiniteCrossword';
import SpeedTypeApp from './apps/SpeedType';
import PokemonApp from './apps/PokemonCrossword';
import PageHeader from './components/PageHeader';

// IF I am dividing games by url, and separating them into entirely different applications instead of a
// button like toggle, then it will need to take place here.
const AppRouter = () => (
    <BrowserRouter>
      <div>
        <Routes>
            <Route path="/leaderboard" element={<InfiniteCrosswordApp />} exact/>
            <Route path="/games" element={<InfiniteCrosswordApp />} exact />
            <Route path="/speed" element={<SpeedTypeApp />} exact />
            <Route path="/pokemon" element={<PokemonApp />} exact />
            <Route path="/" element={<InfiniteCrosswordApp />}/>
            <Route path = "*" element={
                <div>
                    <br></br>
                    <h2>404 Page not found</h2>
                </div>
            }/>
        </Routes>
        <PageHeader/>
      </div>
      </BrowserRouter>
  );

  // with parameters:    <Route path="/edit/:id" component={EditExpensePage}/>

  export default AppRouter;