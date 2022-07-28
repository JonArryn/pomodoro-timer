import './App.css';
import Home from './Pages/Home';
import Navigation from './Components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from './Context/AppContext';

function App() {
  return (
    <>
      <AppProvider>
        <Navigation />
        <Home />
      </AppProvider>
    </>
  );
}

export default App;
