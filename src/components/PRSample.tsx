import React, { useState } from "react";

export interface PRSampleProps {
  initial?: number;
}

export const PRSample: React.FC<PRSampleProps> = ({ initial = 0 }) => {
  const [count, setCount] = useState<number>(initial);

  return (
    <section aria-label="pr-sample">
      <h3>PR Sample Component</h3>
      <p>
        Current count: <span>{count}</span>
      </p>
      <button
        type="button"
        onClick={() => setCount((c) => c + 1)}
        aria-label="increment"
      >
        Increment
      </button>
    </section>
  );
};

export default PRSample;
