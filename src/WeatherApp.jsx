

import { BrowserRouter } from 'react-router-dom'; // <-- Aquí podría estar el Router
import { AppRouter } from './router';

export const WeatherApp = () =>{
  return (
    <BrowserRouter> {/* <-- Esto es un Router */}
      <AppRouter />
    </BrowserRouter>
  );
}
