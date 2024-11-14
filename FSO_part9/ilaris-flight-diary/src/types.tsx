export interface DiariesProps {
  diaries: DiaryForm[];
}

export interface DiaryForm extends Omit<NewDiary, "comment"> {
  id: string;
}

export interface DiaryProps {
  diary: DiaryForm;
}

export type AppError = string | null;

export type Weather = "sunny" | "rainy" | "cloudy" | "stormy" | "windy";

export type Visibility = "great" | "good" | "ok" | "poor";

export interface NewDiaryProps {
  setDiaries: React.Dispatch<React.SetStateAction<DiaryForm[]>>;
  setError: React.Dispatch<React.SetStateAction<AppError>>;
}

export interface NewDiary {
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}
