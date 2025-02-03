

import { BrowserRouter } from 'react-router'; // <-- Aquí podría estar el Router
import { AppRouter } from './router';
import { Provider } from 'react-redux';
import { store } from './store/store';

export const WeatherApp = () =>{
  return (
    <Provider store={store}>
      <BrowserRouter> {/* <-- Esto es un Router */}
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
}
