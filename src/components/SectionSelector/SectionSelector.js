import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SET_ACTIVE_SECTION } from "../../store/app/app.actions";
import { selectActiveSection } from "../../store/app/app.selector";
import "./SectionSelector.css";

const SectionSelector = (props) => {
  const { sections } = props;
  const activeSection = useSelector(selectActiveSection);
  const dispatch = useDispatch();

  console.log(activeSection);
  return (
    <div className="sectionSelector">
      {sections.map((section) => (
        <Link
          key={section.value}
          className={`sectionTab ${
            section.value === activeSection ? "active" : ""
          }`}
          to={section.route}
          onClick={() =>
            dispatch({
              type: SET_ACTIVE_SECTION,
              payload: section.value,
            })
          }
        >
          <h3>{section.label}</h3>
        </Link>
      ))}
    </div>
  );
};

const SectionSelectorWrapper = (props) => (
  <SectionSelector sections={props.sections} />
);
export default SectionSelectorWrapper;
