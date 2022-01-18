import styles from "./Event.module.scss";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { FC, useState, useEffect } from "react";
import { IEventDetail, EventObj } from "./interface";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import Popup from "../../components/popup/Popup";

import axios from "axios";

const eventUrl = "http://localhost:3001/todoweb/event";

const generateDarkColorHex = () => {
  let color = "#";
  for (let i = 0; i < 3; i++)
    color += (
      "0" + Math.floor((Math.random() * Math.pow(16, 2)) / 2).toString(16)
    ).slice(-2);
  return color;
};

const EventDetail: FC<IEventDetail> = ({
  event,
  randColor,
  setTempEditEvent,
  setTriggerEdit,
}) => {
  let start = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(new Date(event.started_at));
  let end = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(new Date(event.end_at));

  const handleCheckBtn = () => {
    axios
      .delete(`${eventUrl}/${event._id}`)
      .then((res) => window.location.reload())
      .catch((err) => console.log(err));
  };

  const handleEditBtn = () => {
    setTempEditEvent(event);
    setTriggerEdit(true);
  };

  return (
    <div
      className={`row ${styles.EventDetail}`}
      id={event._id}
      style={{ backgroundColor: randColor }}
    >
      <div className={`col-8 ${styles.TextContainer}`}>
        <p className={styles.TextTitle}>
          <b>{event.issuer}</b>
        </p>
        <p>Name: {event.name}</p>
        <p>Start: {start}</p>
        <p>End: {end}</p>
        <p>Decription: {event.description}</p>
      </div>
      <div
        className={`col d-flex align-items-center justify-content-center ${styles.BtnContainer}`}
      >
        <button
          type="button"
          className={`btn btn-primary d-flex align-items-center justify-content-center`}
          style={{ marginRight: "1.5rem" }}
          onClick={handleEditBtn}
        >
          <EditIcon fontSize="large" />
        </button>
        <button
          type="button"
          className={`btn btn-primary d-flex align-items-center justify-content-center`}
          onClick={handleCheckBtn}
        >
          <CheckIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
};

const Event = () => {
  const randcolor = generateDarkColorHex();

  const [eventList, setEventList] = useState<EventObj[]>([]);
  const [eventListLeft, setEventListLeft] = useState<EventObj[]>([]);
  const [eventListRight, setEventListRight] = useState<EventObj[]>([]);
  const [triggerPopup, setTriggerPopup] = useState<boolean>(false);
  const [triggerEdit, setTriggerEdit] = useState<boolean>(false);

  const [tempEditEvent, setTempEditEvent] = useState<EventObj>({} as EventObj);

  const [startEdit, setStartEdit] = useState<Date>(new Date());
  const [endEdit, setEndEdit] = useState<Date>(new Date());

  const [issuerInput, setIssuerInput] = useState<string>("");
  const [nameInput, setNameInput] = useState<string>("");
  const [startInput, setStartInput] = useState<Date>(new Date());
  const [endInput, setEndInput] = useState<Date>(new Date());
  const [descInput, setDescInput] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(eventUrl)
      .then((res) => {
        setEventList(res.data);
        let leftList: EventObj[] = [];
        let rightList: EventObj[] = [];
        for (let i = 0; i < res.data.length; i += 2) {
          leftList.push(res.data[i]);
          if (res.data[i + 1] !== undefined) {
            rightList.push(res.data[i + 1]);
          }
        }
        setEventListLeft(leftList);
        setEventListRight(rightList);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmitBtn = () => {
    if (issuerInput.length > 0 && nameInput.length > 0) {
      if (startInput !== endInput) {
        let newEvent: EventObj = {
          issuer: issuerInput,
          started_at: startInput,
          end_at: endInput,
          name: nameInput,
        };
        if (descInput !== null) {
          newEvent.description = descInput;
        }
        console.log(newEvent);
        axios
          .post(eventUrl, newEvent)
          .then((res) => window.location.reload())
          .catch((err) => console.log(err));
      }
    } else {
      alert("Issuer, Name, and Time must be filled");
    }
  };

  const handleSubmitEditBtn = () => {
    tempEditEvent.started_at = startEdit;
    tempEditEvent.end_at = endEdit;
    axios
      .patch(`${eventUrl}/${tempEditEvent._id}`, tempEditEvent)
      .then((res) => window.location.reload())
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.EventContainer}>
      <div className={`row ${styles.EventCard}`}>
        <div className={`d-flex align-items-center ${styles.BigTitle}`}>
          <h2 className="me-auto">
            <b>Event</b>
          </h2>
          <button
            type="button"
            className={`btn align-items-center`}
            onClick={() => setTriggerPopup(true)}
          >
            <AddCircleIcon fontSize="large" />
            <h5>Add Event</h5>
          </button>
        </div>
        {eventList.length !== 0 ? (
          <div className="row" style={{ padding: 0 }}>
            <div className={`col ${styles.ListContainerLeft}`}>
              {eventListLeft.map((e) => {
                return (
                  <EventDetail
                    event={e}
                    randColor={randcolor}
                    setTempEditEvent={setTempEditEvent}
                    setTriggerEdit={setTriggerEdit}
                  />
                );
              })}
            </div>
            <div className={`col ${styles.ListContainerRight}`}>
              {eventListRight.map((e) => {
                return (
                  <EventDetail
                    event={e}
                    randColor={randcolor}
                    setTempEditEvent={setTempEditEvent}
                    setTriggerEdit={setTriggerEdit}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <h1>No Event Right Now!</h1>
          </div>
        )}
      </div>
      <Popup trigger={triggerPopup} setTrigger={() => setTriggerPopup(false)}>
        <form className={styles.FormEvent}>
          <h3>
            <b>Add Event</b>
          </h3>
          <div className={styles.InputGroup}>
            <p>Issuer: </p>
            <input
              className="form-control"
              onChange={(e) => setIssuerInput(e.target.value)}
            />
          </div>
          <div className={styles.InputGroup}>
            <p>Name: </p>
            <input
              className="form-control"
              onChange={(e) => setNameInput(e.target.value)}
            />
          </div>
          <div className={styles.InputGroup}>
            <p>Start Time: </p>
            <input
              type="datetime-local"
              className="form-control"
              onChange={(e) => setStartInput(new Date(e.target.value))}
            />
          </div>
          <div className={styles.InputGroup}>
            <p>End Time: </p>
            <input
              type="datetime-local"
              className="form-control"
              onChange={(e) => setEndInput(new Date(e.target.value))}
            />
          </div>
          <div className={styles.InputGroup}>
            <p>Description: </p>
            <input
              className="form-control"
              onChange={(e) => setDescInput(e.target.value)}
            />
          </div>
          <div className={`d-flex ${styles.BtnGroup}`}>
            <button
              type="button"
              className={`btn btn-primary ${styles.SubmitBtn}`}
              onClick={handleSubmitBtn}
            >
              Submit
            </button>
          </div>
        </form>
      </Popup>
      <Popup trigger={triggerEdit} setTrigger={() => setTriggerEdit(false)}>
        <form className={styles.FormEvent}>
          <h3>
            <b>Edit Event</b>
          </h3>
          <div className={styles.InputGroup}>
            <p>Issuer: </p>
            <input
              className="form-control"
              value={tempEditEvent?.issuer}
              disabled
            />
          </div>
          <div className={styles.InputGroup}>
            <p>Name: </p>
            <input
              className="form-control"
              value={tempEditEvent?.name}
              disabled
            />
          </div>
          <div className={styles.InputGroup}>
            <p>Start Time: </p>
            <input
              type="datetime-local"
              className="form-control"
              onChange={(e) => setStartEdit(new Date(e.target.value))}
            />
          </div>
          <div className={styles.InputGroup}>
            <p>End Time: </p>
            <input
              type="datetime-local"
              className="form-control"
              onChange={(e) => setEndEdit(new Date(e.target.value))}
            />
          </div>
          <div className={styles.InputGroup}>
            <p>Description: </p>
            <input
              className="form-control"
              value={tempEditEvent?.description}
              disabled
            />
          </div>
          <div className={`d-flex ${styles.BtnGroup}`}>
            <button
              type="button"
              className={`btn btn-primary ${styles.SubmitBtn}`}
              onClick={handleSubmitEditBtn}
            >
              Submit
            </button>
          </div>
        </form>
      </Popup>
    </div>
  );
};

export default Event;
