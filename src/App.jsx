import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Overton from "./Overton";
function App() {
  const [count, setCount] = useState(0);

  return <Overton />;
}

export default App;
