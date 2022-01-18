import axios from "axios";
import { FC, useEffect, useState } from "react";
import { ICatMovie, IMovieDetail, Val } from "./interface";
import styles from "./Watchlist.module.scss";
import CheckIcon from "@mui/icons-material/Check";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Popup from "../../components/popup/Popup";

const generateDarkColorHex = () => {
  let color = "#";
  for (let i = 0; i < 3; i++)
    color += (
      "0" + Math.floor((Math.random() * Math.pow(16, 2)) / 2).toString(16)
    ).slice(-2);
  return color;
};

const watchlist_url = "http://localhost:3001/todoweb/watchlist";

const MovieDetail: FC<IMovieDetail> = ({ val, randColor }) => {
  const handleCheckBtn = () => {
    axios
      .delete(`${watchlist_url}/${val._id}`)
      .then((res) => window.location.reload())
      .catch((err) => console.log(err));
  };
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
          onClick={handleCheckBtn}
        >
          <CheckIcon fontSize="large" />
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
  const [watchlist, setWatchlist] = useState<Val[]>([]);
  const [categorylistLeft, setCategorylistLeft] = useState<string[]>([]);
  const [categorylistRight, setCategorylistRight] = useState<string[]>([]);
  const [triggerPopup, setTriggerPopup] = useState<boolean>(false);

  const [categoryInput, setCategoryInput] = useState<string>("");
  const [titleInput, setTitleInput] = useState<string>("");
  const [descInput, setDescInput] = useState<string | null>(null);
  const [placeInput, setPlaceInput] = useState<string | null>(null);

  useEffect(() => {
    axios.get(watchlist_url).then((res) => setWatchlist(res.data));
  }, []);

  useEffect(() => {
    let listdetail: string[] = [];
    watchlist.forEach((detail) => {
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

  const handleSubmitBtn = () => {
    if (categoryInput.length > 0 && titleInput.length > 0) {
      let newWatchlist: Val = {
        category: categoryInput,
        name: titleInput,
      };
      if (descInput !== null) {
        newWatchlist.description = descInput;
      }
      if (placeInput !== null) {
        newWatchlist.place = placeInput;
      }
      console.log(newWatchlist);
      axios
        .post(watchlist_url, newWatchlist)
        .then((res) => window.location.reload())
        .catch((err) => console.log(err));
    } else {
      alert("Category and Title must be filled");
    }
  };

  return (
    <div className={styles.Watchlist}>
      <div className={`row ${styles.Watchcard}`}>
        <div className={`d-flex align-items-center ${styles.BigTitle}`}>
          <h2 className="me-auto">
            <b>Watchlist</b>
          </h2>
          <button
            type="button"
            className={`btn align-items-center`}
            onClick={() => setTriggerPopup(true)}
          >
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
      <Popup trigger={triggerPopup} setTrigger={() => setTriggerPopup(false)}>
        <form className={`${styles.FormWatch}`}>
          <h3>
            <b>Add Watchlist</b>
          </h3>
          <div className={`${styles.InputGroup}`}>
            <p>Category: </p>
            <input
              className={`${"form-control"}`}
              onChange={(e) => setCategoryInput(e.target.value)}
            />
          </div>
          <div className={`${styles.InputGroup}`}>
            <p>Title: </p>
            <input
              className={`${"form-control"}`}
              onChange={(e) => setTitleInput(e.target.value)}
            />
          </div>
          <div className={`${styles.InputGroup}`}>
            <p>Description: </p>
            <input
              className={`${"form-control"}`}
              onChange={(e) => setDescInput(e.target.value)}
            />
          </div>
          <div className={`${styles.InputGroup}`}>
            <p>Where to watch: </p>
            <input
              className={`${"form-control"}`}
              onChange={(e) => setPlaceInput(e.target.value)}
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
    </div>
  );
};

export default Watchlist;
