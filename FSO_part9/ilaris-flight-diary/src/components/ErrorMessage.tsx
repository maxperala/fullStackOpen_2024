const style = {
  color: "red",
  border: "2px solid red",
};

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div style={style}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
