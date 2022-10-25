import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Files from "./components/Files/Files";
import Nodes from "./components/Nodes/Nodes";
import TitleBar from "./components/TitleBar/TitleBar";
import SideBar from "./components/SideBar/SideBar";
import "./../public/index.css";
import "./App.css";
import { Provider, useSelector } from "react-redux";
import configureAppStore from "./store/configureAppStore";
import { selectAuthenticated } from "./store/app/app.selector";
import { RequireAuth } from "./components/common/RequireAuth/RequireAuth";
import { Login } from "./components/Login/Login";

export const appStore = configureAppStore();

const App = () => {
  const authenticated = useSelector(selectAuthenticated);
  return (
    <BrowserRouter>
      <div className="app">
        <header>
          <TitleBar />
        </header>
        <div className="appContent">
          {authenticated && <SideBar />}
          <Routes>
            <Route path="/" element={<Navigate to="/files" />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/files"
              element={
                <RequireAuth>
                  <Files />
                </RequireAuth>
              }
            ></Route>
            <Route
              path="/nodes"
              element={
                <RequireAuth>
                  <Nodes />
                </RequireAuth>
              }
            ></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

render(
  <Provider store={appStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
