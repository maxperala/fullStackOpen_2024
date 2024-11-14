export type HeaderProps = {
  courseName: string;
};

export type ContentProps = {
  contents: CoursePart[];
};

export type TotalProps = {
  totalAmuount: number;
};

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartWithDesc extends CoursePartBase {
  description: string;
}

export interface CoursePartBasic extends CoursePartWithDesc {
  kind: "basic";
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

export interface CoursePartBackground extends CoursePartWithDesc {
  backgroundMaterial: string;
  kind: "background";
}

export interface CoursePartDetailed extends CoursePartWithDesc {
  requirements: Array<string>;
  kind: "detailed";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartDetailed;
