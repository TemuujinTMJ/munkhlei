"use client";
import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import styles from "./Graph.module.css";

export default function BasicLineChart() {
  return (
    <div className={styles.chartContainer}>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
            area: true,
            color: "#FF5733",
          },
        ]}
        width={undefined}
        height={400}
        grid={{ horizontal: true }}
      />
    </div>
  );
}
