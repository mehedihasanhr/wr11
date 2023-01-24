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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get sector data

  React.useEffect(() => {
    let un = async () => {
      if (auth) {
        const { data, error } = await axios.get('/sector', {
          headers: {
            contentType: 'application/json',
          },
          withCredentials: true,
        });

        if (error) {
          console.log(error);
        }

        if (data) {
          setSectorData(data);
        }
      }
    }

    un();
  }, [auth]);



  return (
    <div className="App">
      <SectorSelectorForm data={sectorData} />
    </div>
  );
}

export default App;
