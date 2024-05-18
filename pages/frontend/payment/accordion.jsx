/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const ShowIcon = () => {
    return isOpen ? <BiMinus /> : <BiPlus />;
  };

  return (
    <div className="border rounded">
      <div
        className="w-full text-left py-2 px-4 font-semibold hover:bg-gray-100 cursor-pointer focus:outline-none"
        onClick={toggleAccordion}
      >
        <div className="flex flex-row justify-between place-items-center">
          {title} <ShowIcon />
        </div>
      </div>
      {isOpen && (
        <div class="divide-y divide-blue-200">
          <div className="p-4 divide-y divide-indigo-600">
            <p>{content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
