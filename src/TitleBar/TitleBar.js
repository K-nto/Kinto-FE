import { UserContext } from "../ContextProviders";
import { Link } from "react-router-dom";
import kintoLogo from "../../public/Kinto.png";
import "./TitleBar.css";
import IconOnlyButton from "../common/Buttons/IconOnlyButton/IconOnlyButton";
import Searchbar from "../Searchbar/Searchbar";

const TitleBar = () => {
  return (
    <div className="titleBar">
      <div className="logo">
        <Link to="/files">
          <img src={kintoLogo} alt="Kinto Logo" width="140" />
        </Link>
      </div>
      <div className="content">
        <Searchbar />
        <div>
          <IconOnlyButton
            icon="fi-br-settings-sliders"
            style="tertiary"
            size="48px"
          />
          <IconOnlyButton icon="fi-br-id-badge" style="tertiary" size="48px" />
        </div>
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
