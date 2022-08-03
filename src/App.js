import './App.css';
import Home from './page/Home';
import Navigation from './component/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppProvider from './component/AppProvider';

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
