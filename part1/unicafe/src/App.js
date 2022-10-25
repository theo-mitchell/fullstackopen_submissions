import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (good <= 0 && bad <=0 && neutral <= 0) {
    return (
      <>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </>
    )
  } else {
    return (
      <>
        <h1>statistics</h1>
        <StatisticLine text={"good"} value={good} />
        <StatisticLine text={"neutral"} value={neutral} />
        <StatisticLine text={"bad"} value={bad} />
        <StatisticLine text={"all"} value={good + neutral + bad} />
        <StatisticLine
          text={"average"}
          value={(good - bad) / (good + bad + neutral) || 0}
        />
        <StatisticLine
          text={"positive"}
          value={((good / (good + bad + neutral)) * 100 || 0) + "%"}
        />
      </>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  );
};

export default App;
