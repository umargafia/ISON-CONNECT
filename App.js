import { Provider } from 'react-redux';

import HomeComponent from './Home';
import store from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <HomeComponent />
    </Provider>
  );
}
