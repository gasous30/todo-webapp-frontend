import styles from "./Task.module.scss";
import axios from "axios";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import { FC, useEffect, useState } from "react";
import { ICatTask, ITaskDetail, TaskObj } from "./interface";
import Popup from "../../components/popup/Popup";

const generateDarkColorHex = () => {
  let color = "#";
  for (let i = 0; i < 3; i++)
    color += (
      "0" + Math.floor((Math.random() * Math.pow(16, 2)) / 2).toString(16)
    ).slice(-2);
  return color;
};

const TaskDetail: FC<ITaskDetail> = ({
  task,
  randColor,
  setTrigger,
  setTempEditTask,
}) => {
  const handleCheckBtn = () => {
    axios
      .delete(`${taskUrl}/${task._id}`)
      .then((res) => window.location.reload())
      .catch((err) => console.log(err));
  };

  const handleEditBtn = () => {
    setTrigger(true);
    setTempEditTask(task);
  };

  return (
    <div
      className={`row ${styles.TaskContainer}`}
      style={{ backgroundColor: randColor }}
    >
      <div className={`col-8 ${styles.TextContainer}`}>
        <p className={styles.TitleTask}>
          <b>{task.issuer}</b>
        </p>
        <p>
          <b>{task.name}</b>
        </p>
        <p>
          {new Intl.DateTimeFormat("id-ID", {
            dateStyle: "full",
            timeStyle: "long",
          }).format(new Date(task.deadline))}
        </p>
        <p>Description: {task.description}</p>
      </div>
      <div
        className={`col d-flex justify-content-center align-items-center ${styles.BtnContainer}`}
      >
        <button
          type="button"
          className={`btn btn-primary d-flex align-items-center justify-content-center`}
          style={{
            marginRight: "1.5rem",
            backgroundColor: randColor,
            borderColor: randColor,
          }}
          onClick={handleEditBtn}
        >
          <EditIcon fontSize="large" />
        </button>
        <button
          type="button"
          className={`btn btn-primary d-flex justify-content-center align-items-center`}
          style={{ backgroundColor: randColor, borderColor: randColor }}
          onClick={handleCheckBtn}
        >
          <CheckIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
};

const CatTask: FC<ICatTask> = ({
  cat,
  arrTask,
  setTrigger,
  setTempEditTask,
}) => {
  const randColor = generateDarkColorHex();
  return (
    <div className={styles.CatContainer} style={{ backgroundColor: randColor }}>
      <h3>{cat}</h3>
      {arrTask.map((task) => {
        return (
          <TaskDetail
            task={task}
            randColor={randColor}
            setTrigger={setTrigger}
            setTempEditTask={setTempEditTask}
          />
        );
      })}
    </div>
  );
};

const taskUrl = "http://localhost:3001/todoweb/task";

const Task = () => {
  const [taskList, setTaskList] = useState<TaskObj[]>([]);
  const [categorylistLeft, setCategorylistLeft] = useState<string[]>([]);
  const [categorylistRight, setCategorylistRight] = useState<string[]>([]);

  const [triggerPopup, setTriggerPopup] = useState<boolean>(false);
  const [triggerEditPopup, setTriggerEditPopup] = useState<boolean>(false);

  const [tempEditTask, setTempEditTask] = useState<TaskObj>({} as TaskObj);

  const [deadlineEdit, setDeadlineEdit] = useState<Date>(new Date());

  const [categoryInput, setCategoryInput] = useState<string>("");
  const [issuerInput, setIssuerInput] = useState<string>("");
  const [nameInput, setNameInput] = useState<string>("");
  const [deadlineInput, setDeadlineInput] = useState<Date>(new Date());
  const [descInput, setDescInput] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(taskUrl)
      .then((res) => setTaskList(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let listdetail: string[] = [];
    taskList.forEach((detail) => {
      listdetail.push(detail.category);
    });
    let uniqcat: string[] = [...Array.from(new Set(listdetail))];
    let left: string[] = [];
    let right: string[] = [];
    for (let i = 0; i < uniqcat.length; i += 2) {
      left.push(uniqcat[i]);
      right.push(uniqcat[i + 1]);
    }
    setCategorylistLeft(left);
    setCategorylistRight(right);
  }, [taskList]);

  const handleSubmitBtn = () => {
    if (
      categoryInput.length > 0 &&
      issuerInput.length > 0 &&
      nameInput.length > 0
    ) {
      let newTask: TaskObj = {
        category: categoryInput,
        issuer: issuerInput,
        name: nameInput,
        deadline: deadlineInput,
      };
      if (descInput !== null) {
        newTask.description = descInput;
      }
      axios
        .post(taskUrl, newTask)
        .then((res) => window.location.reload())
        .catch((err) => console.log(err));
    } else {
      alert("Category, Issuer, Name, and Deadline must be filled");
    }
  };

  const handleEditBtn = () => {
    tempEditTask.deadline = deadlineEdit;
    console.log(tempEditTask);
    axios
      .patch(`${taskUrl}/${tempEditTask._id}`, tempEditTask)
      .then((res) => window.location.reload())
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.TaskList}>
      <div className={`row ${styles.TaskCard}`}>
        <div className={`d-flex align-items-center ${styles.BigTitle}`}>
          <h2 className="me-auto">
            <b>Task</b>
          </h2>
          <button
            type="button"
            className={`btn align-items-center`}
            onClick={() => setTriggerPopup(true)}
          >
            <AddCircleIcon fontSize="large" />
            <h5>Add Task</h5>
          </button>
        </div>
        <div className={`col ${styles.Left}`}>
          {categorylistLeft.map((cat) => {
            return (
              <CatTask
                cat={cat}
                arrTask={taskList.filter((el) => el.category === cat)}
                setTrigger={setTriggerEditPopup}
                setTempEditTask={setTempEditTask}
              />
            );
          })}
        </div>
        <div className={`col ${styles.Right}`}>
          {categorylistRight.map((cat) => {
            return (
              <CatTask
                cat={cat}
                arrTask={taskList.filter((el) => el.category === cat)}
                setTrigger={setTriggerEditPopup}
                setTempEditTask={setTempEditTask}
              />
            );
          })}
        </div>
      </div>
      <Popup trigger={triggerPopup} setTrigger={() => setTriggerPopup(false)}>
        <form className={styles.FormTask}>
          <h3>
            <b>Add Task</b>
          </h3>
          <div className={`${styles.InputGroup}`}>
            <p>Category: </p>
            <input
              className={`${"form-control"}`}
              onChange={(e) => setCategoryInput(e.target.value)}
            />
          </div>
          <div className={`${styles.InputGroup}`}>
            <p>Issuer: </p>
            <input
              className={`${"form-control"}`}
              onChange={(e) => setIssuerInput(e.target.value)}
            />
          </div>
          <div className={`${styles.InputGroup}`}>
            <p>Name: </p>
            <input
              className={`${"form-control"}`}
              onChange={(e) => setNameInput(e.target.value)}
            />
          </div>
          <div className={`${styles.InputGroup}`}>
            <p>Deadline: </p>
            <input
              type="datetime-local"
              className={`${"form-control"}`}
              onChange={(e) => setDeadlineInput(new Date(e.target.value))}
            />
          </div>
          <div className={`${styles.InputGroup}`}>
            <p>Description: </p>
            <input
              className={`${"form-control"}`}
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
      <Popup
        trigger={triggerEditPopup}
        setTrigger={() => setTriggerEditPopup(false)}
      >
        <form className={styles.FormTask}>
          <h3>
            <b>Edit Task</b>
          </h3>
          <div className={`${styles.InputGroup}`}>
            <p>Category: </p>
            <input
              className={`${"form-control"}`}
              value={tempEditTask.category}
              disabled
            />
          </div>
          <div className={`${styles.InputGroup}`}>
            <p>Issuer: </p>
            <input
              className={`${"form-control"}`}
              value={tempEditTask.issuer}
              disabled
            />
          </div>
          <div className={`${styles.InputGroup}`}>
            <p>Name: </p>
            <input
              className={`${"form-control"}`}
              value={tempEditTask.name}
              disabled
            ></input>
          </div>
          <div className={`${styles.InputGroup}`}>
            <p>Deadline: </p>
            <input
              type="datetime-local"
              className={`${"form-control"}`}
              onChange={(e) => setDeadlineEdit(new Date(e.target.value))}
            />
          </div>
          <div className={`${styles.InputGroup}`}>
            <p>Description: </p>
            <input
              className={`${"form-control"}`}
              value={tempEditTask.description}
              disabled
            />
          </div>
          <div className={`d-flex ${styles.BtnGroup}`}>
            <button
              type="button"
              className={`btn btn-primary ${styles.SubmitBtn}`}
              onClick={handleEditBtn}
            >
              Submit
            </button>
          </div>
        </form>
      </Popup>
    </div>
  );
};

export default Task;
