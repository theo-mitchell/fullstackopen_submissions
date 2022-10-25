import { useState } from "react";

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  );
};

const FeedbackDisplay = ({text, quantity}) => {
  return (
    <p>{text} {quantity}</p>
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
      <Button 
        onClick={()=> setGood(good + 1)}
        text='good'
      />
      <Button 
        onClick={()=> setNeutral(neutral + 1)}
        text='neutral'
      />
      <Button 
        onClick={()=> setBad(bad + 1)}
        text='bad'
      />
      <h1>statistics</h1>
      <FeedbackDisplay text={'good'} quantity={good}/>
      <FeedbackDisplay text={'neutral'} quantity={neutral}/>
      <FeedbackDisplay text={'bad'} quantity={bad}/>
    </>
  );
};

export default App;
