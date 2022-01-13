import HomeIcon from "@mui/icons-material/Home";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";

export const NavbarData = [
  {
    title: "Dashboard",
    icon: <HomeIcon />,
    link: "/dashboard",
  },
  {
    title: "Task",
    icon: <AssignmentTurnedInIcon />,
    link: "/task",
  },
  {
    title: "Event",
    icon: <CalendarTodayIcon />,
    link: "/event",
  },
  {
    title: "Project",
    icon: <AccountTreeIcon />,
    link: "/project",
  },
  {
    title: "Watchlist",
    icon: <LocalMoviesIcon />,
    link: "/watchlist",
  },
];
