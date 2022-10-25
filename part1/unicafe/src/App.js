import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const FeedbackDisplay = ({ text, quantity }) => {
  return (
    <p>
      {text} {quantity}
    </p>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  return (
    <>
      <h1>statistics</h1>
      <FeedbackDisplay text={"good"} quantity={good} />
      <FeedbackDisplay text={"neutral"} quantity={neutral} />
      <FeedbackDisplay text={"bad"} quantity={bad} />
      <FeedbackDisplay text={"all"} quantity={good + neutral + bad} />
      <FeedbackDisplay
        text={"average"}
        quantity={(good - bad) / (good + bad + neutral) || 0}
      />
      <FeedbackDisplay
        text={"positive"}
        quantity={((good / (good + bad + neutral)) * 100 || 0) + "%"}
      />
    </>
  );
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
