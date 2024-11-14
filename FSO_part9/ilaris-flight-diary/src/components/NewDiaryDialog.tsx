import { NewDiary, NewDiaryProps, Weather, Visibility } from "../types";
import { useState } from "react";
import { addNewDiary, getAllDiaries } from "../services/diaryService";
import { setNewError } from "../services/utils";
import axios from "axios";

const NewDiaryDialog = (props: NewDiaryProps) => {
  const [newDiary, setNewDiary] = useState<NewDiary>({
    date: "2000-01-01",
    weather: "sunny",
    visibility: "great",
    comment: "",
  });

  const createNewEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await addNewDiary(newDiary);
      const diaries = await getAllDiaries();
      props.setDiaries(diaries);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e);
        setNewError(props.setError, e.message);
      } else {
        setNewError(props.setError, "An unknown error occurred");
      }
    }
  };

  const weatherOptions: Weather[] = [
    "sunny",
    "rainy",
    "cloudy",
    "stormy",
    "windy",
  ];
  const visibilityOptions: Visibility[] = ["great", "good", "ok", "poor"];

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={createNewEntry}>
        <div>
          <label>
            Date
            <input
              type="date"
              value={newDiary.date}
              onChange={(e) =>
                setNewDiary({ ...newDiary, date: e.target.value })
              }
            />
          </label>
        </div>
        <div>
          <label>Weather</label>
          {weatherOptions.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="weather"
                value={option}
                checked={newDiary.weather === option}
                onChange={(e) =>
                  setNewDiary({
                    ...newDiary,
                    weather: e.target.value as Weather,
                  })
                }
              />
              {option}
            </label>
          ))}
        </div>
        <div>
          <label>Visibility</label>
          {visibilityOptions.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="visibility"
                value={option}
                checked={newDiary.visibility === option}
                onChange={(e) =>
                  setNewDiary({
                    ...newDiary,
                    visibility: e.target.value as Visibility,
                  })
                }
              />
              {option}
            </label>
          ))}
        </div>
        <div>
          <label>
            Comment
            <input
              type="text"
              onChange={(e) =>
                setNewDiary({ ...newDiary, comment: e.target.value })
              }
            />
          </label>
        </div>
        <button type="submit">Create New</button>
      </form>
    </div>
  );
};
export default NewDiaryDialog;
