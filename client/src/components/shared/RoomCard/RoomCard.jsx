import Switch from "../Switch/Switch";

import styles from "./RoomCard.module.scss";

import { ReactComponent as Battery } from "../../../assets/icons/Battery.svg";
import { ReactComponent as Thermometer } from "../../../assets/icons/Thermometer.svg";
import { ReactComponent as Drop } from "../../../assets/icons/Drop.svg";
import { ReactComponent as Sun } from "../../../assets/icons/Sun.svg";

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import notificationContext from "../../../contexts/notificationContext";

const RoomCard = ({ uuid }) => {
  const [isSwitchedOn, setIsSwitchedOn] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [data, setData] = useState(null);
  const [roomData, setRoomData] = useState(null);

  const [types, setTypes] = useState(null);

  const { setNotification } = useContext(notificationContext);

  useEffect(() => {
    api.get(`/room/${uuid}/`).then((res) => {
      setRoomData(res.data);
    });
  }, [uuid]);

  useEffect(() => {
    roomData && setIsSwitchedOn(roomData.state);
    roomData &&
      roomData.boxes.length > 0 &&
      api.get(`/data/get/${roomData.boxes[0].uuid}/latest/`).then((res) => {
        res.data && setData(res.data);
      });
  }, [roomData]);

  useEffect(() => {
    roomData &&
      isTouched &&
      api
        .patch(`/room/update/${uuid}/`, { state: isSwitchedOn })
        .then((res) => {
          res.status === 200 &&
            setNotification({
              show: true,
              type: "info",
              text: `Relevés ${isSwitchedOn ? "ON" : "OFF"} dans ${
                roomData.name
              }`,
            });
        })
        .catch(() => {
          setNotification({
            show: true,
            type: "error",
            text: "Une erreur est survenue",
          });
        });
  }, [isSwitchedOn]);

  useEffect(() => {
    api.get("/data-type/all/").then((res) => setTypes(res.data));
  }, []);

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <Link
          to={uuid ? "/rooms/" + uuid + "/" : "/"}
          className={styles.headerLeft}
        >
          <div
            className={styles.color}
            style={{
              "--color": roomData ? roomData.color : "#000",
            }}
          ></div>
          <h2>{roomData && roomData.name}</h2>
        </Link>
        <div className={styles.headerRight}>
          <Switch
            touched={isTouched}
            setTouched={setIsTouched}
            state={isSwitchedOn}
            setState={setIsSwitchedOn}
          />
        </div>
      </header>
      <ul className={styles.list}>
        <li className={styles.detail}>
          <div className={styles.icon}>
            <Thermometer className={styles.thermometer} />
          </div>
          <span className={styles.value}>
            {data &&
            types &&
            data.filter(
              (e) =>
                types.find((el) => el.name === "temperature") &&
                e.data_type === types.find((el) => el.name === "temperature").id
            ).length > 0 &&
            data.filter(
              (e) =>
                types.find((el) => el.name === "temperature") &&
                e.data_type === types.find((el) => el.name === "temperature").id
            )[0].value
              ? `${
                  data.filter(
                    (e) =>
                      types.find((el) => el.name === "temperature") &&
                      e.data_type ===
                        types.find((el) => el.name === "temperature").id
                  )[0].value
                } °C`
              : "--"}
          </span>
        </li>
        <li className={styles.detail}>
          <div className={styles.icon}>
            <Drop className={styles.drop} />
          </div>
          <span className={styles.value}>
            {data &&
            types &&
            data.filter(
              (e) =>
                types.find((el) => el.name === "humidity") &&
                e.data_type === types.find((el) => el.name === "humidity").id
            ).length > 0 &&
            data.filter(
              (e) =>
                types.find((el) => el.name === "humidity") &&
                e.data_type === types.find((el) => el.name === "humidity").id
            )[0].value
              ? `${
                  data.filter(
                    (e) =>
                      types.find((el) => el.name === "humidity") &&
                      e.data_type ===
                        types.find((el) => el.name === "humidity").id
                  )[0].value
                } %`
              : "--"}
          </span>
        </li>

        <li className={styles.detail}>
          <div className={styles.icon}>
            <Sun className={styles.sun} />
          </div>
          <span className={styles.value}>
            {data &&
            types &&
            data.filter(
              (e) =>
                types.find((el) => el.name === "luminosity") &&
                e.data_type === types.find((el) => el.name === "luminosity").id
            ).length > 0 &&
            data.filter(
              (e) =>
                types.find((el) => el.name === "luminosity") &&
                e.data_type === types.find((el) => el.name === "luminosity").id
            )[0].value
              ? `${
                  data.filter(
                    (e) =>
                      types.find((el) => el.name === "luminosity") &&
                      e.data_type ===
                        types.find((el) => el.name === "luminosity").id
                  )[0].value
                } lux`
              : "--"}
          </span>
        </li>
      </ul>

      <footer className={styles.footer}>
        <div className={styles.batteryContainer}>
          <div className={styles.batteryIndicatorContainer}>
            <Battery className={styles.batteryIcon} />
            <div className={styles.battery}>
              <div
                className={`${styles.batteryIndicator} ${
                  roomData &&
                  roomData.boxes.length > 0 &&
                  roomData.boxes[0].battery <= 25 &&
                  styles.low
                } ${
                  roomData &&
                  roomData.boxes.length > 0 &&
                  50 > roomData.boxes[0].battery &&
                  roomData.boxes[0].battery > 25 &&
                  styles.medium
                } ${
                  roomData &&
                  roomData.boxes.length > 0 &&
                  roomData.boxes[0].battery >= 50 &&
                  styles.high
                }`}
                style={
                  roomData && {
                    "--battery":
                      roomData.boxes.length > 0 &&
                      roomData.boxes[0].battery + "%",
                  }
                }
              ></div>
            </div>
          </div>
          <span>
            {roomData && roomData.boxes.length > 0
              ? roomData.boxes[0].battery
              : "--"}{" "}
            %
          </span>
        </div>
        <Link to={uuid ? "/rooms/" + uuid + "/" : "/"} className={styles.link}>
          Voir la pièce
        </Link>
      </footer>
    </article>
  );
};

export default RoomCard;
