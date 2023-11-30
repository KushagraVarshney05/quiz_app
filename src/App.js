import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../src/components/toast";

function App() {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
