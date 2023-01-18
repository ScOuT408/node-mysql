import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AddEdit from "./pages/AddEdit";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddEdit />} />
      </Routes>
    </>
  );
}

export default App;
