import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./styles/index.css";
import AllVideos from "./pages/AllVideos";
import VideoView from "./pages/VideoView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AllVideos></AllVideos>,
  },
	{
		path: "videos/:cmsVideoId",
		element: <VideoView></VideoView>
	}
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);