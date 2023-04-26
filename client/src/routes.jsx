import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LoginToken from "./pages/LoginToken";
import LoginOutlet from "./outlets/LoginOutlet";
import Dashboard from "./pages/Dashboard";
import DisplayQR from "./pages/DisplayQR";

export default [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginOutlet />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "token",
        element: <LoginToken />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/display-qr",
    element: <DisplayQR/>,
  }
];
