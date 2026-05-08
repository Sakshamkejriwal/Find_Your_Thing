
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import ItemDetail from "./pages/ItemDetail";
import ReportItem from "./pages/ReportItem";
function App() {
  let obj = {Name: "haha"}
  console.log(obj)
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/item/:id" element={<ItemDetail />} />
        <Route path="/report" element={<ReportItem />} />
        <Route path="/edit/:id" element={<ReportItem />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
