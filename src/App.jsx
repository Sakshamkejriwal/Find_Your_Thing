
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold">FindYourThing Components WIP</h1>
      </div>
    </BrowserRouter>
  );
}
export default App;
