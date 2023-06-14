import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import List from "./pages/pet/List";
import Home from "./pages/pet/Home";
import Edit from "./pages/pet/Edit";
import Add from "./pages/pet/Add";
import { Provider } from "./Provider";
//import PublicLayout from './layouts/PublicLayout'
//import { useMemo } from 'react'

function App() {
  return (
    <div className="app">
      <Provider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
