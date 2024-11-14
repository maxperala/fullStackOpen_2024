import { ContentProps, CoursePart } from "../types";
import { assertNever } from "../utils";

const renderParts = (c: CoursePart) => {
  switch (c.kind) {
    case "basic":
      return (
        <div>
          <h4>
            {c.name} {c.exerciseCount}
          </h4>
          <p>{c.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <h4>
            {c.name} {c.exerciseCount}
          </h4>
          <p>Group project exercises: {c.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h4>
            {c.name} {c.exerciseCount}
          </h4>
          <p>{c.description}</p>
          <p>submit to {c.backgroundMaterial}</p>
        </div>
      );
    case "detailed":
      return (
        <div>
          <h4>
            {c.name} {c.exerciseCount}
          </h4>
          <p>required skills: {c.requirements.join(", ")}</p>
        </div>
      );
    default:
      assertNever(c);
  }
};

const Content = (props: ContentProps) => {
  const contents = props.contents;
  return (
    <div>
      {contents.map((c: CoursePart) => {
        return renderParts(c);
      })}
    </div>
  );
};

export default Content;
