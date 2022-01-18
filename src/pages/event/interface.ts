export interface EventObj {
  issuer: string;
  name: string;
  description?: string;
  started_at: Date;
  end_at: Date;
  _id?: string;
}

export interface IEventDetail {
  event: EventObj;
  randColor: string;
  setTempEditEvent: React.Dispatch<React.SetStateAction<EventObj>>;
  setTriggerEdit: React.Dispatch<React.SetStateAction<boolean>>;
}
