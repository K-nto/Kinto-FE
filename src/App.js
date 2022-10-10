import { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Files from "./components/Files/Files";
import Nodes from "./components/Nodes/Nodes";
import TitleBar from "./components/TitleBar/TitleBar";
import SideBar from "./components/SideBar/SideBar";
import "./../public/index.css";
import "./App.css";
import { Provider } from "react-redux";
import configureAppStore from "./store/configureAppStore";

const appStore = configureAppStore();

const App = () => {
  return (
    <div className="app">
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
    </div>
  );
};

render(
  <Provider store={appStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
