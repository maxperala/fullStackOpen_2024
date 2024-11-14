import { DiaryProps } from "../types";

const Diary = (props: DiaryProps) => {
  const diary = props.diary;
  return (
    <div>
      <h4>{diary.date}</h4>
      <div>
        <p>visibility: {diary.visibility}</p>
        <p>weather: {diary.weather}</p>
      </div>
    </div>
  );
};

export default Diary;
