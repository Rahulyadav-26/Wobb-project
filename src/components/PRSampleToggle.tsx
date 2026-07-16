import React, { useState } from "react";

export interface PRSampleToggleProps {
  initial?: boolean;
}

export const PRSampleToggle: React.FC<PRSampleToggleProps> = ({
  initial = false,
}) => {
  const [on, setOn] = useState<boolean>(initial);

  return (
    <div aria-label="pr-sample-toggle">
      <h4>PR Sample Toggle</h4>
      <p>
        Status: <strong>{on ? "On" : "Off"}</strong>
      </p>
      <button
        type="button"
        onClick={() => setOn((o) => !o)}
        aria-label="toggle"
      >
        Toggle
      </button>
    </div>
  );
};

export default PRSampleToggle;
