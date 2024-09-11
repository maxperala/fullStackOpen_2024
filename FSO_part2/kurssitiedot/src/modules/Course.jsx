const Course = ({course}) => {
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
        elems.push(<Part key={course.id} name={course.name} exercises={course.exercises} />)
    })
    return <div>{elems}</div>
  
  }
  
  const Part = ({name, exercises}) => {
        return(
          <p>{name} {exercises}</p>
        )
  }
  
  const Total = ({courses}) => {
    const total = courses.reduce((total, curr) => {return total + curr.exercises}, 0)
    return (
        <b>Total number of exercises {total}</b>
    )
  }

export default Course;