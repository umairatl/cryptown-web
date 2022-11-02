import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [crypto, setCrypto] = useState(null);

  useEffect(() => {
    const fetchCrypto = async () => {
      const response = await axios("http://localhost:6000/cryptown/api");
      const json = await response.data;

      if (response.status === 200) {
        setCrypto(json);
      }
    };
    fetchCrypto();
  }, []);

  return (
    <div>
      <h2> hello {crypto && <div>{crypto.mssg}</div>}</h2>
    </div>
  );
}

export default App;
