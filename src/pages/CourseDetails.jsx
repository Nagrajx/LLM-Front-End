import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../Services/operations/studentFeaturesAPI";
import { getASingalCourseDetail } from "../Services/operations/courseDetailsAPI";
import GetAvgRating from "../utils/avgRarting";
import ConfirmationModal from "../components/common/ConfirmationalModal";
import Error from "../../src/pages/Error"
import RatingStars from "../components/common/RatingStars";
import { formateDate } from "../Services/formateDate";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import { TbWorldDown } from "react-icons/tb";
import Footer from "../components/common/Footer";

const CourseDetails = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { loading } = useSelector((state) => state.profile);
    const { paymentLoading } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();

    const [courseData, setCourseData] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null)


    useEffect(() => {
        const getCourseFullDetails = async () => {
            try {
                const result = await getASingalCourseDetail(courseId, token)
                setCourseData(result);
                console.log("Result is", result);

            }
            catch (error) {
                console.log("Could Not Fetch Course A Singal Course Details");
            }
        }
        getCourseFullDetails()

    }, [courseId, token])



    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(courseData?.ratingAndReviews || []);
        setAvgReviewCount(count);
    }, [courseData]);


    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);


    useEffect(() => {
        const content =
            courseData?.data?.courseContent || courseData?.courseContent;

        const lectures =
            content?.reduce((total, sec) => {
                return total + (
                    sec?.SubSections?.length ||
                    sec?.subSections?.length ||
                    0
                );
            }, 0) || 0;

        setTotalNoOfLectures(lectures);
    }, [courseData]);

    const [isActive, setIsActive] = useState([]);


    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id) ? isActive.concat(id) : isActive.filter((e) = e != id)
        )
    }




    const hendleBuyCourse = () => {
        if (token) {
            buyCourse(token, [courseId], navigate, dispatch, user);
            return;
        }
        setConfirmationModal({
            text1: "YOu Are Not Logged In",
            text2: "Please Login to Purchase the Course",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null)
        })

    }

    if (!courseData) {
        return (
            <div className="text-center text-white text-lg">
                Loading Course Details...
            </div>
        );
    }

    if (!courseData) {
        return (
            <div>
                <Error />
            </div>
        )
    }

    const {
        _id: course_id,
        courseName,
        courseDescription,
        price,
        instructor,
        courseContent,
        studentsEnrolled,
        ratingAndReviews,
        createdAt
    } = courseData
    ratingAndReviews
    return (
        <div className="flex flex-col text-white ">
            <div className=" flex  justify-between p-10 h-[400px] bg-gray-800">

                {/* Left Section */}
                <div className="p-20 ml-20 space-y-4">
                    <p className="font-bold text-4xl">{courseName}</p>
                    <p>{courseDescription}</p>

                    <div className="flex items-center space-x-3">
                        <span>{avgReviewCount || 0}</span>
                        <RatingStars Review_count={avgReviewCount || 0} star_Size={24} />
                        <span>{` (${ratingAndReviews.length} reviews)`}</span>
                        <span>{` (${studentsEnrolled.length} Students Enrolled)`}</span>
                    </div>

                    <div>
                        <p>Created By {instructor?.firstName}</p>
                    </div>

                    <div className="flex gap-4" >
                        <p  >Created At {formateDate(createdAt)}</p>
                        <p className="flex items-center gap-x-2">
                            <TbWorldDown />

                            English</p>
                    </div>
                </div>

                {/* Right Section */}
                <div className=" absolute top-[120px] right-[200px] ">
                    <CourseDetailsCard
                        course={courseData}
                        setConfirmationModal={setConfirmationModal}
                        hendleBuyCourse={hendleBuyCourse}
                    />
                </div>

            </div>


            <div className="p-10 ml-10">
                <p className="p-10 border border-white w-[50%] font-extrabold text-2xl">
                    What You Will Learn
                </p>
            </div>

            <div className="p-10 ml-10 space-y-6">

                {/* Title */}
                <h2 className="font-bold text-2xl text-white">
                    Course Content
                </h2>

                {/* Info Row */}
                <div className="w-full lg:w-1/2 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-t border-gray-700 pt-4">

                    {/* Left Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                        <span className="bg-gray-800 px-3 py-1 rounded-md">
                            {courseContent?.length || 0} Sections
                        </span>

                        <span className="bg-gray-800 px-3 py-1 rounded-md">
                            {totalNoOfLectures || 0} Lectures
                        </span>

                        <span className="bg-gray-800 px-3 py-1 rounded-md">
                            {courseData?.timeDuration || "0h"} Total Length
                        </span>
                    </div>

                    {/* Collapse Button */}
                    <button
                        onClick={() => setIsActive([])}
                        className="text-sm font-medium text-yellow-400 hover:text-yellow-300"
                    >
                        Collapse All Sections
                    </button>
                </div>

                {/* 🔽 Dropdown UL (Accordion) */}
                <ul className="w-full lg:w-1/2 bg-gray-900 text-white rounded-lg overflow-hidden">

                    {courseContent?.map((section, index) => (
                        <li key={section._id} className="border-b border-gray-700">

                            {/* Section Header */}
                            <div
                                onClick={() =>
                                    setIsActive((prev) =>
                                        prev.includes(index)
                                            ? prev.filter((i) => i !== index)
                                            : [...prev, index]
                                    )
                                }
                                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-800 transition"
                            >
                                <span className="font-medium">
                                    {section.sectionName}
                                </span>

                                <span className="text-sm text-gray-400">
                                    {section.SubSections?.length || 0} Lectures
                                </span>
                            </div>

                            {/* Lectures Dropdown */}
                            {isActive.includes(index) && (
                                <ul className="bg-gray-800">

                                    {section.SubSections?.map((lecture) => (
                                        <li
                                            key={lecture._id}
                                            className="px-6 py-3 text-sm border-t border-gray-700 hover:bg-gray-700 flex justify-between"
                                        >
                                            <span>
                                                ▶ {lecture.title || "Untitled Lecture"}
                                            </span>

                                            <span className="text-gray-400 text-xs">
                                                {lecture.timeDuration || "0 min"}
                                            </span>
                                        </li>
                                    ))}

                                </ul>
                            )}
                        </li>
                    ))}

                </ul>

            </div>
            <div className='p-10 ml-10'>
                <p className="text-[28px] font-semibold">Author</p>
                <div className='flex items-center gap-4 py-4'>
                    <img
                        src={courseData?.instructor?.profileImage ?
                            courseData?.instructor?.profileImage
                            : `https://api.dicebear.com/5.x/initials/svg?seed=${courseData?.instructor?.firstName} ${courseData?.instructor.lastName}`
                        }
                        alt="instructor"
                        loading='lazy'
                        className='h-14 w-14 rounded-full object-cover'
                    />
                    <p className='text-lg'>{`${courseData?.instructor?.firstName} ${courseData?.instructor?.lastName}`}</p>
                </div>
                <p className='text-[#C5C7D4"] lg:max-w-[70%]' >{courseData?.instructor?.additionalDetails?.about}</p>
            </div>



            <Footer />

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    )
}
export default CourseDetails;