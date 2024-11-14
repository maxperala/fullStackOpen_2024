import { DiaryForm, DiariesProps } from "../types";
import Diary from "./Diary";

const Diaries = (props: DiariesProps) => {
  const diaries = props.diaries;

  return (
    <ul>
      {diaries.map((d: DiaryForm) => {
        return (
          <li key={d.id}>
            <Diary diary={d} />
          </li>
        );
      })}
    </ul>
  );
};

export default Diaries;
