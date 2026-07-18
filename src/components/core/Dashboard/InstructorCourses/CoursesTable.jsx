import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import dateFormatter from "../../../../utils/dateFormatter";
import { COURSE_STATUS } from "../../../../utils/contant";
import ConfirmationModal from "../../../common/ConfirmationalModal";
import { deleteCourse } from "../../../../Services/operations/courseDetailsAPI";
import { setCourse } from "../../../../Redux/Slices/courseSlice";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { getInstructorCourseDetails } from "../../../../Services/operations/courseDetailsAPI";
import { Navigate, useNavigate } from "react-router-dom";

const CoursesTable = ({ courses, setCourses }) => {


    const { course } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);

    const navigate  = useNavigate()

    const handleCourseDelete = async (courseId) => {
        if (!courseId) {
            setConfirmationModal(null);
            return;
        }

        setLoading(true);

        await deleteCourse({ courseId }, token);

        const result = await getInstructorCourseDetails(token);
        if (result) {
            setCourses(result);
        }

        setConfirmationModal(null);
        setLoading(false);
    };



    return (
        <div className="w-full overflow-x-auto rounded-lg  p-6">
            <Table className="w-full">
                <Thead>
                    <Tr className="border-b  border-[#2C333F] text-left text-[#AFB2BF]">
                        <Th className="pb-4" >Course</Th>
                        <Th className="pb-4 ">Duration</Th>
                        <Th className="pb-4">Price</Th>
                        <Th className="pb-4 text-center">Actions</Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {courses.length === 0 ? (
                        <Tr>
                            <Td className="py-10 text-center text-[#6E727F]">
                                No Courses Found
                            </Td>
                        </Tr>
                    ) : (
                        courses.map((course) => (
                            <Tr
                                key={course._id}
                                className="border-b border-[#2C333F]"
                            >
                                {/* Course Column */}
                                <Td className="py-6">
                                    <div className="flex gap-6 items-center">
                                        
                                        <img
                                            src={course?.thumbnail}
                                            alt="course-thumbnail"
                                            className="h-[100px] w-[180px] rounded-lg"
                                        />

                                        <div className="flex flex-col gap-2">
                                            <p className="text-lg font-semibold text-[#F1F2FF]">
                                                {course.courseName}
                                            </p>

                                            <p className="text-sm text-[#999DAA] line-clamp-2">
                                                {course.courseDescription}
                                            </p>

                                            <p className="text-xs text-[#6E727F]">
                                                Created:
                                            </p>

                                            {course.status === COURSE_STATUS.DRAFT ? (
                                                <span className="w-fit rounded-full bg-pink-400/20 px-3 py-1 text-xs font-medium text-pink-300">
                                                    Draft
                                                </span>
                                            ) : (
                                                <span className="w-fit rounded-full bg-yellow-400/20 px-3 py-1 text-xs font-medium text-yellow-300">
                                                    Published
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Td>

                                {/* Duration */}
                                <Td className="text-[#AFB2BF]">
                                    2hr 30min
                                </Td>

                                {/* Price */}
                                <Td className="text-richblack-5 font-semibold">
                                    ₹ {course.price}
                                </Td>

                                {/* Actions */}
                                <Td>
                                    <div className="flex items-center justify-center gap-4">
                                        <button
                                            disabled={loading}
                                             onClick={()=>{
                                                       navigate(`/dashboard/edit-course/${course._id}`)
                                             }}
                                            className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-medium text-[#000814] hover:bg-yellow-300 transition"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            disabled={loading}
                                            onClick={() => {
                                                setConfirmationModal({
                                                    text1: "Do you want to delete this course?",
                                                    text2:
                                                        "All the data related to this course will be deleted.",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: () =>
                                                        handleCourseDelete(course._id),
                                                    btn2Handler: () =>
                                                        setConfirmationModal(null),
                                                });
                                            }}
                                            className="rounded-md  px-4 py-2 text-sm font-medium text-white hover:bg-[#585D69] transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </Td>
                            </Tr>
                        ))
                    )}
                </Tbody>
            </Table>

            {confirmationModal && (
                <ConfirmationModal modalData={confirmationModal} />
            )}
        </div>
    );

}

export default CoursesTable;