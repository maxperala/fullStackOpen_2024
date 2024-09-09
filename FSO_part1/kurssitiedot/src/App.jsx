const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content courses={course.parts} />
      <Total courses={course.parts} />
    </div>
  )
}

const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

const Content = ({courses}) => {
  
  const elems = [];
  courses.forEach((course) => {
      elems.push(<Part name={course.name} exercises={course.exercises} />)
  })
  return <div>{elems}</div>

}

const Part = ({name, exercises}) => {
      return(
        <p>{name} {exercises}</p>
      )
}

const Total = ({courses}) => {
  let total = 0;
  for (const c of courses) {
    total += c.exercises
  }
  return (
      <p>number of exercises {total}</p>
  )
}

export default App