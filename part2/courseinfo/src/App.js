const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  );
};

const Content = (props) => {
  return (
    <>
      {
        props.parts.map((part) => {
          return (
            <Part 
              key={part.id} 
              part={part.name} 
              exercises={part.exercises} 
            />
          );
        })
      }
    </>
  );
};

const Total = ({ total }) => {
  return (
    <>
      <b>total of {total} exercises</b>
    </>
  );
}

const Course = (props) => {
  const total = props.course.parts
    .reduce(
      (previousValue, currentValue) => { 
        return previousValue + currentValue.exercises;
      }, 0
    );

  return (
    <>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total total={total}/>
    </>
  );
};

const App = () => {
  // const course = {
  //   id: 1,
  //   name: "Half Stack application development",
  //   parts: [
  //     {
  //       name: "Fundamentals of React",
  //       exercises: 10,
  //       id: 1,
  //     },
  //     {
  //       name: "Using props to pass data",
  //       exercises: 7,
  //       id: 2,
  //     },
  //     {
  //       name: "State of a component",
  //       exercises: 14,
  //       id: 3,
  //     },
  //   ],
  // };

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    courses.map((course) => <Course course={course} />)
  );
};

export default App;