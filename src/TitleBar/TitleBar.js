import { UserContext } from "../ContextProviders";
import { Link } from "react-router-dom";
import kintoLogo from "../../public/Kinto.png";
import "./TitleBar.css";

const TitleBar = () => {
  return (
    <div className="titleBar">
      <div className="logo">
        <Link to="/files">
          <img src={kintoLogo} alt="Kinto Logo" width="140" />
        </Link>
      </div>
    </div>
  );
};

const WrappedTitleBar = () => {
  return (
    <UserContext.Consumer>
      {(user) => <TitleBar user={user} />}
    </UserContext.Consumer>
  );
};

export default WrappedTitleBar;
