import { useContext } from "react";
import { Link } from "react-router-dom";
import { SectionContext } from "../ContextProviders";
import "./SectionSelector.css";

const SectionSelector = (props) => {
  const { sections } = props;
  const [activeSection, setActiveSection] = useContext(SectionContext);

  return (
    <div className="sectionSelector">
      {sections.map((section) => (
        <Link
          key={section.value}
          className={`section ${
            section.value === activeSection ? "active" : ""
          }`}
          to={section.route}
          onClick={(e) => setActiveSection(section.value)}
        >
          <h3>{section.label}</h3>
        </Link>
      ))}
    </div>
  );
};

const SectionSelectorWrapper = (props) => (
  <SectionContext.Consumer>
    {([activeSection]) => <SectionSelector sections={props.sections} />}
  </SectionContext.Consumer>
);
export default SectionSelectorWrapper;
