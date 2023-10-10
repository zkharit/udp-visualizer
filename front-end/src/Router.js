import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Destination } from './pages/Destination';
import { Homepage } from './pages/Homepage';
import { Source } from './pages/Source';
import { Visualizer } from './pages/Visualizer';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path='/'
          element={ <Homepage /> }
        />
        <Route 
          path='/source'
          element={ <Source /> }
        />
        <Route 
          path='/destination'
          element={ <Destination /> }
        />
        <Route 
          path='/visualizer'
          element={ <Visualizer /> }
        />
        <Route 
          path='*'
          element={ <Homepage /> }
        />
      </Routes>
    </BrowserRouter>
  ); 
}