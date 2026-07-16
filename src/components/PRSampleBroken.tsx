import React, { useEffect, useState } from "react";

export const PRSampleBroken: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Intentionally wrong: this effect updates count on every render,
    // causing an infinite re-render loop.
    setCount((current) => current + 1);
  }, [count]);

  return (
    <div aria-label="pr-sample-broken">
      <h3>Broken PR Sample</h3>
      <p>Count: {count}</p>
    </div>
  );
};

export default PRSampleBroken;
