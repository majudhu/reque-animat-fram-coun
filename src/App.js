import "./styles.css";
import RequeAnimatFramCoun from "./RequeAnimatFramCoun";

export default function App() {
  return (
    <div className="App">
      <RequeAnimatFramCoun to={80} duration={250}>
        {(number, start, stop, reverse) => (
          <div>
            {number.toFixed(0)}
            <button onClick={start}>start</button>
            <button onClick={() => stop()}>stop</button>
            <button onClick={() => stop(0)}>reset</button>
            <button onClick={reverse}>reverse</button>
          </div>
        )}
      </RequeAnimatFramCoun>
    </div>
  );
}
