import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/dashboard/index";

import styles from "./App.module.scss";
import Watchlist from "./pages/watchlist/Watchlist";

const App = () => {
  return (
    <div className={styles.Pagecontainer}>
      <Navbar />
      <Watchlist />
    </div>
  );
};

export default App;
