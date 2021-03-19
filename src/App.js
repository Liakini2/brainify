import routes from './routes';
import Header from './Components/Header'
import './styles/App.css'

function App() {
  return (
    <div className="App">
      <Header/>
      {routes}
    </div>
  );
}

export default App;
