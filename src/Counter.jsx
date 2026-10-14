import { useState } from "react";

function Counter(props) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{count}</h1>

      <h2>Name: {props.name}</h2>
      <h3>Age: {props.age}</h3>

      <button onClick={() => setCount(count + 1)}>
        Add
      </button>

      <button onClick={() => setCount(count - 1)}>
        Minus
      </button>
    </div>
  );
}

export default Counter;