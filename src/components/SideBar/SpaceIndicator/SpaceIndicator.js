import { useSelector } from "react-redux";
import {
  selectSpaceAvailable,
  selectSpaceUsed,
} from "../../../store/user/user.selector";
import "./SpaceIndicator.css";

const SpaceIndicator = () => {
  const spaceAvailable = useSelector(selectSpaceAvailable);
  const spaceUsed = useSelector(selectSpaceUsed);
  const spacePercentage = `${(spaceUsed / spaceAvailable) * 100}%`;

  if (spaceAvailable === 0) return <></>;
  return (
    <div className="spaceIndicator">
      <div className="outerBar">
        <div className="innerBar" style={{ width: spacePercentage }} />
      </div>
      <h5>
        {spaceUsed} de {spaceAvailable} GB utilizados
      </h5>
    </div>
  );
};

export default SpaceIndicator;
