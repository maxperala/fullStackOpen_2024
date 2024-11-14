import { TotalProps } from "../types";

const Total = (props: TotalProps) => {
  return (
    <div>
      <p>Total number of exercises {props.totalAmuount}</p>
    </div>
  );
};

export default Total;
