import React from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import PublishCourse from "./PublishCourse/Index";

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);

  const steps = [
    { id: 1, title: "Course Information" },
    { id: 2, title: "Course Builder" },
    { id: 3, title: "Publish" },
  ];

  return (
    <div className="rounded-md w-full lg:w-[600px]">
      {/* Step indicators */}
      <div className="flex  justify-between gap-4   border-[#2C333F] pb-4">
        {steps.map((item) => (
          <div key={item.id} className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full 
                ${step === item.id
                  ? "bg-yellow-900 border-yellow-300 text-yellow-300 "
                  : "border-[#2C333F] bg-[#161D29] text-[#838894]"
                }`}
            >
              {step > item.id ? <FaCheck /> : item.id}
            </div>
            <p className="text-l mt-1">{item.title}</p>
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="mt-6">
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {step === 3 && <PublishCourse />}
      </div>
    </div>
  );
};

export default RenderSteps;
