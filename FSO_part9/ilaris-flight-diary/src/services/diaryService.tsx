import axios from "axios";
import { DiaryForm, NewDiary } from "../types";

export const getAllDiaries = async () => {
  const res = await axios.get<DiaryForm[]>("http://localhost:3000/api/diaries");
  console.log(res);
  return res.data;
};

export const addNewDiary = async (newd: NewDiary) => {
  const res = await axios.post<DiaryForm>(
    "http://localhost:3000/api/diaries",
    newd
  );
  return res.data;
};
