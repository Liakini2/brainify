import {useState} from 'react';
import routes from './routes';
import Header from './Components/Header'
import './styles/App.css'

function App() {
  const [toggle, setToggle] = useState(false)
  const [phoneMenu, setPhoneMenu] = useState(window.innerWidth > 760);

  return (
    <div className="App" onClick={_ => {
      if(window.innerWidth <= 760 && phoneMenu) {
          setPhoneMenu(false);
      } else if(toggle && window.innerWidth > 760) {
        setToggle(false);
      }
    }}>
      <Header toggle={toggle} phoneMenu={phoneMenu} setToggle={setToggle} setPhoneMenu={setPhoneMenu}/>
      {routes}
    </div>
  );
}

export default App;
