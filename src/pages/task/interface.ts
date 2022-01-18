import React from "react";

export interface TaskObj {
  category: string;
  deadline: Date;
  name: string;
  issuer: string;
  description?: string;
  _id?: string;
}

export interface ITaskDetail {
  task: TaskObj;
  randColor: string;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  setTempEditTask: React.Dispatch<React.SetStateAction<TaskObj>>;
}

export interface ICatTask {
  cat: string;
  arrTask: TaskObj[];
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  setTempEditTask: React.Dispatch<React.SetStateAction<TaskObj>>;
}
