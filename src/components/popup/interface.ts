import { MouseEventHandler } from "react";

export interface IPopup {
  children: JSX.Element;
  trigger: boolean;
  setTrigger: MouseEventHandler<HTMLButtonElement>;
}
