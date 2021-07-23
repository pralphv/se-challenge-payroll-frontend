import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./App.css";
import { DOMAIN } from "../constants";
import Payroll from "../features/payroll/Payroll";
import UploadButton from "../features/uploadButton/UploadButton";

enum States {
  loading = "Loading...",
  success = "Success",
  uploading = "Uploading...",
}

function App() {
  const [data, setData] = useState<string>("");
  const [state, setState] = useState<string>(States.loading);
  const [startDate, setStartDate] = useState<Date>(new Date("2020-01-01"));
  const [endDate, setEndDate] = useState<Date>(new Date("2025-01-01"));
  const [i, setI] = useState<number>(0); // purely for re-rendering after fetch

  function refresh() {
    setI(i + 1);
  }

  useEffect(() => {
    async function fetchData() {
      const url = new URL(`${DOMAIN}/payrolls/get`);
      url.searchParams.append("start_date", convertDateToInt(startDate));
      url.searchParams.append("end_date", convertDateToInt(endDate));
      setState(States.loading);
      const resp = await fetch(url.href);
      const data = await resp.json();
      setData(data.message);
      setState(States.success);
    }
    fetchData();
  }, [startDate, endDate, i]);

  return (
    <div className="App">
      <UploadButton
        onUploading={() => {
          setState(States.uploading);
        }}
        onUploadSuccess={() => {
          refresh();
          setState(States.success);
        }}
        onUploadError={(error: string) => {
          setState(error);
        }}
      />
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        showYearDropdown={true}
      />
      <DatePicker
        selected={endDate}
        onChange={(date: Date) => setEndDate(date)}
        showYearDropdown={true}
      />
      <div>{state}</div>
      <Payroll data={data} />
    </div>
  );
}

function convertDateToInt(date: Date) {
  return date.toISOString().split("T")[0].replaceAll("-", "");
}

export default App;
