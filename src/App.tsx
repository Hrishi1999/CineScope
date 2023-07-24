import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AccountSettings from "./pages/AccountSettings/AccountSettings";
import AddMovie from "./pages/Admin/AddMovie";
import AddNews from "./pages/Admin/AddNews";
import UpdateMovieDetails from "./pages/Admin/UpdateMovieDetails";
import { FilterResults } from "./pages/Filter/FilterResults";
import { FilterResultsAdmin } from "./pages/Filter/FilterResultsAdmin";
import AdminHome from "./pages/Home/AdminHome";
import Home from "./pages/Home/Home";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import News from "./pages/News/News";
import NewsDetails from "./pages/News/NewsDetails";
import ParentsGuide from "./pages/ParentsGuide";
import Profile from "./pages/Profile/Profile";
import Registration from "./pages/Registration/Registration";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import SignIn from "./pages/SignIn";
import Watchlist from "./pages/Watchlist/Watchlist";
import RootLayout from "./RootLayout";

const adminRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <AdminHome />,
      },
      {
        path: "/update-movie-details/:id",
        element: <UpdateMovieDetails />,
      },
      {
        path: "/add-movie",
        element: <AddMovie />,
      },
      {
        path: "/search",
        element: <FilterResultsAdmin />,
      },
      {
        path: "/add-news",
        element: <AddNews />,
      },
    ],
  },
]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/watchlist",
        element: <Watchlist />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/account-settings",
        element: <AccountSettings />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/news-details/:id",
        element: <NewsDetails />,
      },
      {
        path: "/search",
        element: <FilterResults />,
      },
      {
        path: "/movie-details/:id",
        element: <MovieDetail />,
      },
      {
        path: "/parents-guide/:id",
        element: <ParentsGuide />,
      },
    ],
  },
]);

const App = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  localStorage.setItem("chakra-ui-color-mode", "dark");
  return <RouterProvider router={isAdmin ? adminRouter : router} />;
};

export default App;
