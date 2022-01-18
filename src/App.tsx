import styles from "./App.module.scss";

import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import Event from "./pages/event/Event";
import Project from "./pages/project/Project";
import Task from "./pages/task/Task";
import Watchlist from "./pages/watchlist/Watchlist";

import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";

const App = () => {
  return (
    <div className={styles.Pagecontainer}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/event" element={<Event />} />
          <Route path="/project" element={<Project />} />
          <Route path="/task" element={<Task />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
