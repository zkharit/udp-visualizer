import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Destination = () => {
  const [port, setPort] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const submitDestinationVisualizer = () => {
    if(port < 1 || port > 65535 || !Number.isInteger(+port)) {
      setErrorMessage("Enter a valid port value between 1-65535");
    } else {
      return navigate(`/visualizer?side=destination&port=${port}`);
    }
  }

  return (
    <div>
      <h1>Configuring Destination UDP Visualizer</h1>
      { errorMessage && <div className="error" >{ errorMessage }</div> }
      <div className="container">
        <label >Port:
          <input 
            type="number"
            value={port}
            onChange={e => setPort(e.target.value)}
            placeholder="0"
            id="port"
            className="text-input"/>
        </label>
      </div>
      <div className="container">
        <button
          // disabled={!port }
          onClick={submitDestinationVisualizer}
        >Go!
        </button>
      </div>
    </div>
  );
}