import React from "react";
import RenderSteps from "./RenderSteps";
import { AiOutlineThunderbolt } from "react-icons/ai";

const AddCourse = () => {

    return (
        <div className="space-y-6 flex lg:flex-row lg:space-x-6 lg:space-y-0  ">
            <div>
                <h1 className="text-2xl font-bold mb-7">Add Course</h1>
                <div className="pt-4">
                    <RenderSteps />
                </div>
            </div>
            <div className="space-y-6 font-semibold bg-[#161D29] p-4 rounded-md w-full lg:w-[40%] h-max  text-white ">
                <p className="flex items-center gap-2 font-semibold ">
                    <AiOutlineThunderbolt  size={20} color="red" />
                    Course Upload Tips

                </p>
                <ul className="space-y-3 list-disc mt-2 ml-4 text-sm p-2">
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard Size for the course thumbnail is 1024*578.</li>
                    <li>Video Section Controls the Course overview video.</li>
                    <li>Course Builder where you create and organize a course.</li>
                    <li>Add Topics in the course Builder Section to create  lessons Quizzes and assignment.</li>
                    <li>Information for the Additional data Sections shows up on  the course single page.</li>
                    <li>make a announcement to notify any important.</li>
                    <li>Notes to all enrolled Students at once.</li>
                </ul>
            </div>
        </div>
    )
}
export default AddCourse;