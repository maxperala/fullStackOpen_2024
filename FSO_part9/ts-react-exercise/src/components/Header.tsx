import { HeaderProps } from "../types";

const Header = (props: HeaderProps) => {
  return (
    <div>
      <h1>{props.courseName}</h1>
    </div>
  );
};

export default Header;
