import { useState, useEffect, useCallback } from 'react';
import { useBeforeUnload } from 'react-router-dom';
import { useVisualizerParams } from '../hooks/useVisualizerParams'
import { Datapoint } from '../components/Datapoint';
import { AddDatapoint } from '../components/AddDatapoint';
import axios from 'axios';
import { io } from 'socket.io-client'

let startedSocket = false;

// ToDo: need to separate source and destination side logic to different files

export const Visualizer = () => {
  // visualizerParms hook, missing or invalid search query params return as undefined
  const [side, ipAddress, port] = useVisualizerParams();
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState([]);
  
  const UDP_VISUALIZER_HOST=process.env.REACT_APP_UDP_VISUALIZER_BACKEND_HOST;
  const UDP_VISUALIZER_PORT=process.env.REACT_APP_UDP_VISUALIZER_BACKEND_PORT;
  const UDP_VISUALIZER_URL=`http://${UDP_VISUALIZER_HOST}:${UDP_VISUALIZER_PORT}`;

  useEffect(() => {
    if(side === undefined) {
      setErrorMessage("Invalid side chosen");
    } 
  
    if(side === 'source' && ipAddress === undefined) {
      setErrorMessage("Invalid ip address chosen");
    }
  
    if(side === 'source' && ipAddress !== undefined && port === undefined) {
      setErrorMessage("Invalid port chosen");
    }
  
    if(side === 'destination' && port === undefined) {
      setErrorMessage("Invalid port chosen");
    }
  }, [side, ipAddress, port]);

  const sendStartListenRequest = async () => {
    try {
      await axios.post(`${UDP_VISUALIZER_URL}/receive/start`, {
        port: port
      });
    } catch (err) {
      console.log(err);
    }
  }

  const sendStopListenRequest = async () => {
    try {
      await axios.post(`${UDP_VISUALIZER_URL}/receive/stop`, {
        port: port
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if(side === 'destination') {
      // only want to open the socket once per app load
      // startedSocket is here to kind of get around double rendering with strict mode
      // BUT! this behavior should only be run once per app load rather, than any time
      // this component re-renders
      if(!startedSocket) {
        sendStartListenRequest();
        startedSocket = true;
      }
      // make api call to backend app, thatll listen on port ${port}
      // destination side will need to have some sort of websocket/similar to 
      // listen for incoming messages from the backend server when it receives udp messages from the source
    }

    return () => {
      if(side === 'destination') {
        sendStopListenRequest();
      }
    }
  }, []);

  useBeforeUnload(
    useCallback( async () => {
      if(side === 'destination') {
        sendStopListenRequest();
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  const addDatapoint = () => {
    setData([...data, ""]);
  };

  const enterData = (text, indexToSet) => {
    setData(data.map((dataText, index) => {
      if(index === indexToSet) {
        return text;
      }
      return dataText;
    }));
  };

  const sendData = async (userData, indexToRemove) => {
    // make api call to backend app to send udp data to ${ip}:${port}
    try {
      await axios.post(`${UDP_VISUALIZER_URL}/send`, {
        ip: ipAddress,
        port: port,
        message: userData,
      });
      setData(data.filter((item, index) => index !== indexToRemove));
    } catch (err) {
      console.log(err);
    }
  };

  if(side === 'destination') {
    const socket = io(UDP_VISUALIZER_URL);

    socket.on('msg', (msg) => {
      setData([...data, msg]);
    });

    socket.on('disconnect', (reason) => {
      socket.connect();
    });
  }

  return (
    <div>
      {
        (errorMessage) ? <div className="error">{ errorMessage }</div> :
        <div>
          <h1>{ (side === 'source') ? `Sending data to:` : `Receiving data on:` }</h1>
          <h1 className='h1-red'>{ (side === 'source') ? `${ipAddress}:${port}` : `*:${port}` }</h1>
          <h2>{ (side === 'source') ? "Enter Data:" : (data.length === 0) ? "Waiting for data..." : "Received data:" }</h2>
          { data.map((dataText, index) => { return <Datapoint side={side} data={dataText} enterData={enterData} sendData={sendData} key={index} index={index} disabled={errorMessage}/> }) }
          { (side === 'source') ? <AddDatapoint addDatapoint={addDatapoint} /> : "" }
        </div>
      }
    </div>
  );
}