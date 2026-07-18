import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getASingalCourseDetail } from "../Services/operations/courseDetailsAPI";
import { setTotalNoOfLectures, setCompletedLectures, setEntireCourseData, setCourseSectionData } from "../Redux/Slices/viewCourseSlice";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";

const ViewCourse = () => {

    const [reviewModal, setReviewModal] = useState(false);
    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();



    useEffect(() => {
        const setCourseSpecificDetails = async () => {
            const courseData = await getASingalCourseDetail(courseId, token)
            console.log("CourseData is :", courseData);
            dispatch(setCourseSectionData(courseData?.courseContent))
            dispatch(setEntireCourseData(courseData));
            dispatch(
                setCompletedLectures(courseData?.completedVideos ?? [])
            );

            let lectures = 0;
            courseData?.courseContent?.forEach((sec) => {
                lectures += sec.SubSections.length
            })
            dispatch(setTotalNoOfLectures(lectures));

        }
        setCourseSpecificDetails()
    }, [])


    return (
        <div >

            <div className="flex h-[calc(100vh-3.5rem)] ">

                {/* Sidebar */}
                <div className="w-[300px] min-w-[260px] max-w-[320px] bg-[#161D29]">
                    <VideoDetailsSidebar setReviewModal={setReviewModal} />
                </div>

                {/* Main Content */}
                <div className="flex-1 ">
                    <div className="max-w-[1000px] mx-auto px-6 py-8">
                        <Outlet />
                    </div>
                </div>

            </div>

            {/* Review Modal */}
            {reviewModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <CourseReviewModal setReviewModal={setReviewModal} />
                </div>
            )}

        </div>
    );
}

export default ViewCourse