"use client";
import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import styles from "./Graph.module.css";

export default function BasicLineChart({ data, type, loading }) {
  const [state, setState] = React.useState([]);

  React.useEffect(() => {
    setState(
      data.map((item) => Array.isArray(JSON.parse(item)) && JSON.parse(item))
    );
  }, [data]);

  if (loading && state.length === 0) return "loading";
  return (
    <div className={styles.chartContainer}>
      <LineChart
        xAxis={[
          {
            data: [1, 2, 3, 4],
            label: "Цаг (24н цагийн форматаар)",
            valueFormatter: (value, index, key) => {
              const hour = state[state.length - 1][value - 1]?.hour;
              const date = new Date(hour);

              const hours = date.getUTCHours().toString().padStart(2, "0"); 
              const minutes = date.getUTCMinutes().toString().padStart(2, "0");
              return hour ? `${hours} : ${minutes}` : "";
            },
          },
        ]}
        series={[
          {
            // data: type === "in" ? messages.map((item) => item.avg_intemp) : type === "out" ? messages.map((item) => item.avg_outtemp) : messages.map((item) => item.avg_humidity),
            data: state[state.length - 1]?.map((item) => item[type]),
            color: "#FF573350",
            label: 'Температур (°C)'
          },
        ]}
        width={undefined}
        height={400}
        grid={{ horizontal: true }}
      />
    </div>
  );
}
