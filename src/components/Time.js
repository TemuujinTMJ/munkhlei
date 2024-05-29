'use client'
import React, { useState, useEffect } from "react";

const DateTime = () => {
  const [date, setDate] = useState(new Date());
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    setLoader(false)
    return () => clearInterval(timer);
  }, []);

  return <h2>{ loader ? "" : date.toLocaleTimeString()}</h2>;
};

export default DateTime;
