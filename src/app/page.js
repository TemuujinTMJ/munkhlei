/* eslint-disable @next/next/no-img-element */
"use client";
import styles from "./page.module.css";
import RadioSwitch from "@/components/RadioSwitch";
import LineChart from "@/components/Graph";
import { useEffect, useState } from "react";
import DateTime from "@/components/Time";

export default function Home() {
  const currentYear = new Date().getFullYear();
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [state, setState] = useState([]);
  const [info, setInfo] = useState({});

  useEffect(() => {
    const socket = new WebSocket("ws://104.197.225.246:1880/ws/receive");

    socket.addEventListener("open", (event) => {
      console.log("WebSocket is open now.");
    });

    socket.addEventListener("message", (event) => {
      console.log("Message from server ", event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
      setLoading(false);
    });

    // socket.addEventListener('error', (event) => {
    //   console.error('WebSocket error observed:', event);
    // });

    socket.addEventListener("close", (event) => {
      console.log("WebSocket is closed now.");
    });

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    setState(
      messages
        .map((item) => {
          const parsedItem = JSON.parse(item);
          return Array.isArray(parsedItem) ? null : parsedItem;
        })
        .filter((item) => item !== null)
        .reduce((acc, obj) => {
          return { ...acc, ...obj };
        }, {})
    );
    const data = [
      '{"orohSens":true,"garahSens":true,"garUdirdlaga":true,"id":"73f23661-68a5-40f0-b099-1c49653dbb0b","from":"webserver"}',
    ];
    const data1 = [
      '{ "id": "73f23661-68a5-40f0-b099-1c49653dbb0b", "inTemp": 0.00, "outTemp": -127.00, "humidity": 0.00, "LeftDoor": false, "RightDoor": false, "isInsert": true, "user": 1 }',
    ];

    // Merge all objects into a single object
    const cleanedData = data.reduce((acc, jsonString) => {
      const parsedObject = JSON.parse(jsonString);
      return { ...acc, ...parsedObject };
    }, {});
    const cleanedData1 = data1.reduce((acc, jsonString) => {
      const parsedObject = JSON.parse(jsonString);
      return { ...acc, ...parsedObject };
    }, {});
    setIsChecked(cleanedData.orohSens);
    setIsChecked1(cleanedData.garahSens);
    setIsChecked2(cleanedData.garUdirdlaga);
    setInfo(cleanedData1);
  }, [messages]);
  if (loading) return loading

  return (
    <main className={styles.main}>
      <div className={styles.top}>
        <h2>Ymar yum yaj yasan yumniih ni yah system</h2>
        <DateTime />
      </div>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img
            src="https://news.num.edu.mn/wp-content/uploads/2016/09/muis-logo-2-170x170.png"
            alt=""
            className={styles.img}
          />
          <h3>MУИC - MXTC - Электроник</h3>
        </div>
        <div className={styles.info}>
          <div
            className={styles.card}
            style={{
              background: "linear-gradient(135deg, #ff67b3 0%, #fad0c4 100%)",
            }}
          >
            <h3>Температур гадна</h3>
            <div className={styles.cool}>
              <h4>{info.outTemp} °C</h4>
              <img src="/outside.png" alt="outside" className={styles.icon} />
            </div>
          </div>
          <div
            className={styles.card}
            style={{
              background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
            }}
          >
            <h3>Температур дотор </h3>
            <div className={styles.cool}>
              <h4>{info.inTemp} °C</h4>
              <img src="/inside.png" alt="inside" className={styles.icon} />
            </div>
          </div>
          <div
            className={styles.card}
            style={{
              background: "linear-gradient(135deg, #fccf49 0%, #ffff77 100%)",
            }}
          >
            <h3>Хаалга</h3>
            <div className={styles.cool}>
              <h4>{info.outTemp}</h4>
              <img src="/door.png" alt="door" className={styles.icon} />
            </div>
          </div>
          <div
            className={styles.card}
            style={{
              background: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
            }}
          >
            <h3>Цонх</h3>
            <div className={styles.cool}>
              <h4>{info.outTemp}</h4>
              <img src="/window.png" alt="window" className={styles.icon} />
            </div>
          </div>
        </div>
        <div className={styles.controllers}>
          <div
            className={styles.controller}
            style={{
              background: !isChecked
                ? "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)"
                : "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
            }}
          >
            <h3>Opoх Cэнс</h3>
            <RadioSwitch isChecked={isChecked} setIsChecked={setIsChecked} />
          </div>
          <div
            className={styles.controller}
            style={{
              background: !isChecked1
                ? "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)"
                : "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
            }}
          >
            <h3>Гapax cэнс</h3>
            <RadioSwitch isChecked={isChecked1} setIsChecked={setIsChecked1} />
          </div>
          <div
            className={styles.controller}
            style={{
              background: !isChecked2
                ? "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)"
                : "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
            }}
          >
            <h3>Гар удирдлаrа</h3>
            <RadioSwitch isChecked={isChecked2} setIsChecked={setIsChecked2} />
          </div>
        </div>
      </div>
      <div className={styles.graphs}>
        <div className={styles.graph}>
          <h3>Дотор Температур</h3>
          <LineChart data={messages} type="avg_intemp" loading />
        </div>
        <div className={styles.graph}>
          <h3>Гадна Температур</h3>
          <LineChart data={messages} type="avg_outtemp" loading />
        </div>
        <div className={styles.graph}>
          <h3>Чийгшил</h3>
          <LineChart data={messages} type="avg_humidity" loading />
        </div>
      </div>
      <div className={styles.copyright}>
        <p>&copy; {currentYear} Your Company. All rights reserved.</p>
      </div>
    </main>
  );
}
