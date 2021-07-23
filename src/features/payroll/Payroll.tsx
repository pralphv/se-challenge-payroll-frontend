import React from "react";

interface IPayroll {
  data: Object;
}

export default function Payroll({ data }: IPayroll) {
  return (
    <pre
      style={{
        height: "50vh",
        overflowY: "scroll",
        background: "#1A1D25",
        width: "50vw",
      }}
    >
      <code>{JSON.stringify(data, undefined, 2)}</code>
    </pre>
  );
}
