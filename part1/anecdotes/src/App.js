import { useState } from "react";

const TopAnecdote = ({anecdotes, points, indexOfMostPoints}) => {
  if (indexOfMostPoints != null) {
    return (
      <>
        <h1>Anecdote with most votes</h1>
        {anecdotes[indexOfMostPoints]|| ''}
        <br></br>
        has {points[indexOfMostPoints]} votes
        <br></br>
      </>
    )
  }
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  let [points, setPoints] = useState(new Uint8Array(anecdotes.length));

  const [selected, setSelected] = useState(0);
  const [indexOfMostPoints, setindexOfMostPoints] = useState(null);

  const selectRandomAnecdote = (min, max) => {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const vote = () => {
    const pointsCopy = [...points]
    pointsCopy[selected] += 1 
    setPoints(pointsCopy);
    setindexOfMostPoints(findTopAnecdoteIndex(pointsCopy));
  }

  const findTopAnecdoteIndex = (pointsCopy) => {
    let newindexOfMostPoints = 0;
    for (let i = 0; i < pointsCopy.length; i++) {
      if (pointsCopy[i] >= pointsCopy[newindexOfMostPoints]) {
        newindexOfMostPoints = i;
      }
    }
    return newindexOfMostPoints;
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br></br>
      has {points[selected]} votes
      <br></br>
      <button
        onClick={vote}
      >
        vote
      </button>
      <button
        onClick={() => setSelected(selectRandomAnecdote(0, anecdotes.length - 1))}
      >
        next anecdote
      </button>
      <TopAnecdote 
        anecdotes={anecdotes}
        points={points}
        indexOfMostPoints={indexOfMostPoints}
      />
    </div>
  );
};

export default App;
