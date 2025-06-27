import React, { useState } from "react";
import AccordionsCard from "./AccordionsCard";

const Accordions = ({ title, data }) => {
  const [isExpandedAccordions, setIsExpandedAccordions] = useState();
  console.log(isExpandedAccordions);

  return (
    <div className="w-[100%]">
      <div className=" flex justify-between">
        <p>
          {title}({data.length})
        </p>

        <svg
          onClick={() => setIsExpandedAccordions(!isExpandedAccordions)}
          className={`cursor-pointer mt-1 transition-transform duration-400 ${
            isExpandedAccordions ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 6.586L3.293 15.293l1.414 1.414L12 9.414l7.293 7.293 1.414-1.414L12 6.586z" />
        </svg>
      </div>

      <div>
        {isExpandedAccordions && (
          <div>
            {data.map((item) => {
              return <AccordionsCard  info={item.card.info}/>;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordions;
