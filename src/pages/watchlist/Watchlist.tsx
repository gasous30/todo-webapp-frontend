import axios from "axios";
import { FC, useEffect, useState } from "react";
import { ICatMovie, IMovieDetail, Val } from "./interface";
import styles from "./Watchlist.module.scss";
import CheckIcon from "@mui/icons-material/Check";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const generateDarkColorHex = () => {
  let color = "#";
  for (let i = 0; i < 3; i++)
    color += (
      "0" + Math.floor((Math.random() * Math.pow(16, 2)) / 2).toString(16)
    ).slice(-2);
  return color;
};

const MovieDetail: FC<IMovieDetail> = ({ val, randColor }) => {
  return (
    <div
      className={`row ${styles.Moviecontainer}`}
      style={{ backgroundColor: randColor }}
    >
      <div className={`col-10 ${styles.Textcontainer}`}>
        <p className={styles.Titlemovie}>
          <b>{val.name}</b>
        </p>
        <p>Descripton: {val.description}</p>
        <p>Watch at: {val.place}</p>
      </div>
      <div
        className={`col d-flex justify-content-center align-items-center ${styles.Btncontainer}`}
      >
        <button
          type="button"
          className={`btn btn-primary d-flex justify-content-center align-items-center`}
          style={{ backgroundColor: randColor, borderColor: randColor }}
        >
          <CheckIcon />
        </button>
      </div>
    </div>
  );
};

const CatMovie: FC<ICatMovie> = ({ cat, arrval }) => {
  const randColor = generateDarkColorHex();
  return (
    <div className={styles.Catcontainer} style={{ backgroundColor: randColor }}>
      <h3>{cat}</h3>
      {arrval.map((mov) => {
        return <MovieDetail val={mov} randColor={randColor} />;
      })}
    </div>
  );
};

const Watchlist = () => {
  const watchlist_url = "http://localhost:3001/todoweb/watchlist";

  const [watchlist, setWatchlist] = useState<Val[]>([]);
  const [categorylistLeft, setCategorylistLeft] = useState<string[]>([]);
  const [categorylistRight, setCategorylistRight] = useState<string[]>([]);

  useEffect(() => {
    axios.get(watchlist_url).then((res) => setWatchlist(res.data));
  }, []);

  useEffect(() => {
    let listdetail: string[] = [];
    watchlist.map((detail) => {
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
  }, [watchlist]);

  return (
    <div className={styles.Watchlist}>
      <div className={`row ${styles.Watchcard}`}>
        <div className={`d-flex align-items-center ${styles.BigTitle}`}>
          <h2 className="me-auto">Watchlist</h2>
          <button type="button" className={`btn align-items-center`}>
            <AddCircleIcon fontSize="large" />
            <h5>Add Watchlist</h5>
          </button>
        </div>
        <div className={`col ${styles.Catcontleft}`}>
          {categorylistLeft.map((cat) => {
            return (
              <CatMovie
                cat={cat}
                arrval={watchlist.filter((el) => el.category === cat)}
              />
            );
          })}
        </div>
        <div className={`col ${styles.Catcontright}`}>
          {categorylistRight.map((cat) => {
            return (
              <CatMovie
                cat={cat}
                arrval={watchlist.filter((el) => el.category === cat)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
