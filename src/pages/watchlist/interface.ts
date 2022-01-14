export interface Val {
  name: string;
  description: string;
  is_watched: boolean;
  place: string;
  category: string;
}

export interface IMovieDetail {
  val: {
    name: string;
    description: string;
    is_watched: boolean;
    place: string;
  };
  randColor: string;
}

export interface ICatMovie {
  cat: string;
  arrval: Array<Val>;
}
