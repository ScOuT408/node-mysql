import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AddEdit from "./pages/AddEdit";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        position="center-top"
        toastOptions={{
          style: {
            marginTop: "3rem",
            textTransform: "capitalize",
            fontSize: "1.5rem",
          },
        }}
      />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddEdit />} />
        <Route path="/edit/:id" element={<AddEdit />} />
      </Routes>
    </>
  );
}

export default App;
