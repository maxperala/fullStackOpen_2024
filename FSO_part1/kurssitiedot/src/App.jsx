const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content courses={[{name: part1, exercises: exercises1}, {name: part2, exercises: exercises2}, {name: part3, exercises: exercises3}]} />
      <Total total={exercises1 + exercises2 + exercises3} />
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

const Total = ({total}) => {
  return (
      <p>number of exercises {total}</p>
  )
}

export default App