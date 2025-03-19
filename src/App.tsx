import {createBrowserRouter} from "react-router-dom";
import {Canvas} from "./components/canvas/Canvas";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Canvas/>
  },
]);
