import "./App.css";
import Home from "./pages/Home";
import { app } from "./config/firebaseConfig";

function App() {
  if (app) {
    return <Home />;
  } else return <h1>Please check your firebase config file</h1>;
}

export default App;
