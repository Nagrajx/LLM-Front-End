import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInstructorCourseDetails } from "../../../Services/operations/courseDetailsAPI";
import ActionBtn from "../../common/ActionBtn"
import { FaPlus } from "react-icons/fa6";

import CoursesTable from "./InstructorCourses/coursesTable";

const MyCourses = () => {

    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {

        const fetchCourses = async () => {
            const result = await getInstructorCourseDetails(token)
            if (result) {
                setCourses(result);
            }
        }

        fetchCourses();

    }, [])


    return (
        <div>
            <div className="flex  justify-between">
                <h1 className=" flex items-center font-[xl] text-2xl mt-2" >
                    My Courses
                </h1>
                <ActionBtn
                    text="Add Course"
                    onclick={() => navigate('/dashboard/add-course')}
                ><FaPlus />
                </ActionBtn>
            </div>
            {
                courses && <CoursesTable courses={courses} setCourses={setCourses} />
            }

        </div>
    )
}

export default MyCourses