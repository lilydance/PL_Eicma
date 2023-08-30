import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

export default function Root() {
  return (
    <BrowserRouter>
     <Routes>
       <Route path="/" element={<App/>} />
      </Routes>
     </BrowserRouter>
  );
}
