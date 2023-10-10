import { useNavigate } from "react-router-dom";
import '../css/Homepage.css';

export const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>UDP Traffic Visualizer</h1>
      <div className="container">
        <button onClick={ () => navigate('/source') }>
            Source
        </button>
        <button onClick={ () => navigate('/destination') }>
          Destination
        </button>
      </div>
    </div>
  );
}