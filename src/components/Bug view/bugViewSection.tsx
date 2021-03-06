import React from "react";
import handlePriority from "../../redux/utils/priority";

const BugViewSection: React.FC<BugViewPropTypes> = ({
  title,
  info,
}): JSX.Element => {
  const priority = typeof info === "number" ? handlePriority(info).level : info;

  return (
    <div className="flex flex-col justify-center p-3">
      <h2 className="text-xl text-left flex items-center font-medium">
        {title}:
      </h2>
      <p className="flex items-center">{priority}</p>
    </div>
  );
};

export default BugViewSection;
