export const Datapoint = (props) => {
  const {side, data, enterData, sendData, index, disabled} = props;

  return (
    (side === 'source')
    ? 
      <div className="container">
        <input type="text" value={data} onChange={ e => enterData(e.target.value, index) } className="text-input"/>
        <button onClick={() => sendData(data, index)} disabled={!data || disabled}>Submit</button>
      </div>
    :
      <div className="container">
        <button>{data}</button>
      </div>
  );
}