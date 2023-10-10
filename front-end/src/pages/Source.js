import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Source = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [port, setPort] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const submitSourceVisualizer = () => {
    const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;

    if(!ipv4Regex.test(ipAddress)) {
      setErrorMessage("Enter a valid IP Address");
    } else if(port < 1 || port > 65535 || !Number.isInteger(+port)) {
      setErrorMessage("Enter a valid port value between 1-65535");
    } else {
      return navigate(`/visualizer?side=source&ip=${ipAddress}&port=${port}`);
    }
  }

  return (
    <div>
      <h1>Configuring Source UDP Visualizer</h1>
      { errorMessage && <div className="error" >{ errorMessage }</div> }
      <div className="container">
        <label >IP Address:
          <input
            type="text"
            placeholder="0.0.0.0"
            value={ipAddress}
            onChange={e => setIpAddress(e.target.value)}
            id="ip"
            className="text-input"/>
        </label>
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
            // disabled={!ipAddress || !port }
            onClick={submitSourceVisualizer}>
        Go!
        </button>
      </div>
    </div>
  );
}