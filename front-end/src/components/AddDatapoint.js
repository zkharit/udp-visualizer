export const AddDatapoint = (props) => {
  const { addDatapoint } = props;

  return (
    <div className="container">
      <button onClick={ addDatapoint }>+</button>
    </div>
  );
}