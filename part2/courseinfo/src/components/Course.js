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
            {props.parts.map((part) => {
                return (
                    <Part key={part.id} part={part.name} exercises={part.exercises} />
                );
            })}
        </>
    );
};

const Total = ({ total }) => {
    return (
        <>
            <b>total of {total} exercises</b>
        </>
    );
};

const Course = (props) => {
    const total = props.course.parts.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.exercises;
    }, 0);

    return (
        <>
            <Header course={props.course.name} />
            <Content parts={props.course.parts} />
            <Total total={total} />
        </>
    );
};

export default Course;