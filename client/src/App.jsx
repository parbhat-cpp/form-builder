import "./App.css";
import DataProvider from "./Context/DataProvider";
import AccessForm from "./pages/AccessForm";
import CreateForm from "./pages/CreateForm";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResponseAnalysis from "./pages/ResponseAnalysis";
import ResponseList from "./pages/ResponseList";

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-form" element={<CreateForm />} />
          <Route path="/access-form/id/:Id" element={<AccessForm />} />
          <Route path="/response/list" element={<ResponseList />} />
          <Route path="/response/id/:Id" element={<ResponseAnalysis />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
