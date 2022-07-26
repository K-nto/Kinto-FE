import { Link } from "react-router-dom";
import kintoLogo from "../../../public/Kinto.png";
import "./TitleBar.css";
import Searchbar from "../Searchbar/Searchbar";
import Button from "../common/Buttons/Button";
import { useSelector } from "react-redux";
import { selectAuthenticated } from "../../store/app/app.selector";
import { logout } from "../Login/Login.utils";

const TitleBar = () => {
  const authenticated = useSelector(selectAuthenticated);

  const logoutEvent = () => {
    logout();
  };
  return (
    <div className="titleBar">
      <div className="logo">
        <Link to="/files">
          <img src={kintoLogo} alt="Kinto Logo" width="140" />
        </Link>
      </div>
      {authenticated && (
        <div className="content">
          <Searchbar />
          <div className="buttons">
            <Button
              icon="fi-br-settings-sliders"
              style="secondary"
              height="48px"
              width="48px"
              iconSize="24px"
            />
            <Button
              icon="fi-br-id-badge"
              style="secondary"
              height="48px"
              width="48px"
              iconSize="24px"
              onClick={logoutEvent}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TitleBar;
