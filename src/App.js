import { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SectionContext, UserContext } from "./ContextProviders";
import Files from "./Files/Files";
import Nodes from "./Nodes/Nodes";
import TitleBar from "./TitleBar/TitleBar";
import SideBar from "./SideBar/SideBar";
import "./../public/index.css";
import "./App.css";
const App = () => {
  const user = useState({ user: "guest" });
  const section = useState("files");
  return (
    <div className="app">
      <UserContext.Provider value={user}>
        <SectionContext.Provider value={section}>
          <BrowserRouter>
            <header>
              <TitleBar />
            </header>
            <div className="appContent">
              <SideBar />
              <Routes>
                <Route path="/" element={<Navigate to="/files" />} />
                <Route path="/files" element={<Files />}></Route>
                <Route path="/nodes" element={<Nodes />}></Route>
              </Routes>
            </div>
          </BrowserRouter>
        </SectionContext.Provider>
      </UserContext.Provider>
    </div>
  );
};

render(<App />, document.getElementById("root"));
