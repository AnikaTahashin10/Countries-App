import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Countries from "./routes/Countries";
import CountriesSingle from "./routes/CountriesSingle";
import Favourites from "./routes/Favourites";
import Home from "./routes/Home";
import Root from "./routes/Root";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "./store/authSlice"; 
import Login from "./components/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./store/firebase";
import Register from "./components/Register";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(setUser({ uid, email, displayName }));
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe(); 
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: "/countries",
          element: <Countries />,
        },
        {
          path: "countries/:single",
          element: <CountriesSingle />,
        },
        {
          path: "/favourites",
          element: <Favourites />,
        },
        {
          path: "/login", 
          element: <Login />,
        },
        { path: "/register", 
        element: <Register /> },
      ],
    },
  ]);

  return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </LocalizationProvider>
  );
}

export default App;
