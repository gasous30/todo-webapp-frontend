export interface Val {
  name: string;
  description?: string;
  is_watched?: boolean;
  place?: string;
  category: string;
  _id?: string;
}

export interface IMovieDetail {
  val: Val;
  randColor: string;
}

export interface ICatMovie {
  cat: string;
  arrval: Array<Val>;
}
