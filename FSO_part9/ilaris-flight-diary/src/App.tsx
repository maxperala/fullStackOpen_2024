import { useEffect, useState } from "react";
import Diaries from "./components/Diaries";
import ErrorMessage from "./components/ErrorMessage";
import NewDiaryDialog from "./components/NewDiaryDialog";
import { AppError, DiaryForm } from "./types";
import { getAllDiaries } from "./services/diaryService";
import { setNewError } from "./services/utils";
import axios from "axios";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryForm[]>([]);
  const [error, setError] = useState<AppError>(null);

  useEffect(() => {
    getAllDiaries()
      .then((data) => {
        setDiaries(data);
      })
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          setNewError(setError, e.message);
        } else {
          setNewError(setError, "An unknown eror occurred getting diaries");
        }
      });
  }, []);

  return (
    <div>
      {error ? <ErrorMessage message={error} /> : null}
      <NewDiaryDialog setDiaries={setDiaries} setError={setError} />
      <Diaries diaries={diaries} />
    </div>
  );
};

export default App;
