import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Homepage from "../pages/Homepage";
import FeedPage from "../pages/FeedPage";
import Friendpage from "../pages/Friendpage";
import ProfilePage from "../pages/ProfilePage";

function Router() {
  const router = createBrowserRouter([
    { path: "/", element: <Homepage /> },
    { path: "profile", element: <ProfilePage /> },
    { path: "profile/:userId", element: <Friendpage /> },
    {
      path: "feed",
      element: <FeedPage />,
    },
    { path: "*", element: <Navigate to="/" /> },
  ]);
  return <RouterProvider router={router} />;
}

export default Router;
