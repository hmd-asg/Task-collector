import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import SingleProject from "./pages/SingleProject.jsx";
import Tasks from './pages/myTasks';
import Profile from './pages/Profile.jsx';
import inView from 'in-view';
import './pages/Home.css'; // Import your CSS file if needed

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/project/:projectId",
        element: <SingleProject />,
      },
      {
        path: "/my-tasks",
        element: <Tasks />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

document.addEventListener('DOMContentLoaded', () => {
  const target = document.querySelector('.wrapper');

  inView('.section').on('enter', function(el) {
    const color = el.getAttribute('data-background-color');
    target.style.backgroundColor = color;
  });
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
