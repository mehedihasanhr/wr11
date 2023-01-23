import * as React from 'react';
import './App.css';
import axios from './axios';

import SectorSelectorForm from './components/SectorSelectorForm';
import { useAuth } from './hook/useAuth';

function App() {
  const { auth, login } = useAuth();
  const [sectorData, setSectorData] = React.useState(null);

  React.useEffect(() => {
    login();
  }, []);

  // get sector data

  React.useEffect(() => {
    if (auth) {
      axios.get("/sector").then(res => {
        setSectorData(res.data);
        console.log(res.data)
      })
    }

  }, [auth]);



  return (
    <div className="App">
      <SectorSelectorForm data={sectorData} />
    </div>
  );
}

export default App;
